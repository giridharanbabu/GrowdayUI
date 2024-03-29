"use client";
import {
  MailIcon,
  ShieldEllipsis,
  CheckCircle2Icon,
  Calendar,
  PhoneIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getActivityIcon } from "@/components/ui/ActivityLog";
import { useDispatch, useSelector } from "react-redux";

import { getUser, userSelectors } from "@/application/reducers/user-reducer";

const profile = {
  name: "Charlotte Bell",
  location: "Melbourne, Australia",
  email: "charlottebell@gmail.com",
  phoneNumber: "+9187264781",
  active: true, // You can set this dynamically based on the user's status
  businesses: [{ name: "ABC Company" }, { name: "XYZ Corporation" }],
};

const Page = () => {
  const dispatch = useDispatch();
  const {
    data: getUserData,
    loading: getUserLoading,
    error: getUserError,
  } = useSelector(userSelectors.getUser);

  useEffect(() => {
    console.log("callig ");
    dispatch(getUser());
  }, [dispatch]);

  console.log(getUserData, "user data here---");

  const [activeTab, setActiveTab] = useState("Activity"); // State to manage active tab
  const [mounted, setMounted] = useState(false); // State to track component mounting

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [menuOpen1, setMenuOpen1] = useState(false); // State to track which menu is open
  const toggleMenu1 = () => {
    setMenuOpen1((prevState) => !prevState);
  };

  const [menuOpen2, setMenuOpen2] = useState(false); // State to track which menu is open
  const toggleMenu2 = () => {
    setMenuOpen2((prevState) => !prevState);
  };

  const activityLog = [
    {
      datetime: "2024-03-18T08:30:00",
      activity: "User logged in",
      type: "login",
    },
    {
      datetime: "2024-03-18T10:15:00",
      activity: "Uploaded profile picture",
      type: "upload",
    },
    {
      datetime: "2024-03-18T11:45:00",
      activity: "Updated contact information",
      type: "update_contact",
    },
    {
      datetime: "2024-03-18T13:20:00",
      activity: "Joined a program",
      type: "join_program",
    },
    {
      datetime: "2024-03-18T15:00:00",
      activity: "Completed program module 1",
      type: "complete_module",
    },
    {
      datetime: "2024-03-18T16:45:00",
      activity: "Modified program settings",
      type: "modify_settings",
    },
    {
      datetime: "2024-03-18T18:10:00",
      activity: "Added new business tag",
      type: "add_tag",
    },
    {
      datetime: "2024-03-18T19:30:00",
      activity: "Sent an email to support",
      type: "send_email",
    },
    {
      datetime: "2024-03-18T21:00:00",
      activity: "Received a phone call",
      type: "receive_call",
    },
    {
      datetime: "2024-03-18T22:45:00",
      activity: "Logged out",
      type: "logout",
    },
  ];

  // Define content for each tab
  const tabContent = {
    Activity: (
      <div>
        <div className=" p-4">
          <div className="px-12">
            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              {activityLog.map((log, index) => (
                <div key={index} className="flex flex-row mb-10 ms-8 ">
                  <div>{getActivityIcon(log.type)}</div>
                  <div className="pt-1">
                    <time className="block -mt-2 text-[12px] font-normal leading-none text-gray-400 dark:text-gray-500">
                      {new Date(log.datetime).toLocaleString()}
                    </time>
                    <h3 className="flex items-center mb-1 text-[15px]  text-gray-900 dark:text-white">
                      {log.activity}
                    </h3>
                  </div>
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
    ),
    Payment: (
      <div>
        <div className="p-10">Payment page</div>
      </div>
    ),
    History: (
      <div>
        <div className="p-10">History</div>
      </div>
    ),
  };

  const businesses = [
    { name: "Business 1", customers: 100, active: true },
    { name: "Business 2", customers: 50, active: false },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className=" ">
      {/* profile area */}
      <div className="p-[1%] ">
        <div className="mb-2 flex flex-col md:flex-row items-center">
          <div className="p-[1%] m-[1%] w-20 h-20 bg-orange-400 rounded-full ring-4 shadow-xl ring-white dark:ring-gray-500 relative">
            {/* Profile image */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
              {getUserData?.name?.charAt(0)}
            </div>
          </div>
          <div className="flex flex-col px-4">
            <div className="flex flex-row text-xl justify-center md:justify-start font-black">
              <div>{getUserData.name}</div>

              {/* make the data for active profile or not later */}
              <div className="px-5 md:flex flex-row items-center">
                <div>
                  <CheckCircle2Icon className="text-lime-500  w-4 h-4" />
                </div>
                {/* <div className="text-sm  text-lime-500 font-bold">Active</div> */}
              </div>
            </div>
            <div className="flex  font-thin  flex-col">
              {/* <Calendar className="text-gray-500  w-5 h-5 mx-4" /> Joined on{" "} */}
              <div className="text-xs text-darkborder">
                Joined on {formatDate(getUserData.created_at)}
              </div>
              <div className="flex text-xs  text-darkborder flex-row font-thin ">
                {getUserData.email}
              </div>
            </div>
            {/* <div className="flex flex-row text-gray-400">
              <div>{profile.location}</div>
            </div> */}
          </div>
        </div>

        <div className="">
          {/* <div className="px-[1%] ">
            <div className="flex flex-row font-bold items-center">
              <Calendar className="text-gray-500  w-5 h-5 mx-4" /> Joined on{" "}
              {formatDate(userData.created_at)}
            </div>
          </div> */}
          {/* <div className="m-2 pl-4   pt-[1%] overflow-hidden">
            <div className="flex flex-row gap-3 flex-wrap">
              {profile.businesses.map((business, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mr-4 text-[13px] font-semibold bg-gray-200 text-gray-500 rounded-md px-3"
                >
                  {business.name}
                </div>
              ))}
            </div>
          </div> */}
          <div className="mx-2 px-4 pt-[1%] ">
            <div className="flex flex-col gap-5 md:flex-row">
              {/* <div className="flex items-center flex-row py-1 border-[1px] text-[15px] rounded-lg border-gray-400 dark:border-darkborder text-black-400 font-semibold px-10">
                <span className="px-3">
                  <MailIcon className="w-4 h-4" />
                </span>{" "}
                {userData.email}
              </div> */}
              {/* <div className="flex items-center flex-row py-1 border-[1px] text-[15px] rounded-lg border-gray-400 dark:border-darkborder text-black-400 font-semibold px-10">
                <span className="pr-3">
                  <PhoneIcon className="w-4 h-4" />
                </span>{" "}
                {profile.phoneNumber}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* border */}
      {/* <div className="border-b-[1px] border-lightborder dark:border-darkborder  w-full h-1"></div> */}

      {/* business section */}
      {/* <div className="p-[1%]">
        <h3 className="font-black text-lg px-[1%] ">Businesses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-5 px-3  m-2">
          <div className="border-[1px] border-gray-400 flex flex-col rounded-lg shadow-sm p-4 mb-1">
            <div className="flex flex-row justify-between items-center mb-2">
              <div
                className={`flex flex-row items-center gap-2 rounded-md p-1 px-4 bg-green-200 font-semibold text-green-600' : 'bg-gray-200 text-gray-600'}`}
              >
                <div className="h-[9px] w-[9px] rounded-full bg-green-600 opacity-75"></div>
                <div className=" text-[13px]">Active</div>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleMenu1()}
                  className="focus:outline-none"
                >
                  ...
                </button>
                {menuOpen1 === true && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      {" "}
                      <Link href={"/dashboard/business"}> All business</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-l-4 rounded mt-1 px-[3%]  border-green-500">
              <div className="flex flex-row">
                <div className="font-bold text-5xl">
                  {userData.business_count}
                </div>
                <div className="px-5"> Businesses</div>
              </div>
            </div>
          </div>

          <div className="border-[1px] border-gray-400 flex flex-col rounded-lg shadow-sm p-4 mb-1">
            <div className="flex flex-row justify-between items-center mb-2">
              <div
                className={`flex flex-row items-center gap-2 rounded-md p-1 px-4 bg-green-200 font-semibold text-green-600' : 'bg-gray-200 text-gray-600'}`}
              >
                <div className="h-[9px] w-[9px] rounded-full bg-green-600 opacity-75"></div>
                <div className=" text-[13px]">Active</div>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleMenu2()}
                  className="focus:outline-none"
                >
                  ...
                </button>
                {menuOpen2 === true && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2 px-3 hover:bg-gray-100 cursor-pointer">
                      Add new member
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="border-l-4 rounded mt-1 px-[3%]  border-green-500">
              <div className="flex flex-row">
                <div className="font-bold text-5xl">
                  {userData.members_count}
                </div>
                <div className="px-5"> Members</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="text-sm px-8  font-medium text-center text-gray-500 border-b border-lightborder  dark:text-gray-400 dark:border-darkborder">
        <ul className="flex flex-wrap ">
          {Object.keys(tabContent).map((tabName) => (
            <li key={tabName} className="me-2">
              <button
                onClick={() => handleTabClick(tabName)}
                className={`inline-block  p-1 border-b-4 px-2 font-bold mx-1 ${
                  activeTab === tabName
                    ? " border-palatteSecondary text-palatteSecondary"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } rounded-t-lg focus:outline-none`}
              >
                {tabName}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}

      <div className="h-[480px] mt-5 overflow-y-scroll">
        {mounted && tabContent[activeTab]}{" "}
        {/* Render tab content only when component is mounted */}
      </div>

      {/* Activity log  */}
    </section>
  );
};

export default Page;
