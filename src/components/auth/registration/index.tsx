import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { IRegister } from "../types";

const Registration = () => {
    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigator = useNavigate();
    const [model, setModel] = useState<IRegister>({
        firstname:"",
        lastname:"",
        email: "",
        password: ""
      });
    
      const onChangeHandler = (
        e:
          | ChangeEvent<HTMLInputElement>
          | ChangeEvent<HTMLTextAreaElement>
          | ChangeEvent<HTMLSelectElement>
      ) => {
        setModel({ ...model, [e.target.name]: e.target.value });
      };

      const onRepeatPasswordChangeHandler = (
        e:ChangeEvent<HTMLInputElement>
      ) => {
        let rp = document.getElementById("repeatPassword");
        if(e.target.value!=model.password){
           rp?.classList.replace("border-gray-300", "border-red-300");
           rp?.classList.replace("focus:border-indigo-500", "focus:border-red-500");
           setConfirmPassword(false);
        }
        else{
            rp?.classList.replace("border-red-300", "border-gray-300");
            rp?.classList.replace("focus:border-red-500", "focus:border-indigo-500");
            setConfirmPassword(true);
        }
      };
    
    
      const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const data = await axios.post(
            `${APP_ENV.REMOTE_HOST_NAME}account/register`,
            model,
          );
          console.log("Registration user token", data);
            navigator("/");
        } catch (error: any) {
          console.log("Something went wrong", error);
        }
      };
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
            <div>
                <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Registration
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmitHandler}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="text" className="sr-only">
                    First name
                    </label>
                    <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    autoComplete="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="First name"
                    value={model.firstname}
                    onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="text" className="sr-only">
                    Last name
                    </label>
                    <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="text"
                    required
                    className="relative mt-1 block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Last name"
                    value={model.lastname}
                    onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">
                    Email address
                    </label>
                    <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative mt-1 block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={model.email}
                    onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative mt-1 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={model.password}
                    onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                    Repeat Password
                    </label>
                    <input
                    id="repeatPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative mt-1 block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Repeat Password"
                    onChange={onRepeatPasswordChangeHandler}
                    />
                </div>
                </div>

                <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    I accept the terms and conditions
                    </label>
                </div>

                </div>

                <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={!confirmPassword}
                    title={confirmPassword?"":"password confirmation error"}
                >
                    Sign up
                </button>
                </div>
            </form>
            </div>
            </div>
        </>
    )
}
export default Registration;