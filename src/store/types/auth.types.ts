export type SignInForm = {
  email: string;
  password: string;
};

export type SignUpForm = SignInForm & {
  name: string;
  referralCode?: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserRole = "ADMIN" | "USER";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicUrl: string;
  referralCode: string;
};
export type AuthResponse = {
  statusCode: string;
  message: string;
  data: {
    user: User;
    tokens: Tokens;
  };
};
