export type ApiAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: ApiAddress;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserStatus = 'Active' | 'Offline';

export type DisplayUser = {
  id: number;
  name: string;
  email: string;
  formattedAddress: string;
  avatarUrl: string;
  status: UserStatus;
};
