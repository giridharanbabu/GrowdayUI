"use client";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../../public/icon.svg";
import MobileDialog from "./mobileDialog";
import ThemeSwitcher from "./ThemeSwitcher";
import { cn } from "@/utils/ui/tailwindmerge";
import {
  commonActions,
  commonSelectors,
} from "@/application/reducers/common-reducer";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { Settings, UserRoundCogIcon, Bell } from "lucide-react";
import { authActions } from "@/application/reducers/auth-reducer";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // Search
  const router = useRouter();
  const dispatch = useDispatch();
  const { updateSideBar } = commonActions;
  const { clearToken } = authActions;
  const [searchvalue, setSearchValue] = useState("");
  const [logOut, setLogOut] = useState(false);
  const isSideBarOpen = useSelector(commonSelectors.isSideBarOpen);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchvalue);
  };

  // Profile Dropdown
  const [profilemenu, setprofilemenu] = useState(false);
  const profileDropdown = () => {
    setprofilemenu(!profilemenu);
  };

  useEffect(() => {
    if (logOut) {
      const tokenLocal =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : null;
      router.replace("/");
    }
  }, [router, logOut]);

  const handleLogOut = () => {
    dispatch(clearToken());
    setLogOut(true);
  };

  return (
    <div>
      <div className="bg-lightbg dark:bg-darkbg border-b border-lightborder dark:border-darkborder shadow-sm">
        <div className="max-w-screen flex items-center justify-between mx-auto px-1 py-[1px]">
          <div className="flex flex-row ">
            <section
              onClick={() => dispatch(updateSideBar(!isSideBarOpen))}
              className={cn(" w-full ")}
            >
              <div className=" flex flex-row items-center px-[10%] ">
                <div>
                  <RiArrowLeftDoubleFill
                    className={cn(
                      "text-gray-400 transition duration-1500 ease-in-out text-2xl",
                      !isSideBarOpen && "rotate-180 ml-[45%]"
                    )}
                  />
                </div>
              </div>
            </section>
            {/* Icon and dialog box menu for mobile view */}
            <Image
              src={icon}
              className="w-10  flex md:hidden"
              width={100}
              height={100}
              alt="logo-"
            />
            <div className="flex md:hidden self-center mt-[7px]">
              <MobileDialog />
            </div>
          </div>
          <div className="flex items-center">
            {/* Theme switcher */}
            <ThemeSwitcher />
            <div
              title="Go to Profile"
              className="border-[1px] p-2 m-2 bg-lightbg dark:bg-darkbg border-b border-lightborder dark:border-darkborder flex items-center rounded-lg"
            >
              <Bell size={20} className=" w-4 h-4" />
            </div>
            <Link href="/dashboard/settings" className="flex  cursor-pointer ">
              <div
                title="Go to Profile"
                className="border-[1px] p-2 m-2 bg-lightbg dark:bg-darkbg border-b border-lightborder dark:border-darkborder flex items-center rounded-lg"
              >
                <UserRoundCogIcon size={20} className=" w-4 h-4" />
              </div>
            </Link>
            <div className="border-[1px] p-1 px-2 m-2 text-white bg-darkbg dark:bg-darkbg border-b border-lightborder dark:border-darkborder flex items-center rounded-lg">
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
