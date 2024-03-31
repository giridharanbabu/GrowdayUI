"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  businessSelectors,
  fetchBusinessById,
  getBusinesses,
} from "@/application/reducers/business-reducer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "@/components/loaders/Loader";
import {
  loginCustomer,
  customerSelectors,
  addNewCustomer,
} from "@/application/reducers/customer-reducer";

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const [customer, setCustomer] = useState();
  // const {
  //   data: getSingleBusiness,
  //   loading: getLoading,
  //   error: getError,
  // } = useSelector(businessSelectors.fetchBusinessById);

  const [currentBusiness, setCurrentBusiness] = useState(null);

  const {
    data: getAllBusiness,
    loading: getAllBusinessLoading,
    error: getAllBusinessError,
  } = useSelector(businessSelectors.getBusinesses);

  const {
    data: signupData,
    loading: signupLoading,
    error: signupError,
  } = useSelector(customerSelectors.addNewCustomer);

  const {
    data: loggedInCustomerData,
    loading: customerLoginLoading,
    error: customerLoginError,
  } = useSelector(customerSelectors.loginCustomer);

  const URL = params.slug[0];

  useEffect(() => {
    const customerToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("customerToken")
        : null;
    setCustomer(customerToken);
  }, [setCustomer]);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  const handleLogout = () => {
    typeof window !== "undefined"
      ? window.localStorage.removeItem("customerToken")
      : null;
    setCustomer(null);
    toast.success("Sucessfully  Logged out...");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // Create an object with email and password
    const credentials = {
      email: email,
      password: password,
    };

    console.log(credentials, "credentials here-----");

    // Dispatch action with email and password as a single object
    dispatch(loginCustomer(credentials));
    setCustomer(true);
    if (customerLoginError) {
      toast.error(customerLoginError);
    } else if (loggedInCustomerData) {
      toast.success("Login Success..");
    }
  };

  const [name, setName] = useState("");
  const [signupEmail, setSingupEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Function to handle signup
  const handleSignup = () => {
    const businessId =
      currentBusiness && currentBusiness._id && currentBusiness._id.$oid;
    const userData = {
      name: name,
      email: signupEmail,
      phone: phone,
      business_ids: businessId,
      created_at: new Date().toISOString(), // Current timestamp
    };

    dispatch(addNewCustomer(userData));
    if (signupError) {
      toast.error(signupError);
    } else if (signupData) {
      toast.success("Signup success.. password sent to your email");
    }
  };

  useEffect(() => {
    if (Array.isArray(getAllBusiness) && URL) {
      const matchingBusiness = getAllBusiness.find(
        (business) => business.business_url.split("/")[1] === URL
      );
      if (matchingBusiness) {
        setCurrentBusiness(matchingBusiness);
      }
    }
  }, [getAllBusiness, URL]);

  return (
    <>
      <div className="flex flex-row h-screen bg-lightbg dark:bg-darkbg">
        <ToastContainer />

        <main className="w-full ">
          {/* navbar */}
          <div className="w-full  flex flex-row h-[7%] border-b-[1px] border-b-lightborder dark:border-b-darkborder justify-between">
            <div className="p-3 pl-5 font-bold text-xl">
              {currentBusiness && currentBusiness.name}
            </div>

            <div className="flex flex-row select-none items-center space-x-2 pr-5 text-lightbg dark:text-darktext">
              {customer && hasMounted ? (
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-palettePrimary px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-row select-none items-center space-x-2 pr-5 text-lightbg dark:text-darktext">
                  <div className="p-[1%] ">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-palatteSecondary px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                          Login
                        </button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                        {/* Dialog content */}
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <Dialog.Title className="text-mauve12 m-0 text-[19px] text-center font-black">
                            Welcome to {currentBusiness && currentBusiness.name}
                          </Dialog.Title>
                          <Dialog.Description className="text-mauve11 text-center mt-[10px] mb-5 text-[18px] font-bold leading-normal">
                            Login
                          </Dialog.Description>
                          <fieldset className="mb-[15px] flex items-center gap-5">
                            <label
                              className="text-violet11 w-[90px] text-right text-[15px]"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </fieldset>
                          <fieldset className="mb-[15px] flex items-center gap-5">
                            <label
                              className="text-violet11 w-[90px] text-right text-[15px]"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </fieldset>
                          <div className="mt-[25px] flex gap-4 justify-center">
                            <Dialog.Close asChild>
                              <button
                                onClick={handleLogin}
                                className="bg-palatteSecondary text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                              >
                                Login
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button className="bg-palettePrimary text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Close
                              </button>
                            </Dialog.Close>
                          </div>
                          <Dialog.Close asChild>
                            <button
                              className="text-violet11 hover:bg-palatteSecondary focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                              aria-label="Close"
                            >
                              <X />
                            </button>
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </div>

                  {/* signup */}
                  <div className="p-[1%] ">
                    <div className="p-[1%] ">
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-palettePrimary px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                            Signup
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <Dialog.Title className="text-mauve12 m-0 text-[19px] text-center font-black">
                              Welcome to{" "}
                              {currentBusiness && currentBusiness.name}
                            </Dialog.Title>
                            <Dialog.Description className="text-mauve11 text-center mt-[10px] mb-5 text-[18px] font-bold leading-normal">
                              Register here
                            </Dialog.Description>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                              <label
                                className="text-violet11 w-[90px] text-right text-[15px]"
                                htmlFor="name"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </fieldset>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                              <label
                                className="text-violet11 w-[90px] text-right text-[15px]"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="email"
                                value={signupEmail}
                                onChange={(e) => setSingupEmail(e.target.value)}
                              />
                            </fieldset>
                            <fieldset className="mb-[15px] flex items-center gap-5">
                              <label
                                className="text-violet11 w-[90px] text-right text-[15px]"
                                htmlFor="phone"
                              >
                                Phone
                              </label>
                              <input
                                type="text"
                                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </fieldset>
                            <div className="mt-[25px] flex gap-4 justify-center">
                              <button
                                onClick={handleSignup}
                                className="bg-palettePrimary text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                              >
                                Signup
                              </button>
                              <Dialog.Close asChild>
                                <button className="bg-palatteSecondary text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                  Close
                                </button>
                              </Dialog.Close>
                            </div>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-10">
            {currentBusiness ? (
              <div className="flex flex-col justify-center items-center  rounded-xl p-10">
                <div className="text-5xl ">
                  Welcome to{" "}
                  <span className="font-bold">{currentBusiness.name}</span>{" "}
                </div>
                <div>{currentBusiness.description}</div>
              </div>
            ) : (
              <Loader />
            )}
          </div>

          <div className="p-10">
            {signupLoading || customerLoginLoading || getAllBusinessLoading ? (
              <Loader />
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
