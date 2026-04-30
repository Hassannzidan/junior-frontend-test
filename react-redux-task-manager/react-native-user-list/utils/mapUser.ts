import type { ApiUser, DisplayUser, UserStatus } from '@/types/user';

export function mapApiUserToDisplay(u: ApiUser): DisplayUser {
  const formattedAddress = `${u.address.street}, ${u.address.city}, ${u.address.zipcode}`;
  const status: UserStatus = u.id % 2 === 0 ? 'Active' : 'Offline';
  const avatarUrl = `https://i.pravatar.cc/150?img=${(u.id % 70) + 1}`;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    formattedAddress,
    avatarUrl,
    status,
  };
}
