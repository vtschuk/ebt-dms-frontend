export interface UploadDocFilesInfo {
  id: number,
  personId: number,
  name: string,
  type: string,
  size?: number,
  file?: File
}
