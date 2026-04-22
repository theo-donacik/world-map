import { useEffect } from "react";
import { apiGetToken } from "../dao/discord";
import { TokenResponse } from "../util/types";

export default function OauthCallback() {
  useEffect(() => {
    const hash = window.location.hash;         
    const queryString = hash.split('?')[1];  
    const params = new URLSearchParams(queryString);
    const code = params.get('code');

    if (!code) {
      window.close();
      return;
    }

    apiGetToken(code).then((resp: TokenResponse) => {
      if (window.opener) {
        window.opener.postMessage(
          { message: "success", source: "oauth", token: resp.token },
          process.env.REACT_APP_FRONTEND_URL
        );
      }

      window.close();
    }).catch(() => {
      window.close();
    })


  }, []);

  return <div>Logging you in...</div>;
}