export class Configs {

  public static getApiUrl(): string {
    const runninPort = window.location.port || 80;
    const port = process.env.NODE_ENV === "development" ? 1234 : runninPort;

    return `${window.location.origin}:${port}`;
  }
}