export type UserStatus = 'active' | 'invited' | 'disabled';

export type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: 'admin' | 'member' | 'viewer';
  readonly status: UserStatus;
  readonly createdAt: string;
};
