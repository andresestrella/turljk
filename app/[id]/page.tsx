import { getRedirect } from '@/lib/api/redirect';
import ClientComponent from './clientComponent';

export default async function Page({ params }: { params: { id: string } }) {
  let redirect = await getRedirect(params.id);

  if (!redirect) return <div>404</div>;
  return <ClientComponent redirect={redirect} />;
}
