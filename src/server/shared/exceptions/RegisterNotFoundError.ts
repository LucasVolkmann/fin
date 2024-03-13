export class RegisterNotFoundError extends Error {
  constructor(message?: string){
    super(message || 'Register not found.');
  }
}