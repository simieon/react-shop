import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RegistrationPage from "./registrationPage";


const Registration = () => {

    return (
        <GoogleReCaptchaProvider reCaptchaKey="6Ldb4kAlAAAAAP4PddQUIGM-mAgktMK139fO6FIZ">
            <RegistrationPage/>
        </GoogleReCaptchaProvider>
    );
}

export default Registration;