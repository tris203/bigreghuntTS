import { get4DOTD } from '@/lib/prismaFunctions';
import RegistrationDisplay from '../RegistrationDisplay';

export default async function FourDOTDWrapper() {
  const dotdnum = await get4DOTD();
  const dotd = dotdnum?.reg.toString() || '';
  return <RegistrationDisplay regNumber={dotd} />;
}
