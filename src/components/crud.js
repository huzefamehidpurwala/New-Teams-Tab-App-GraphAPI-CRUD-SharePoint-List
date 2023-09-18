import axios from "axios";

// * accessToken from oauth2 technology.
const accessToken = sessionStorage.getItem("accessToken");

export async function Read(callbackFn) {
    // console.log("access tokenfsfas", localStorage.getItem("msal.idtoken"));
    // console.log("in crud ====", accessToken);
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
