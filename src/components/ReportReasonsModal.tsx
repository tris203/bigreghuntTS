'use client';

import type { report_reasons as ReportReasons } from '@prisma/client';
import { Modal } from 'flowbite-react';

export default function ReportReasonsModal({
  reportReasons,
  openModal,
  setOpenModal,
}: {
  reportReasons: ReportReasons[];
  openModal: string | undefined;
  setOpenModal: (value: string | undefined) => void;
}) {
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
              type='radio'
              name='reportReason'
              value={reason.ReportReason}
            />
            <label htmlFor={reason.ReasonID.toString()}>
              {reason.ReportReason}
            </label>
          </div>
        ))}
      </div>
    </Modal>
  );
}
