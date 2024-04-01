"use client";

import { cn } from "@/utils/ui/tailwindmerge";
import Link from "next/link";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";
// icons
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { SideNavItemType } from "@/utils/types/sidebarTypes";
import {
  Divide,
  HandshakeIcon,
  LayoutDashboardIcon,
  UserRoundCogIcon,
  Users,
  BookUser,
} from "lucide-react";
import {
  commonActions,
  commonSelectors,
} from "@/application/reducers/common-reducer";
import { useDispatch, useSelector } from "react-redux";
import logoSVG from "../../../public/logo.svg";
import iconSVG from "../../../public/icon.svg";
import Image from "next/image";

const sidebarItmes = [
  {
    icon: {
      icon: <LayoutDashboardIcon />,
      fillIcon: <LayoutDashboardIcon />,
    },
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: {
      icon: <HandshakeIcon />,
      fillIcon: <HandshakeIcon />,
    },
    label: "Business",
    href: "/dashboard/business",
  },
  {
    icon: {
      icon: <Users />,
      fillIcon: <Users />,
    },
    label: "Customers",
    href: "/dashboard/customers",
  },
  {
    icon: {
      icon: <BookUser />,
      fillIcon: <BookUser />,
    },
    label: "Members",
    href: "/dashboard/settings/members",
  },
  // {
  //   icon: {
  //     icon: <UserRoundCogIcon />,
  //     fillIcon: <UserRoundCogIcon />,
  //   },
  //   label: "Settings ",
  //   href: "/dashboard/settings",
  // },
];

export default function Sidebar() {
  // const [isSideBarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { updateSideBar } = commonActions;
  const isSideBarOpen = useSelector(commonSelectors.isSideBarOpen);

  return (
    <div
      className={cn(
        "pt-[10%] flex flex-col  gap-3 border-r-[1px] border-lightborder dark:border-darkborder ",
        isSideBarOpen && "md:w-[]"
      )}
    >
      {/* growday logo  */}
      <div className="py-[8%]  pb-[6%]">
        {isSideBarOpen ? (
          <div className="group flex justify-center transform transition-transform duration-300 ease-in-out">
            <Image
              src={logoSVG}
              className="w-32 -mt-[10%]  h-full  transform transition-transform duration-300 ease-in-out"
              width={100}
              height={100}
              alt="logo-"
            />
          </div>
        ) : (
          <div className="group flex justify-center transform transition-transform duration-300 ease-in-out">
            <Image
              src={iconSVG}
              className="w-10 mt-[5%]  transform transition-transform duration-300 ease-in-out"
              width={100}
              height={100}
              alt="logo-"
            />
          </div>
        )}
      </div>

      {/* toggle button  */}
      {/* <section
        onClick={() => dispatch(updateSideBar(!isSideBarOpen))}
        className={cn(" w-full ")}
      >
        <div className=" flex flex-row items-center px-[10%] ">
          <div>
            <RiArrowLeftDoubleFill
              className={cn(
                "text-gray-400 transition-all text-2xl",
                !isSideBarOpen && "rotate-180 ml-[45%]"
              )}
            />
          </div>
        </div>
      </section> */}

      {/* sidenavitems */}

      <div className="px-5  ">
        {sidebarItmes.map((d, i) => (
          <HoverContainer key={i} href={d.href}>
            <div className=" my-2 ">
              <SideNavItem
                icon={d?.icon}
                href={d?.href}
                isSideBarOpen={isSideBarOpen}
                label={d?.label}
              />
            </div>
          </HoverContainer>
        ))}
      </div>
    </div>
  );
}

const SideNavItem = ({ href, isSideBarOpen, icon, label }) => {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActivePage = pathname === href;
  console.log("isActivePage", isActivePage);
  return (
    <div
      className={cn(
        "flex py-2 justify-between",
        isActivePage && "font-semibold bg-palatteTeritary rounded-md"
      )}
    >
      <Link
        ref={animationParent}
        href={href}
        className="flex  cursor-pointer px-2 "
      >
        <div className="flex items-center justify-center w-[20px] h-[20px] text-2xl  ">
          {isActivePage ? icon?.fillIcon : icon?.icon}
        </div>
        <div className="flex items-center">
          {isSideBarOpen && (
            <p
              className={cn(
                "text-md hidden font-normal md:block ml-[15px] transition-all ",
                isActivePage && "font-semibold "
              )}
            >
              {label}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

const HoverContainer = ({ children, className, href }) => {
  return (
    <div className=" transition-all rounded-md cursor-pointer hover:bg-palatteTeritary text-sm font-normal dark:hover:bg-zinc-900 group-hover:dark:bg-zinc-900">
      <Link href={href}>{children}</Link>
    </div>
  );
};
