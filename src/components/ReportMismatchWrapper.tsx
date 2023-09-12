'use client';

import React, { useState } from 'react';
import { Prisma } from '@prisma/client';
import type { report_reasons as ReportReasons } from '@prisma/client';
import ReportMismatchBar from './ReportMismatchBar';
import ReportReasonsModal from './ReportReasonsModal';

type filesWithUserBonsMulti = Prisma.filesGetPayload<{
  include: {
    bonusmulti: true;
    user: { select: { nickname: true; pfp: true } };
    require_manfix: { select: { manfixreqid: true } };
    report_files: { select: { ReportID: true } };
  };
}>;

function ReportMismatchWrapper({
  registration,
  reportReasons,
}: {
  registration: filesWithUserBonsMulti;
  reportReasons: ReportReasons[];
}) {
  const [openModal, setOpenModal] = useState<string | undefined>();

  return (
    <>
      <ReportMismatchBar
        key={registration.id}
        fileid={registration.id}
        mismatched={
          // eslint-disable-next-line operator-linebreak
          registration.require_manfix?.manfixreqid !== undefined ||
          registration.regnumber === '0'
        }
        reported={registration.report_files.length > 0}
        setOpenModal={setOpenModal}
      />
      <ReportReasonsModal
        reportReasons={reportReasons}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default ReportMismatchWrapper;
