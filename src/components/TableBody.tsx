/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { Prisma } from '@prisma/client';
import CDNImage from './CDNImage';
import RegistrationDisplay from './RegistrationDisplay';
import ProfilePic from './ProfilePic';
import { getReportReasons } from '@/lib/prismaFunctions';
import ReportMismatchWrapper from './ReportMismatchWrapper';
import RegistrationInput from './RegistrationInput';

type filesWithUserBonsMulti = Prisma.filesGetPayload<{
  include: {
    bonusmulti: true;
    user: { select: { nickname: true; pfp: true } };
    require_manfix: { select: { manfixreqid: true } };
    report_files: { select: { ReportID: true } };
  };
}>;

const reportReasons = await getReportReasons();

export default function TableBody({
  registration,
  isfixing,
  fixedReg,
}: {
  registration: filesWithUserBonsMulti;
  isfixing?: boolean;
  fixedReg?: string;
}) {
  return (
    <div className='mb-2 flex w-full flex-wrap rounded-sm border bg-white px-2'>
      <div className='flex items-center px-4 py-3'>
        <a href={`/users/${registration.user.nickname}/`}>
          <ProfilePic pfpURL={registration.user.pfp} />
        </a>
        <div className='ml-3 '>
          <span className='block text-sm font-semibold leading-tight antialiased'>
            <a href={`/users/${registration.user.nickname}/`}>
              {registration.user.nickname}
            </a>
          </span>
          <span className='block text-xs text-gray-600'>
            {registration.created.toDateString()}
          </span>
        </div>
      </div>
      <div
        className={`container relative h-96 ${
          registration.report_files.length > 0
            ? 'blur-lg transition-all duration-700 hover:blur-none'
            : null
        } `}
      >
        <CDNImage
          key={registration.id}
          filename={
            registration.ext
              ? `${registration.filename}.${registration.ext}`
              : `${registration.filename}`
          }
          regNumber={fixedReg ?? registration.regnumber}
        />
      </div>
      <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
        <div className='flex gap-5'>
          {isfixing ? (
            <RegistrationInput fileid={registration.id} />
          ) : (
            <RegistrationDisplay
              regNumber={fixedReg ?? registration.regnumber}
            />
          )}
        </div>
        <div className='flex'>
          {registration.bonusmulti.length > 0 ? (
            <div className='m-1 flex items-center justify-center rounded-full border border-blue-300 bg-blue-100 px-2 py-1 font-medium text-blue-700 '>
              <div className='max-w-full flex-initial text-xs font-normal leading-none'>
                {registration.bonusmulti[0].multi}
                {registration.bonusmulti[0].reason}
              </div>
            </div>
          ) : (
            <div className='m-1 flex items-center justify-center rounded-full border border-green-300 bg-green-100 px-2 py-1 font-medium text-green-700 '>
              <div className='max-w-full flex-initial text-xs font-normal leading-none'>
                1 Original Upload
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='mx-4 mb-2 mt-3 flex w-full items-center justify-between'>
        <div className='flex w-full gap-5 text-sm font-semibold'>
          {registration.value
            ? `£${Number(
                // eslint-disable-next-line operator-linebreak
                Number(registration.value) *
                  (registration.bonusmulti.length > 0
                    ? registration.bonusmulti[0].multi
                    : 1),
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`
            : 'Loading...'}
        </div>
        <div className='flex'>
          <ReportMismatchWrapper
            key={registration.id}
            reportReasons={reportReasons}
            registration={registration}
          />
        </div>
      </div>
    </div>
  );
}
