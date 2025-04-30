import {
  HasAuthorization,
  DidSignIn,
  IsValidToken,
  IsValidUser
} from "./guards";

export const AUTH_GUARDS = [
  HasAuthorization,
  DidSignIn,
  IsValidToken,
  IsValidUser,
];