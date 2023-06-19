import { TtpApiListResponse } from 'src/http/ttp-api-response'

export default function updateTtpApiListResponse({
  actionType,
  record,
}: {
  actionType: 'replace' | 'remove'
  record: any
}) {
  return (data: TtpApiListResponse<any> | undefined) => {
    if (!data) {
      return data
    }

    if (actionType === 'replace') {
      return {
        ...data,
        records: data.records.reduce((arr, val) => {
          return [...arr, val.id === record.id ? record : val]
        }, [] as any[]),
      }
    }

    return {
      ...data,
      records: data.records.filter((val) => val.id !== record.id),
    }
  }
}
