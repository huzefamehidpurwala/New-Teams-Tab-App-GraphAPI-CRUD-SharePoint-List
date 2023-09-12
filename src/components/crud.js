import axios from "axios";

const accessToken =
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ijk2el9SeUZhdlNBN2JIMEJJUVJFbzd0d1pJWmpOdHZLVFFKamlnLXJ0UEkiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NzE2NWQxNy0wZmRiLTRmMmEtYTU2Ny0xMTY3ODNmYWUzYTUvIiwiaWF0IjoxNjk0NDk1OTExLCJuYmYiOjE2OTQ0OTU5MTEsImV4cCI6MTY5NDU4MjYxMSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhVQUFBQW5FbDBkQkVMQTVWVzlkMXAyaFZ0aW55NTZVbTdlR2hIME5ZSlpnTXBzY0xCSVRuejZhOTJuYUhMNEYwNHFaZ1EiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik1laGlkcHVyd2FsYSIsImdpdmVuX25hbWUiOiJIdXplZmEiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMDMuMTUuNjUuODQiLCJuYW1lIjoiSHV6ZWZhIE1laGlkcHVyd2FsYSIsIm9pZCI6IjFjYzU2MmI4LWMwY2QtNDcyYi1iNWJlLTQ1MWQyNzU4ZWQ4NiIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMkQyRTVCREQ2IiwicmgiOiIwLkFVb0FGMTBXUjlzUEtrLWxaeEZuZ19yanBRTUFBQUFBQUFBQXdBQUFBQUFBQUFDSkFOTS4iLCJzY3AiOiJBY2Nlc3NSZXZpZXcuUmVhZC5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIENoYW5uZWxNZXNzYWdlLlNlbmQgQ2hhdE1lc3NhZ2UuU2VuZCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkLkFsbCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkV3JpdGUuQWxsIE1haWwuUmVhZCBNYWlsLlNlbmQgTWFpbGJveFNldHRpbmdzLlJlYWQgTWFpbGJveFNldHRpbmdzLlJlYWRXcml0ZSBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBTaXRlcy5SZWFkV3JpdGUuQWxsIFVzZXIuSW52aXRlLkFsbCBVc2VyLlJlYWQgVXNlci5SZWFkV3JpdGUuQWxsIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiRjN0WWw0UkgtMEllQXdGUzhMTlhoeHpHampIZlk4MGRMWm5EbFhrcXJHayIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6IjQ3MTY1ZDE3LTBmZGItNGYyYS1hNTY3LTExNjc4M2ZhZTNhNSIsInVuaXF1ZV9uYW1lIjoiSHV6ZWZhLk1AeWdyMTEub25taWNyb3NvZnQuY29tIiwidXBuIjoiSHV6ZWZhLk1AeWdyMTEub25taWNyb3NvZnQuY29tIiwidXRpIjoiTE1mTmdqcXhyVTZqdDhIc0VPODdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjkwOTEyNDYtMjBlOC00YTU2LWFhNGQtMDY2MDc1YjJhN2E4IiwiOWI4OTVkOTItMmNkMy00NGM3LTlkMDItYTZhYzJkNWVhNWMzIiwiZjI4YTFmNTAtZjZlNy00NTcxLTgxOGItNmExMmYyYWY2YjZjIiwiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiWHhtc0RGeG10aENGU01JcmZTcV9jNmxjbXl5WG1XYlZtUUtodkEzbG9RUSJ9LCJ4bXNfdGNkdCI6MTY3NDg1NTMyNX0.O0gLbvinkTWkABoVHYwfrKc3OGsl-Mji7iRzl84oXrScDRxVNkn9Ehjv47dht-s5X_nxJorUD_CtNTJfDS9CHsN8M98dAYZrD2y8uzMhSg4Rqesb1Fz-24WXVRhaMSIhCgD8mKWvV8l0eyIR8bT7kvIV2DtYaVmtfp6aWiAmv15-BwuH_Gf5fC5FYYTJRd8zUE_9wEyl012ebOmEL8X7YISzKpZ2RAuTLU7iGhGQsLrkmF5_iCXkX4bFDhdY5CZYurBPTRWnevt7FUhOeD1bGLv6xgOzBWdGHjmlTuD6v3ZI5nsQ2Z6FKsIuJ8Gunjg348ofArTgNcLGijlZ1GggFg";

export async function Read(callbackFn) {
    // console.log("access tokenfsfas", localStorage.getItem("msal.idtoken"));
    await axios
        .get(
            "https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items?$expand=fields",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        .then((response) => callbackFn(response?.data))
        .catch((error) => console.log("error", error));
}

export async function Delete(id) {
    if (window.confirm("Sure Delete?")) {
        await axios
            .delete(
                `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 204) {
                    alert("successful delete");
                } else {
                    alert("delete failed");
                }
            });

        window.location.reload();
    }

    // setShowEdit(!showEdit);
}

export async function Update(id, data) {
    // alert("HandleDelete " + msg);
    // console.log("HandleDelete ", msg);

    if (window.confirm("Sure Update?")) {
        await axios
            .patch(
                `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items/${id}/fields`,
                { ...data },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    // setShowEdit(!showEdit);
                    alert("successful update");
                } else {
                    alert("update failed");
                }
            });

        window.location.reload();
    }
}

export async function Create(id, data) {
    await axios
        .post(
            `https://graph.microsoft.com/v1.0/sites/607af17b-3466-43ec-8d7b-1047efcf6a27/lists/ed863f13-0229-4832-9770-98ed8dbcad1d/items`,
            {
                fields: {
                    ...data,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        .then((response) => {
            if (response.status === 201) {
                // setShowEdit(!showEdit);
                // BtnClick();
                alert("successful create");
            } else {
                alert("create failed");
            }
        });

    window.location.reload();
}
