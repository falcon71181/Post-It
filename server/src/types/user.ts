type UserBadges = string[];

type UserDataType = {
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  registered_on: Date;
  admin: boolean;
}

export type { UserDataType, UserBadges };
