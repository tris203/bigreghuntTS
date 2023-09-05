import { prisma } from '@/lib/prisma';

export async function getData(perPage: number, page: number, userNick: string) {
  let pageCalc = page - 1;
  if (pageCalc < 0) pageCalc = 0;

  const files = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
    },
    where: { user: { nickname: userNick } },
    skip: pageCalc * perPage || 0,
    take: perPage,
    orderBy: { created: 'desc' },
  });

  return files;
}

export async function getLast5() {
  const files = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
    },
    skip: 0,
    take: 5,
    orderBy: { created: 'desc' },
  });

  return files;
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
  const count = prisma.files.count({ where: { user: { nickname: userNick } } });
  return count;
}

export async function getFilesWithLength(length: number) {
  type FileWithLength = {
    regnumber: string;
    ids: string;
    nicknames: string;
    value: number;
  };
  const files = await prisma.$queryRaw`
 SELECT f.regnumber, GROUP_CONCAT(f.id) as 'ids' , GROUP_CONCAT(u.nickname) as 'nicknames', max(f.value) as 'value' from files f
 join user u on f.userid = u.id where length(f.regnumber) = ${length} and f.regnumber NOT IN ('0') and f.deleted = '0'
 GROUP BY f.regnumber
  order by regnumber asc`;

  return files as FileWithLength[];
}

export async function getAllCount() {
  const count = prisma.files.count();
  return count;
}

export async function getSpecificReg(regnumber: number) {
  const files = prisma.files.findMany({
    include: {
      bonusmulti: true,
      user: { select: { nickname: true, pfp: true } },
    },
    where: { regnumber: regnumber.toString() },
    orderBy: { created: 'desc' },
  });
  return files;
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
 group by length(regnumber)`;
  return status as LengthStatus[];
}
