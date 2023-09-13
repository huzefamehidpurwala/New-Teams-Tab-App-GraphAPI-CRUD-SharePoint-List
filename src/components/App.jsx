// https://fluentsite.z22.web.core.windows.net/quick-start
import {
    FluentProvider,
    teamsLightTheme,
    teamsDarkTheme,
    teamsHighContrastTheme,
    tokens,
} from "@fluentui/react-components";
import { useEffect } from "react";
import {
    HashRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import { app, authentication } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./config";
import { authConfig, silentRequest } from "./authtoken";
import {
    InteractionRequiredAuthError,
    PublicClientApplication,
} from "@azure/msal-browser";
// import {
//     UserAgentApplication,
//     AuthenticationParameters,
//     Configuration,
// } from "@azure/msal";
import { TeamsUserCredential } from "@microsoft/teamsfx";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
    const { loading, theme, themeString, teamsUserCredential } =
        useTeamsUserCredential({
            initiateLoginEndpoint: config.initiateLoginEndpoint,
            clientId: config.clientId,
        });
    useEffect(() => {
        loading &&
            app.initialize().then(async () => {
                /* app.getContext().then(async (context) => {
                    const msalConfig = {
                        auth: {
                            clientId: "1b7e49c0-368e-4c65-9ca2-5c5408b4a200",
                            authority: `https://login.microsoftonline.com/47165d17-0fdb-4f2a-a567-116783fae3a5`,
                            navigateToLoginRequestUrl: false,
                        },
                        cache: {
                            cacheLocation: "sessionStorage",
                        },
                    };

                    const msalInstance = new PublicClientApplication(
                        msalConfig
                    );
                    msalInstance
                        .handleRedirectPromise()
                        .then((tokenResponse) => {
                            if (tokenResponse !== null) {
                                authentication.notifySuccess(
                                    JSON.stringify({
                                        sessionStorage: sessionStorage,
                                    })
                                );
                                console.log(
                                    "from app.js toekenResponse = ",
                                    tokenResponse
                                );
                                // localStorage.setItem("tokenResponse", tokenResponse);
                                console.log("tokenResponse", tokenResponse);
                            } else {
                                authentication.notifyFailure(
                                    "Get empty response."
                                );
                            }
                        })
                        .catch((error) => {
                            authentication.notifyFailure(JSON.stringify(error));
                        });
                }); */

                // =================================================================================================================

                /* // const authTokenRequest = {
                //     resources: [config.clientId, config.clientSecret],
                //     silent: true,
                // };

                authentication.getAuthToken().then(async (response) => {
                    // console.log("response from app.jsx === ", response);
                    const authConfig = {
                        initiateLoginEndpoint: config.initiateLoginEndpoint,
                        clientId: config.clientId,
                    };
                    const credential = new TeamsUserCredential(authConfig);

                    const token = await credential.login(["User.Read"]);

                    console.log("TOKEN------------->", token.token);
                }); */

                // =================================================================================================================

                /* const msalInstance = new PublicClientApplication(authConfig);

                try {
                    const loginResponse = await msalInstance.ssoSilent(
                        silentRequest
                    );
                    console.log("response from app.jsx === ", loginResponse);
                } catch (err) {
                    if (err instanceof InteractionRequiredAuthError) {
                        const loginResponse = await msalInstance
                            .loginPopup(silentRequest)
                            .catch((error) => {
                                // handle error
                            });
                    } else {
                        // handle error
                    }
                } */

                // =================================================================================================================

                const authConfig = {
                    initiateLoginEndpoint: config.initiateLoginEndpoint,
                    clientId: config.clientId,
                    // clientSecret: config.clientSecret,
                    // tenantId: config.tenantId,
                    // authorityHost: config.authorityHost,
                };

                const credential = new TeamsUserCredential(authConfig);

                const token = await credential.getToken(["User.Read"]);

                // console.log("TOKEN------------->", token.token);
                sessionStorage.setItem("accessToken", token.token);

                // Hide the loading indicator.
                app.notifySuccess();
            });

        // const authTokenRequest = {
        //     successCallback: function (result) {
        //         console.log("Success: " + result);
        //     },
        //     failureCallback: function (error) {
        //         console.log("Error getting token: " + error);
        //     },
        // };
        // authentication.getAuthToken(authTokenRequest);

        // =====================================================================================

        /* const config = {
            auth: {
                clientId: "<client id - your app's client id>",
                authority: `https://login.microsoftonline.com/<tenantid>`,
                redirectUri: "<the redirect Uri>",
            },
        };

        const params = {
            authority: `https://login.microsoftonline.com/${Tenantid}`,
            scopes: [`${AppIDUri}/user_impersonation`],
            l: "<-- the API that you're trying to call",
        };

        const myMSAL = new UserAgentApplication(config); */
    }, [loading]);
    return (
        <TeamsFxContext.Provider
            value={{ theme, themeString, teamsUserCredential }}
        >
            <FluentProvider
                theme={
                    themeString === "dark"
                        ? teamsDarkTheme
                        : themeString === "contrast"
                        ? teamsHighContrastTheme
                        : {
                              ...teamsLightTheme,
                              colorNeutralBackground3: "#eeeeee",
                          }
                }
                style={{ background: tokens.colorNeutralBackground3 }}
            >
                <Router>
                    {!loading && (
                        <Routes>
                            <Route path="/privacy" element={<Privacy />} />
                            <Route
                                path="/termsofuse"
                                element={<TermsOfUse />}
                            />
                            <Route path="/tab" element={<Tab />} />
                            <Route path="/config" element={<TabConfig />} />
                            <Route
                                path="*"
                                element={<Navigate to={"/tab"} />}
                            ></Route>
                        </Routes>
                    )}
                </Router>
            </FluentProvider>
        </TeamsFxContext.Provider>
    );
}
