import { AwsCognitoDefinitionHelper } from './aws-cognito-definition'
import { OauthDefinition } from './oauth-definition'
import { OauthDefinitionType } from './oauth-definition-type'

export default function getOauthDefinitionHelper(definition: OauthDefinition) {
  switch (definition.type) {
    case OauthDefinitionType.AwsCognito:
      return new AwsCognitoDefinitionHelper(definition.config)

    default:
      return new AwsCognitoDefinitionHelper(definition.config)
  }
}
