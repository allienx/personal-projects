export interface TtpApiResponse<R> {
  code: string
  record: R
}

export interface TtpApiListResponse<R> {
  code: string
  records: R[]
}
