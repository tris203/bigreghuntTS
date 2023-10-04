import { prisma } from '@/lib/prisma';
import { perPage } from './static';

export async function getData(page: number, userNick: string) {
  let pageCalc = page - 1;
  if (pageCalc < 0) pageCalc = 0;

  const filesReturn = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
      require_manfix: { select: { manfixreqid: true } },
      report_files: {
        select: { ReportID: true },
        where: { Acknowledge: false || null },
      },
    },
    where: { user: { nickname: userNick }, deleted: false },
    skip: pageCalc * perPage || 0,
    take: perPage,
    orderBy: { created: 'desc' },
  });

  return filesReturn;
}

export async function getLast5() {
  const filesReturn = await prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
      require_manfix: { select: { manfixreqid: true } },
      report_files: {
        select: { ReportID: true },
        where: { Acknowledge: false || null },
      },
    },
    where: {
      deleted: false,
      report_files: { none: { Acknowledge: false || null } },
    },
    skip: 0,
    take: 5,
    orderBy: { id: 'desc' },
  });

  return filesReturn;
}

export async function GetAllUserScores() {
  type UserScore = {
    userid: number;
    Rank: number;
    nickname: string;
    UploadTotal: number;
    UploadNumber: number;
    FixedTotal: number;
    FixedNumber: number;
    total: number;
  };

  const users = await prisma.$queryRaw`
  WITH uploadstats as (
  SELECT sum(f.value * COALESCE(bm.multi,1)) as UploadTotal, count(f.id) as UploadNumber, f.userid  FROM files f
   left join bonusmulti bm on bm.fileid = f.id and bm.userid = f.userid
  where f.deleted = '0'
  group by userid),
  fixedstats as (
  SELECT sum(value) as FixedTotal, count(id) as FixedNumber, mf.userid FROM manfix mf
  JOIN files f ON mf.fileid = f.id AND mf.userid != f.userid
  where f.deleted = '0'
  GROUP BY mf.userid
  )
  SELECT u.id as userid, DENSE_RANK() OVER (ORDER BY COALESCE(UploadTotal, 0) + COALESCE(FixedTotal, 0) desc) as 'Rank'  ,u.nickname, COALESCE(UploadTotal, 0) as 'UploadTotal', COALESCE(UploadNumber, 0) as 'UploadNumber', COALESCE(FixedTotal, 0) as 'FixedTotal', COALESCE(FixedNumber, 0) as 'FixedNumber' ,  (
   COALESCE(UploadTotal, 0) +
   COALESCE(FixedTotal, 0) 
  ) AS total  FROM user u
  LEFT JOIN uploadstats on u.id = uploadstats.userid
  LEFT JOIN fixedstats on u.id = fixedstats.userid
  where 
   COALESCE(UploadTotal, 0) +
   COALESCE(FixedTotal, 0) > 0
  order by total DESC;`;

  return users as UserScore[];
}

export async function getCount(userNick: string) {
  const count = prisma.files.count({
    where: { user: { nickname: userNick }, deleted: false },
  });
  return count;
}

export async function getFilesWithLength(length: number, page: number) {
  let pageCalc = page - 1;
  if (pageCalc < 0) pageCalc = 0;

  type RelatedReg = {
    regnumber: string;
  };

  const relatedRegs: RelatedReg[] = await prisma.$queryRaw`
 SELECT regnumber from files
 where deleted = '0'
 and regnumber != '0'
 and length(regnumber) = ${length}
 group by regnumber
 order by regnumber asc
 limit ${pageCalc * perPage}, ${perPage};`;

  const filesReturn = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
    },
    where: {
      regnumber: { in: relatedRegs.map((x) => x.regnumber), not: '0' },
      deleted: false,
    },
    orderBy: { regnumber: 'asc' },
  });

  return filesReturn;
}

export async function getSpecificReg(regnumber: number) {
  const filesReturn = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
      require_manfix: { select: { manfixreqid: true } },
      report_files: {
        select: { ReportID: true },
        where: { Acknowledge: false || null },
      },
    },
    where: { regnumber: regnumber.toString(), deleted: false },
    orderBy: { created: 'desc' },
  });
  return filesReturn;
}

export async function get4DOTD() {
  const dotd = prisma.dotd.findFirst({
    orderBy: { date: 'desc' },
  });
  return dotd;
}

export async function getAllNumberbyLength() {
  type LengthStatus = {
    count: number;
    length: number;
  };
  const status = await prisma.$queryRaw`
 SELECT count(DISTINCT(regnumber)) as 'count', length(regnumber) as 'length' from files
 where deleted = '0'
 and regnumber != '0'
 group by length(regnumber)`;
  return status as LengthStatus[];
}

export async function getReportReasons() {
  const reasons = prisma.report_reasons.findMany();
  return reasons;
}

export async function getManFixRequiredCount(userID: number) {
  if (userID === 0) return 0;

  const alreadyFixedFiles = await prisma.manfix.findMany({
    where: { userid: userID },
    select: { fileid: true },
  });

  const filesRequiringFix = await prisma.require_manfix.findMany({});

  const filesOverFixedThreshold = await prisma.manfix.groupBy({
    by: ['fileid'],
    having: {
      fileid: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  const count = await prisma.files.count({
    where: {
      deleted: false,
      OR: [
        { regnumber: '0' },
        { id: { in: filesRequiringFix.map((x) => x.fileid) } },
      ],
      NOT: [
        { id: { in: alreadyFixedFiles.map((x) => x.fileid) } },
        { id: { in: filesOverFixedThreshold.map((x) => x.fileid) } },
      ],
    },
  });

  return count;
}

export async function getManFixRequiredFiles(userID: number) {
  const alreadyFixedFiles = await prisma.manfix.findMany({
    where: { userid: userID },
    select: { fileid: true },
  });

  const filesRequiringFix = await prisma.require_manfix.findMany({});

  const filesOverFixedThreshold = await prisma.manfix.groupBy({
    by: ['fileid'],
    having: {
      fileid: {
        _count: {
          gt: 1,
        },
      },
    },
  });

  const files = await prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
      require_manfix: { select: { manfixreqid: true } },
      report_files: {
        select: { ReportID: true },
        where: { Acknowledge: false || null },
      },
    },
    where: {
      deleted: false,
      OR: [
        { regnumber: '0' },
        { id: { in: filesRequiringFix.map((x) => x.fileid) } },
      ],
      NOT: [
        { id: { in: alreadyFixedFiles.map((x) => x.fileid) } },
        { id: { in: filesOverFixedThreshold.map((x) => x.fileid) } },
      ],
    },
  });

  return files;
}

export async function getHistoricManFix(userID: number) {
  const historicManFix = await prisma.manfix.findMany({
    include: {
      file: {
        include: {
          bonusmulti: true,
          user: { select: { nickname: true, pfp: true } },
          require_manfix: { select: { manfixreqid: true } },
          report_files: {
            select: { ReportID: true },
            where: { Acknowledge: false || null },
          },
        },
      },
    },
    take: 5,
    where: { userid: userID },
    orderBy: { date_fixed: 'desc' },
  });

  return historicManFix;
}
