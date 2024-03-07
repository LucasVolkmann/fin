export class CustomTokenExpiredError extends Error {
  constructor(message?: string){
    super(message || 'Token is expired.');
  }
}