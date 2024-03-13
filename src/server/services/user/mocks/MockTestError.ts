export class MockTestError extends Error {
  constructor(message?: string){
    super(message || 'This is a mock error.');
  }
}