export default interface IRequest {
  status: number;
  host: string;
  url: string;
  rawContent: string;
  rawResponse: string;
  method: string;
  protocol: string;
}
