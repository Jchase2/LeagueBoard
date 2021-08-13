export interface IJwtToken {
  userEmail: string;
  expiresIn: number;
  secret: string;
  exp: number;
}