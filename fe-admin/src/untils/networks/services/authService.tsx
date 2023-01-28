import createApiServices from "../createApiService";
const api = createApiServices();
const handleLoginApi = (loginInfo: any) => {
  return api.makeRequest({
    url: "/api/v1/auth/login",
    method: "POST",
    data: loginInfo,
  });
};
const updateUserInfo = (infoUpdate: any) => {
  //  const token = localStorage.getItem("token");
  return api.makeAuthRequest({
    url: "/api/v1/editUser",
    method: "PATCH",
    // headers: {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
    data: infoUpdate,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
};

export const authService = { handleLoginApi, updateUserInfo };
