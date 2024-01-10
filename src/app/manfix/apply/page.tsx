import CDNImage from '@/components/CDNImage';
import RegistrationDisplay from '@/components/RegistrationDisplay';
import { getReadyToApplyManFixes } from '@/lib/prismaFunctions';
import { prisma } from '@/lib/prisma';

async function sendToDb(formData: FormData) {
  'use server';

  const fileid = formData.get('fileid');
  const manfixes = await getReadyToApplyManFixes();

  const newReg = manfixes.find(
    (manfix) => manfix.fileid === Number(fileid),
  )?.regnumber;

  if (!fileid || !newReg) {
    console.log('no fileid or newReg');
    return;
  }
  const plateToValue = newReg;

  const webResponse = (
    await fetch(`https://digits.gg/reg.php?regid=G${plateToValue}C`, {
      cache: 'no-cache',
    })
  ).text();
  const value = (await webResponse).match(/Current valuation is: £([0-9.,]*)/m);
  let newValue = value ? value[1].replace(/,/g, '') : '0';
  if ((newReg as string).length === 1) {
    newValue = (parseInt(newValue, 10) * 1.7).toString();
  }
  console.log(`new value is ${newValue}`);
  await prisma.files.update({
    data: { value: newValue, regnumber: newReg as string },
    where: { id: Number(fileid) },
  });
}

async function ApplyManFixes() {
  const manFixes = await getReadyToApplyManFixes();
  if (!manFixes) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h1>ApplyManFixes</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
        {manFixes.map((manfix) => (
          <div
            className='mb-2 flex w-full flex-wrap rounded-sm border bg-white px-2'
            key={manfix.fileid}
          >
            <div className='flex items-center px-4 py-3'>
              <div className='ml-3 '>
                <span className='block text-sm font-semibold leading-tight antialiased'>
                  Current Reg:
                  {' '}
                  {manfix.CurrentReg}
                </span>
                <span className='block text-xs text-gray-600' />
              </div>
            </div>
            <div className='container relative h-96'>
              <CDNImage
                key={manfix.fileid}
                filename={
                  manfix.ext
                    ? `${manfix.filename}.${manfix.ext}`
                    : `${manfix.filename}`
                }
                regNumber={manfix.regnumber}
              />
            </div>
            <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
              <div className='flex gap-5'>
                <RegistrationDisplay regNumber={manfix.regnumber} />
              </div>
              <div className='flex'>
                <form action={sendToDb}>
                  <input type='hidden' name='fileid' value={manfix.fileid} />
                  <button
                    className='focus:shadow-outline-green rounded-lg border border-transparent bg-green-600 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-green-700 focus:outline-none active:bg-green-600'
                    type='submit'
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
            <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
              <div className='flex w-full gap-5 text-sm font-semibold' />
              <div className='flex' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplyManFixes;
