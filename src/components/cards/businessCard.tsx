import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { PencilIcon, Eye } from "lucide-react";

interface BusinessCardProps {
  id: string;
  name: string;
  description: string;
  domain_url: string;
  link: string;
  status: boolean;
  address: string;
  onStatusToggle: () => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  id,
  name,
  description,
  domain_url,
  link,
  status,
  address,
  onStatusToggle,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleStatusToggle = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  const setIdInLocalStorage = (id: any) => {
    typeof window !== "undefined"
      ? window.localStorage.setItem("businessID", id)
      : null;
    // localStorage.setItem('businessID', id);
  };

  const handleChangeStatus = (newStatus: boolean) => {
    const newData = {
      name: name,
      updated_by: "user_id", // Replace "user_id" with the actual user ID
      status: newStatus, // Set the new status
    };

    setMenuOpen(false); // Close the menu after changing status
    onStatusToggle(); // Trigger the onStatusToggle function
  };

  return (
    // <a
    //   href={`/${name.replace(/\s/g, "")}`}
    //   onClick={() => setIdInLocalStorage(id)}
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className="group mr-5 transform transition-transform duration-300 ease-in-out hover:scale-105"
    // >
    <div className="relative transform transition-transform duration-300 ease-in-out   text-[12px]">
      <div className="py-3 px-2 h-24 bg-palatteFour dark:bg-darkbg dark:border dark:border-darkborder rounded-xl flex flex-col shadow-[rgba(0,_0,_0,_0.03)_0px_0px_16px]">
        <div className="flex p-4 flex-col items-center justify-center pb-[18px] relative select-none">
          <h2 className="font-bold mt-4">{name.toUpperCase()}</h2>
          <div>
            <div className="absolute top-0 right-1 px-[1px]">
              <div className="flex flex-row items-center justify-center gap-3">
                <button
                  onClick={handleStatusToggle}
                  className={`${
                    status
                      ? "bg-lime-100 text-lime-500"
                      : "bg-orange-100 text-orange-500"
                  } text-[12px] px-3 rounded-full cursor-pointer`}
                  ref={menuRef}
                >
                  {status ? "Active" : "Inactive"}
                </button>
                {/* {menuOpen && (
                    <div className="absolute select-none right-0 mt-1 bg-white border rounded-md shadow-md">
                      <button onClick={() => handleChangeStatus(!status)} className=" text-[12px] inline-block  text-center">
                        {status ? 'Set Inactive' : 'Set Active'}
                      </button>
                    </div>
                  )} */}
                <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 rounded-full bg-gray-200 p-[3px]">
                  <Link href={link}>
                    <PencilIcon className=" w-3 h-3" />
                  </Link>
                </div>
                <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 rounded-full bg-gray-200 p-[3px]">
                  <Link
                    href={`/${name.replace(/\s/g, "")}`}
                    onClick={() => setIdInLocalStorage(id)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className=" w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </a>
  );
};

export default BusinessCard;
