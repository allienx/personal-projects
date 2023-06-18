import { EnvVars } from 'src/config/env-vars'

export default class TtpApi {
  static locationsUrl() {
    return EnvVars.isProd
      ? 'https://d7gqolvzu4eus4vys5x75lytpm0fgzxh.lambda-url.us-east-2.on.aws'
      : '/api/locations'
  }

  static slotsUrl() {
    return EnvVars.isProd
      ? 'https://me63q6uiwxolyxtkgk75naatxy0jfmsa.lambda-url.us-east-2.on.aws'
      : '/api/slots'
  }

  static userSlotsUrl() {
    return EnvVars.isProd
      ? 'https://pykmienm6mzkuxgdmvgtztw4dy0qzlmh.lambda-url.us-east-2.on.aws'
      : '/api/user-slots'
  }

  static userSlotCreateUrl() {
    return EnvVars.isProd
      ? 'https://rknra6vulmbgg6tsoh4reisvim0gmyzb.lambda-url.us-east-2.on.aws'
      : '/api/create-user-slot'
  }

  static userSlotDeleteUrl() {
    return EnvVars.isProd
      ? 'https://fijxsxbbg3mxpr6polueq4ez2m0kkcrc.lambda-url.us-east-2.on.aws'
      : '/api/delete-user-slot'
  }
}
