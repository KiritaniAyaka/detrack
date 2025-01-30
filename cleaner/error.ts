export class URLCleanerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "URLCleanerError";
  }
}
