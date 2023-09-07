import SpecficCollection from './[pageid]/page';

function page({ params }: { params: { length: string } }) {
  return (
    <SpecficCollection params={{ length: Number(params.length), pageid: 1 }} />
  );
}

export default page;
