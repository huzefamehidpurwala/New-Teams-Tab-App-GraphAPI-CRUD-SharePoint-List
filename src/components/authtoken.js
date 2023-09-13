import config from "./config";

export const authConfig = {
    auth: {
        clientId: config.clientId,
    },
    cache: {
        cacheLocation: "localStorage",
    },
};

export const silentRequest = {
    scopes: ["User.Read", "Mail.Read"],
    // loginHint: "user@contoso.com"
};
