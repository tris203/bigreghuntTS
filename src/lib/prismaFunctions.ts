import { prisma } from '@/lib/prisma';
import { perPage, manfixConfirmationsRequired } from './static';

export type ManFix = {
  fileid: number;
  filename: string;
  ext: string;
  regnumber: string;
  CurrentReg: string;
  fixcount: number;
};

export async function createUser(
  nickname: string,
  email: string,
  password: string,
) {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    return null;
  }
  const existingNickname = await prisma.user.findFirst({
    where: { nickname },
  });
  if (existingNickname) {
    return null;
  }
  const user = await prisma.user.create({
    data: {
      nickname,
      email,
      password,
    },
  });
  return user;
}

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
  const startTime = new Date();
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

  const endTime = new Date();
  const timeDiff = endTime.getTime() - startTime.getTime();
  // eslint-disable-next-line no-console
  console.log(`Query took ${timeDiff}ms`);
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

  const users = await prisma.$queryRaw<UserScore[]>`
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

  const relatedRegs = await prisma.$queryRaw<RelatedReg[]>`
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
  const status = await prisma.$queryRaw<LengthStatus[]>`
 SELECT count(DISTINCT(regnumber)) as 'count', length(regnumber) as 'length' from files
 where deleted = '0'
 and regnumber != '0'
 group by length(regnumber)`;
  return status;
}

export async function getReportReasons() {
  const reasons = prisma.report_reasons.findMany();
  return reasons;
}

export async function getManFixOverThreshold() {
  const filesOverFixedThreshold = await prisma.manfix.groupBy({
    by: ['fileid'],
    having: {
      fileid: {
        _count: {
          gt: manfixConfirmationsRequired,
        },
      },
    },
  });

  return filesOverFixedThreshold;
}

export async function getManFixRequiredFiles(userID: number) {
  if (userID === 0) {
    return [];
  }
  const alreadyFixedFiles = await prisma.manfix.findMany({
    where: { userid: userID },
    select: { fileid: true },
  });

  const filesRequiringFix = await prisma.require_manfix.findMany({});

  const filesOverFixedThreshold = await getManFixOverThreshold();

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
        { regnumber: null },
        { id: { in: filesRequiringFix.map((x) => x.fileid) } },
      ],
      NOT: [
        { report_files: { some: { Acknowledge: false || null } } },
        { id: { in: alreadyFixedFiles.map((x) => x.fileid) } },
        { id: { in: filesOverFixedThreshold.map((x) => x.fileid) } },
      ],
    },
  });

  return files;
}

export async function getReadyToApplyManFixes() {
  const readyToFix = await prisma.$queryRaw<ManFix[]>`
SELECT mf.fileid, f.filename, f.ext, mf.regnumber, MIN(f.regnumber) as 'CurrentReg', count(mf.regnumber) as fixcount from manfix mf
join files f on mf.fileid = f.id 
where mf.regnumber != f.regnumber 
and f.deleted = '0' 
GROUP BY mf.fileid, mf.regnumber HAVING count(fixcount) >= ${manfixConfirmationsRequired};`;

  return readyToFix;
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
