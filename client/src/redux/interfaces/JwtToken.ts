export interface JwtTokenI {
  userEmail: string;
  expiresIn: number;
  secret: string;
  exp: number;
}