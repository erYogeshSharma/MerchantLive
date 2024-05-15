export type SignInForm = {
  email: string;
  password: string;
};

export type SignUpForm = SignInForm & {
  name: string;
};

export type Tokens = {
  accessToken:string,
  refreshToken:string
}

export type UserRole={
  _id:string,
  code:string,
  status:boolean
}

export type User={
  _id:string,
  name:string,
  email:string,
  roles:UserRole[],
  profilePicUrl:string
}
export type AuthResponse = {
    "statusCode": string,
    "message":string,
    "data": {
        "user": User,
        "tokens": Tokens
    }
}