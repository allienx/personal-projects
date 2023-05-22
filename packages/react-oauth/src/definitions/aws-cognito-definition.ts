import { OauthBaseDefintion } from './oauth-base-definition'
import { OauthDefinitionHelper } from './oauth-definition-helper'
import { OauthDefinitionType } from './oauth-definition-type'

export interface AwsCognitoConfig {
  clientId: string
  redirectUrl: string
  responseType: 'code'
  userPoolUrl: string
}

export interface AwsCognitoDefinition extends OauthBaseDefintion {
  type: OauthDefinitionType.AwsCognito
  config: AwsCognitoConfig
}

export class AwsCognitoDefinitionHelper implements OauthDefinitionHelper {
  config: AwsCognitoConfig

  constructor(conf: AwsCognitoConfig) {
    this.config = conf
  }

  getLoginUrl(): string {
    const { userPoolUrl } = this.config

    return `${userPoolUrl}/oauth2/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.redirectUrl}`
  }

  getTokenUrl(): string {
    const { userPoolUrl } = this.config

    return `${userPoolUrl}/oauth2/token`
  }
}
