import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { AuthUserToken } from "../action";
import { IAuthResponse } from "../types";

const GoogleAuth = () => {
    const navigator = useNavigate();

    const dispatch = useDispatch();

    const handleGoogleLogin = async (resp: any) => {
        console.log("Google resp", resp);
        const token = resp.credential;
        try {
            const resp = await axios.post<IAuthResponse>(
              `${APP_ENV.REMOTE_HOST_NAME}account/google-auth`,
              { token }
            );
            AuthUserToken(resp.data.token, dispatch);
            console.log("Login user token", resp);
            navigator("/");
          } catch (error: any) {
            console.log("Щось пішло не так", error);
          }
    }

    useEffect(() => {
        //global google
        window.google.accounts!.id.initialize({
          client_id: "71849370268-o9mp92t24hr5i0hvkur1e1b6og3dpbmu.apps.googleusercontent.com",
          callback: handleGoogleLogin
        });
        window.google.accounts!.id.renderButton(document.getElementById("signInDiv"),{
          theme: "outline", size: "small"
        });
      }, []);

    return (
        <>
            <div id="signInDiv"></div>
        </>
    );
}
export default GoogleAuth;