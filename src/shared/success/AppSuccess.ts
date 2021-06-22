class AppSuccess {
  constructor(
    public readonly message: string,
    public readonly statusCode = 200,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppSuccess;
