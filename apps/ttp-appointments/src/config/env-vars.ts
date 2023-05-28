export const EnvVars = {
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,

  OauthBaseUrl: import.meta.env.VITE_OAUTH_BASE_URL,
  OauthClientId: import.meta.env.VITE_OAUTH_CLIENT_ID,
}
