import React from 'react';

function RegistrationDisplay({ regNumber }: { regNumber: string | null }) {
  return <div className='plate'>{regNumber}</div>;
}

export default RegistrationDisplay;
