import { get4DOTD } from '@/lib/prismaFunctions';
import RegistrationDisplay from '../RegistrationDisplay';

export default async function FourDOTDWrapper() {
  const dotd = await get4DOTD();
  return <RegistrationDisplay regNumber={dotd?.reg || ''} />;
}
