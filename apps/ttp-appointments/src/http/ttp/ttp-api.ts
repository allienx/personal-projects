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
}
