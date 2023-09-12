'use client';

import type { report_reasons as ReportReasons } from '@prisma/client';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportReasonsModal({
  fileid,
  reportReasons,
  openModal,
  setOpenModal,
}: {
  fileid: number;
  reportReasons: ReportReasons[];
  openModal: string | undefined;
  setOpenModal: (value: string | undefined) => void;
}) {
  const [selectedReason, setSelectedReason] = useState<ReportReasons | null>(
    null,
  );
  const router = useRouter();

  function handleReport(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (selectedReason) {
      fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileid, ReasonID: selectedReason.ReasonID }),
      }).then(() => {
        setOpenModal(undefined);
        router.refresh();
      });
    }
  }

  return (
    <Modal
      dismissible
      show={openModal === 'reportReason'}
      onClose={() => setOpenModal(undefined)}
    >
      <div className='m-4'>
        <h1>Report</h1>
        {reportReasons.map((reason: ReportReasons) => (
          <div key={reason.ReasonID}>
            <input
              className='my-1 mr-2'
              key={reason.ReasonID}
              id={reason.ReasonID.toString()}
              onChange={() => setSelectedReason(reason)}
              type='radio'
              name='reportReason'
              value={reason.ReportReason}
            />
            <label htmlFor={reason.ReasonID.toString()}>
              {reason.ReportReason}
            </label>
          </div>
        ))}
        <button type='submit' onClick={(e) => handleReport(e)}>
          Report!
        </button>
      </div>
    </Modal>
  );
}
