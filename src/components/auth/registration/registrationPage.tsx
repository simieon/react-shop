import { FcGoogle } from "react-icons/fc";

import loginImg from "../../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { APP_ENV } from "../../../env";
import { AuthUserActionType, IAuthResponse, IRegister, IUser } from "../types";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { AuthUserToken } from "../action";
import GoogleAuth from "../google/GoogleAuth";
import { ChangeEvent, useState } from "react";


const RegistrationPage = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState(false);

  const initValues : IRegister ={
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      reCaptchaToken: ""
  };

  const regSchema = yup.object({
    firstname: yup.string().required("That field should not be empty"),
    lastname: yup.string().required("That field should not be empty"),
    email: yup.string().required("That field should not be empty"),
    password: yup.string().required("That field should not be empty")
  });

  const onRepeatPasswordChangeHandler = (
    e:ChangeEvent<HTMLInputElement>
  ) => {
    let rp = document.getElementById("repeatPassword");
    if(e.target.value!=values.password){
       rp?.classList.replace("bg-gray-100", "bg-pink-100");
       setConfirmPassword(false);
    }
    else{
        rp?.classList.replace("bg-pink-100", "bg-gray-100");
        setConfirmPassword(true);
    }
  };

  const onSubmitFormik = async (values: IRegister) => {
    
    try {
      if(!executeRecaptcha)
            return;
        
      //Перевірка чи пройшов перевірку гугл, користувач, чи не є він бот  
      values.reCaptchaToken=await executeRecaptcha();

      const resp = await axios.post<IAuthResponse>(
        `${APP_ENV.REMOTE_HOST_NAME}account/register`,
        values
      );

      AuthUserToken(resp.data.token, dispatch);

      console.log("Registration user token", resp);
      navigator("/");
    } catch (error: any) {
      console.log("Something went wrong", error);
    }
  }

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: regSchema
  });

  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = formik;

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={loginImg}
          alt="/"
        />

        <div className="flex justify-center py-10 ">
          <form className="max-w-[400px] w-full mx-auto bg-white p-8" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center py-2">Sign Up</h2>
           
            <div className="flex flex-col mb-4">
              <label>Firstname</label>
              <input className="border relative bg-gray-100 p-2" 
                type="text"
                name="firstname"
                id="firstname"
                onChange={handleChange}
                value={values.firstname}
                
                />
              {errors.firstname && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.firstname}</span> 
              </p>  
              }
            </div>

            <div className="flex flex-col mb-4">
              <label>Lastname</label>
              <input className="border relative bg-gray-100 p-2" 
                type="text"
                name="lastname"
                id="lastname"
                onChange={handleChange}
                value={values.lastname}
                
                />
              {errors.lastname && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.lastname}</span> 
              </p>  
              }
            </div>
            

            <div className="flex flex-col mb-4">
              <label>Email</label>
              <input className="border relative bg-gray-100 p-2" 
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                
                />
              {errors.email && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.email}</span> 
                
              </p>  
              }
            </div>
            <div className="flex flex-col ">
              <label>Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                
              />
              {errors.password && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password}</span> 
              </p>
              }
            </div>

            <div className="flex flex-col ">
              <label>Repeat Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                onChange={onRepeatPasswordChangeHandler}
                required
              />
            </div>
            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
                    disabled={!confirmPassword}
                    title={confirmPassword?"":"password confirmation error"}
            >
              Sign Up
            </button>        
            
            <div className="flex justify-between py-8">
              <GoogleAuth/>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;