enum API {
  GET_API_KEY_LIST = "/api/v1/api_key/list",
  GET_API_KEY = "/api/v1/api_key",
  APPLY_API_KEY = "/api/v1/api_key/apply",
  UPDATE_API_KEY = "/api/v1/api_key",
  DELETE_API_KEY = "/api/v1/api_key",
  GET_STRATEGY_LIST = "/api/v1/paymaster_strategy/list",
  GET_STRATEGY = "/api/v1/paymaster_strategy",
  UPDATE_STRATEGY = "/api/v1/paymaster_strategy",
  ADD_STRATEGY = "/api/v1/paymaster_strategy",
  DELETE_STRATEGY = "/api/v1/paymaster_strategy",
  GET_USER_INFO = "/api/v1/user",
  OAUTH_GITHUB = "/oauth/github",
  OAUTH_PASSWORD = "/oauth/password",
}
export default API;
