/* eslint-disable react/jsx-one-expression-per-line */

async function PercentageComplete({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percentage = Math.round((completed / total) * 100);
  return (
    <div className='h-4 w-full bg-neutral-200'>
      <div
        className='h-4 bg-slate-600 stroke-teal-100 p-0.5 text-center text-xs font-medium leading-none text-white'
        style={{
          width: `${percentage}%`,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
}

export default PercentageComplete;
