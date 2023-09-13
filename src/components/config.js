const config = {
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
    clientId: process.env.REACT_APP_CLIENT_ID,
    authorityHost: process.env.REACT_APP_OAUTH_AUTHORITY_HOST,
    tenantId: process.env.REACT_APP_TENANT_ID,
    clientSecret: process.env.SECRET_REACT_APP_CLIENT_SECRET,
    // apiEndpoint: process.env.REACT_APP_FUNC_ENDPOINT,
    // apiName: process.env.REACT_APP_FUNC_NAME,
};

export default config;
