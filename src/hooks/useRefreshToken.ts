import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refresh_token } from "../api";

async function refreshToken() {
  const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
    localStorage.getItem("token") || "{}"
  );

  const { data } = await refresh_token(tokens.refreshToken);
  localStorage.setItem(
    "token",
    JSON.stringify({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })
  );
}
const useRefreshToken = () => {
  const location = useLocation();
  const tokens: { accessToken: string; refreshToken: string } = JSON.parse(
    localStorage.getItem("token") || "{}"
  );

  useEffect(() => {
    if (tokens.accessToken) {
      const decoded: { exp: number } = jwtDecode(tokens.accessToken);
      const now = new Date().getTime();

      const isExpired = now > decoded.exp * 1000;
      if (isExpired) {
        refreshToken();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  //   console.log(tokens.accessToken, tokens.refreshToken);
};

export default useRefreshToken;
