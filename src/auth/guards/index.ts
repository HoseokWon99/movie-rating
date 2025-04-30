import { HasAuthorization } from "./HasAuthorization";
import { DidSignIn } from "./DidSignIn";
import { IsValidToken } from "./IsValidToken";
import { IsValidUser } from "./IsValidUser";


export const AUTH_GUARDS = [
  HasAuthorization,
  DidSignIn,
  IsValidToken,
  IsValidUser,
];

export { HasAuthorization, DidSignIn, IsValidToken, IsValidUser };