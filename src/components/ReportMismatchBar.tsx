/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { AiFillFlag } from 'react-icons/ai';
import { FaNotEqual } from 'react-icons/fa';

function ReportMismatchBar({ fileid }: { fileid: number }) {
  const [currentFile] = useState(fileid);
  const [isMismatch, setIsMismatch] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  async function reportFile(reportFileid: number, reportType: string) {
    let reportURL;
    switch (reportType) {
      case 'mismatch':
        console.log(`Reported mismatch for fileid: ${reportFileid}`);
        reportURL = '/api/mismatch';
        break;
      case 'flag':
        console.log(`Flagged fileid: ${reportFileid}`);
        break;
      default:
        console.log(`Unknown report type: ${reportType}`);
    }
    if (!reportURL) {
      return false;
    }

    const success = await fetch(reportURL, {
      method: 'POST',
      body: JSON.stringify({ fileid: reportFileid }),
      cache: 'no-store',
    }).then((response) => true);

    return success;
  }

  async function ReportMismatch(mismatchFileid: number) {
    const result = await reportFile(mismatchFileid, 'mismatch');
    setIsMismatch(result);
  }

  async function ReportFlag(reportFileid: number) {
    const result = await reportFile(reportFileid, 'flag');
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
        onClick={() => ReportFlag(currentFile)}
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
