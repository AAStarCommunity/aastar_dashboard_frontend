enum API {
    SWITCH_STRATEGY_STATUS = "/api/v1/paymaster_strategy/switch_status",
    GET_PAYMASTER_PAY_TYPE_METRICS = "/api/v1/data/paymaster_pay_type_metrics",
    GET_SPONSOR_METRICS = "/api/v1/data/sponsored_metrics",
    GET_BALANCE = "/api/v1/data/balance",
    GET_REQUEST_HEALTH_LIST = "/api/v1/data/request_health_list",
    GET_REQUEST_HEALTH_ONE = "/api/v1/data/request_health_one",
    GET_API_KEY_LIST = "/api/v1/api_key/list",
    GET_API_KEY_OVERVIEW_LIST = "/api/v1/data/api_keys_data_overview",
    GET_API_KEY = "/api/v1/api_key",
    APPLY_API_KEY = "/api/v1/api_key/apply",
    UPDATE_API_KEY = "/api/v1/api_key",
    DELETE_API_KEY = "/api/v1/api_key",
    GET_STRATEGY_LIST = "/api/v1/paymaster_strategy/list",
    GET_STRATEGY = "/api/v1/paymaster_strategy",
    UPDATE_STRATEGY = "/api/v1/paymaster_strategy",
    ADD_STRATEGY = "/api/v1/paymaster_strategy",
    DELETE_STRATEGY = "/api/v1/paymaster_strategy",
    GET_SPONSOR_TRANSACTION_LIST = "/api/v1/data/sponsor_transactions",
    GET_PAYMASTER_REQUEST_LIST = "/api/v1/data/paymaster_requests",
    GET_USER_INFO = "/api/v1/user",
    OAUTH_GITHUB = "/oauth/github",
    OAUTH_PASSWORD = "/oauth/password",
}

export default API;
