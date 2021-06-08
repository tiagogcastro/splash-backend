export default interface IQRCodeProvider {
  generate(payload: string): Promise<NodeJS.ReadableStream>;
}
