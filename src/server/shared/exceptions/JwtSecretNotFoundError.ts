export class JwtSecretNotFoundError extends Error {
  constructor(message: string){
    super(message);
  }
}