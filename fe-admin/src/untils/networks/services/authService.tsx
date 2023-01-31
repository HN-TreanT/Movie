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

const refreshToken = (userInfo: any) => {
  const { refreshToken } = userInfo;
  return api.makeRequest({
    url: "/api/v1/auth/refresh",
    method: "POST",
    data: { refreshToken },
  });
};

export const authService = { handleLoginApi, updateUserInfo, refreshToken };
