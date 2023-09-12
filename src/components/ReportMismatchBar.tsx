/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useEffect, useState } from 'react';
import { AiFillFlag } from 'react-icons/ai';
import { FaNotEqual } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ReportMismatchBar({
  fileid,
  mismatched,
  reported,
  setOpenModal,
}: {
  fileid: number;
  mismatched: boolean;
  reported: boolean;
  setOpenModal: (value: string | undefined) => void;
}) {
  const [currentFile] = useState(fileid);
  const [isMismatch, setIsMismatch] = useState(mismatched);
  const [isFlagged, setIsFlagged] = useState(reported);
  const router = useRouter();

  async function reportFile(
    reportFileid: number,
    reportType: string,
    ReasonID?: number,
  ) {
    let reportURL;
    let bodyData;
    switch (reportType) {
      case 'mismatch':
        reportURL = '/api/mismatch';
        bodyData = { fileid: reportFileid };
        break;
      case 'flag':
        reportURL = '/api/report';
        bodyData = { fileid: reportFileid, ReasonID };
        break;
      default:
        break;
    }
    if (!reportURL || !bodyData) {
      return false;
    }

    const success = await fetch(reportURL, {
      method: 'POST',
      body: JSON.stringify(bodyData),
      cache: 'no-store',
    }).then((response) => true);

    return success;
  }

  async function ReportMismatch(mismatchFileid: number) {
    const result = await reportFile(mismatchFileid, 'mismatch');
    setIsMismatch(result);
  }

  async function ReportFlag(reportFileid: number, ReasonID: number) {
    const result = await reportFile(reportFileid, 'flag', ReasonID);
    router.refresh();
    setIsFlagged(result);
  }

  return (
    <div className='mx-4 mb-4 mt-2 flex w-full justify-end text-sm'>
      <button
        type='button'
        onClick={() => ReportMismatch(currentFile)}
        className={`transition-all duration-300 ${
          isMismatch ? 'text-red-800' : 'text-gray-500'
        }`}
        disabled={isMismatch}
      >
        <FaNotEqual className='mr-1' />
      </button>
      <button
        type='button'
        onClick={() => setOpenModal('reportReason')}
        className={`transition-all duration-300 ${
          isFlagged ? 'text-red-800' : 'text-gray-500'
        }`}
        disabled={isFlagged}
      >
        <AiFillFlag className='mr-1' />
      </button>
    </div>
  );
}

export default ReportMismatchBar;
