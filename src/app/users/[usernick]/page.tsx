import UserNickPage from './[pageid]/page';

function page({ params }: { params: { usernick: string } }) {
  return <UserNickPage params={{ usernick: params.usernick, pageid: 1 }} />;
}

export default page;
