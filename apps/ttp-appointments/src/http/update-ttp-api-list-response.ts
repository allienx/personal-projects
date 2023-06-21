import { TtpApiListResponse } from 'src/http/ttp-api-response'

export default function updateTtpApiListResponse({
  actionType,
  record,
}: {
  actionType: 'add' | 'replace' | 'remove'
  record: any
}) {
  return (data: TtpApiListResponse<any> | undefined) => {
    if (!data) {
      return data
    }

    switch (actionType) {
      case 'add':
        return {
          ...data,
          records: [...data.records, record],
        }

      case 'replace':
        return {
          ...data,
          records: data.records.reduce((arr, val) => {
            return [...arr, val.id === record.id ? record : val]
          }, [] as any[]),
        }

      case 'remove':
        return {
          ...data,
          records: data.records.filter((val) => val.id !== record.id),
        }

      default:
        return data
    }
  }
}
