/* eslint-disable no-console */
import { getServerSession } from 'next-auth/next';
import { DefaultSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/lib/prisma';
import { urlEndpoint } from '@/lib/static';

export async function POST(req: Request) {
  const session = await getServerSession(options);
  const body = await req.json();
  const { filename } = body;

  // Define SessionUser type as an object with a user property containing an id property
  type SessionUser = DefaultSession['user'] & {
    id?: string;
  };

  // Cast session?.user?.id as SessionUser and extract the id property
  const userId = Number((session?.user as SessionUser).id) || 0;

  const newRecord = await prisma.files.create({
    data: {
      filename,
      userid: userId,
      deleted: false,
    },
  });

  await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.PLATERECOGNIZER_TOKEN}`,
    },
    body: JSON.stringify({
      upload_url: `${urlEndpoint}/brh_upload_images/brh_images/${newRecord.filename}`,
      regions: ['gg'],
      region: 'strict',
      detection_rules: 'strict',
    }),
  })
    .then((res) => res.json())
    .then(async (json) => {
      if (json.results.length === 0) {
        console.log(`Unable to find plate for ${newRecord.id}`);
        await prisma.files.update({
          where: { id: newRecord.id },
          data: { regnumber: '0' },
        });
      } else {
        console.log(`Found plate ${json.results[0].plate} for ${newRecord.id}`);
        await prisma.files.update({
          where: { id: newRecord.id },
          data: {
            regnumber: json.results[0].plate.replace(/GB0$|GBG$|X$/i, ''),
          },
        });
      }
    });

  // get new regnumber from DB
  const plate = await prisma.files.findFirst({
    where: { id: newRecord.id },
  });

  if (!plate?.regnumber || plate.regnumber === '0') {
    console.log('no regnumber');
    return new Response(JSON.stringify(newRecord));
  }

  const plateToValue = plate.regnumber?.length === 1 ? `${plate.regnumber}${plate.regnumber}` : plate.regnumber;
  const webResponse = (await fetch(`https://digits.gg/reg.php?regid=G${plateToValue}C`, { cache: 'no-cache' })).text();
  const value = (await webResponse).match(/Current valuation is: £([0-9.,]*)/m);
  let newValue = value ? value[1].replace(/,/g, '') : '0';
  if (plate.regnumber?.length === 1) {
    newValue = (parseInt(newValue, 10) * 1.7).toString();
  }
  await prisma.files.update({
    where: { id: plate.id },
    data: { value: newValue },
  });

  return new Response(JSON.stringify(newRecord));
}
