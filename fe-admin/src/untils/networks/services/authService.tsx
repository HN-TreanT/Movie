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
    data: infoUpdate,
  });
};

export const authService = { handleLoginApi, updateUserInfo };
