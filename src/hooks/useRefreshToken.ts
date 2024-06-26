import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refresh_token } from "../api";

async function refreshToken() {
  const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
    localStorage.getItem("token") || "{}"
  );

  const { data } = await refresh_token(tokens.refreshToken);
  console.log(data);
}
const useRefreshToken = () => {
  const location = useLocation();
  const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
    localStorage.getItem("token") || "{}"
  );

  const decoded: { exp: number } = jwtDecode(tokens.accessToken);
  const now = new Date().getTime();

  const isExpired = now > decoded.exp * 1000;

  useEffect(() => {
    if (isExpired) {
      refreshToken();
    }
  }, [location]);

  //   console.log(tokens.accessToken, tokens.refreshToken);
};

export default useRefreshToken;
