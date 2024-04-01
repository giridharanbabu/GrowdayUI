"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../components/Error/Formerror/FormError"; //error componet
import { ErrorComponent } from "../../components/Error/ErrorComponent/ErrorComponent"; //error componet
import { useValidate } from "../../utils/formValidations/user/login"; //validation
import { Routes, LoginPageContents } from "@/utils/enums/constants";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { IoLogoMicrosoft } from "react-icons/io5";
import logoImg from "../../../public/logo.svg";
import Image from "next/image";
import { authSelectors, saveLogin } from "@/application/reducers/auth-reducer";
import AllBusinessLoader from "@/components/loaders/Loader";
// import { authSelectors, saveLogin } from "@/application/reducers/auth-reducer";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useValidate();
  const [errorrMessage, setErrorMessage] = useState("");
  const token = useSelector(authSelectors.authToken);
  const { loading: loginLoading , error:loginError} = useSelector(authSelectors.loginCall);
  // show  or hide password handler
  const [showPassword, setShowPassword] = useState(false);
  const [Login, setLogin] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState(false);

  //change to this token if we need to avoid logging in on each refresh
  //use token if we want to change it according to the
  // const tokenLocal = localStorage.getItem("token")

  useEffect(() => {
    if (Login && !loginLoading) {
      const tokenLocal =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : null;
      if (tokenLocal) {
        router.replace("/dashboard");
      }
    }
  }, [router, Login, loginLoading]);

  const formSubmit = async (e) => {
    const payload = {
      email: e.username,
      password: e.password,
    };
    dispatch(saveLogin(payload));
    setLogin(true);
  };

  return (
    <section className="bg-lightbg dark:bg-darkbg ">
      <FormError errors={loginError} />
      {errorrMessage && (
        <ErrorComponent data={{ path: "login", Message: errorrMessage }} />
      )}
      {loginLoading && <AllBusinessLoader />}

      <div className="flex flex-row justify-center h-screen ">
        <div className="w-full md:w-1/2 bg-palatteFour dark:bg-darkbg flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            {/* <div className='mb-6'>
              <Image width={500} height={500} className="transform transition-transform duration-300 ease-in-out hover:scale-105 w-[10%] h-[10%] " alt="logo" src={icon}></Image>
            </div> */}
            <div className="font-black text-3xl">Log into your Account</div>
            <div className="text-[15px] text-gray-500 font-extralight ">
              Welcome back! select method to log in:
            </div>

            {/* form start */}
            <div className="flex flex-col  ">
              <div className="flex flex-row items-start gap-2 py-7 w-max mx-auto">
                <div className="transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-row justify-center items-center  p-1 border rounded-md px-7 py-2 gap-3 text-sm">
                  <FcGoogle /> Google
                </div>
                <div className="transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-row justify-center items-center  p-1 border rounded-md px-7 py-2 gap-3 text-sm">
                  <FaApple /> Apple
                </div>
                <div className="transform transition-transform duration-300 ease-in-out hover:scale-105 flex flex-row justify-center items-center p-1 border rounded-md px-7 py-2 gap-3 text-sm">
                  <IoLogoMicrosoft />
                  Microsoft
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-center">
                  <div className="border-b-[1px] w-1/4"></div>
                  <div className="mx-2 text-[12px] text-gray-600">
                    or continue with email
                  </div>
                  <div className="border-b-[1px] w-1/4"></div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(formSubmit)}
                method="POST"
                className=" "
              >
                <div className="pt-5">
                  <div className="mb-4">
                    <input
                      placeholder={LoginPageContents.usernameLable}
                      type="text"
                      id="email"
                      className="text-[14px] bg-gray-50 dark:bg-darkbg border-lightborder dark:border-darkborder border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
                      {...register("username")}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        placeholder={LoginPageContents.passwordLable}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="text-[14px] bg-gray-50 dark:bg-darkbg border-lightborder dark:border-darkborder  border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
                        {...register("password")}
                      />
                      <span
                        className="cursor-pointer text-lighttext dark:text-darktext absolute right-2 top-2"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5" />
                        ) : (
                          <Eye className="w-5" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center text-[14px]">
                  <input type="checkbox" name="" id="" />
                  <div>
                    <span className="px-2 "> Remember me</span>
                  </div>
                  <div className="items-end ml-auto text-blue-700 hover:underline cursor-pointer font-semibold">
                    <h1>Forgot Password?</h1>
                  </div>
                </div>
                <div>
                  <div className="my-6">
                    <button
                      type="submit"
                      className="select-none bg-palatteSecondary border-[#131313] text-white font-bold py-2 px-4 w-full items-center rounded  transform transition-transform duration-300 ease-in-out hover:scale-105"
                      disabled={loginLoading} // Disable the button when loading is true
                    >
                      {loginLoading ? "Logging in..." : "Log in"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* form end */}

            <div>
              <div className="pb-5 text-center text-lighttext dark:text-darktext select-none text-[14px]">
                <span>
                  Don&apos;t have and account?{" "}
                  <Link
                    href={Routes.signUp}
                    className="font-bold text-blue-600"
                  >
                    Create an account
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex w-1/2 flex-col  justify-center items-center">
          <Image
            width={100}
            height={100}
            className="transform transition-transform duration-300 ease-in-out hover:scale-105 w-[50%]"
            alt="logo"
            src={logoImg}
          ></Image>
          <div className="text-[30px] font-medium -mt-8">Nurture to lead</div>
        </div>
      </div>
    </section>
  );
};

export default Page;
