export class EmailAlreadyExistsError extends Error {
  constructor(message: string){
    super(message);
  }
}