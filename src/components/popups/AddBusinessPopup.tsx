import React, { useState } from "react";

interface AddBusinessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newBusiness: any) => void;
}

const AddBusinessPopup: React.FC<AddBusinessPopupProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    business_type: "",
    description: "",
    created_date: new Date().toISOString(),
    address: "",
    domain_url: "",
    business_url: "",
    created_by: "user",
    status: true,
  });

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const formattedName = newName.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove non-alphanumeric characters
    const formattedDomain = formattedName.replace(/\s+/g, "").toLowerCase();
    setNewBusiness({
      ...newBusiness,
      name: formattedName,
      domain_url: formattedDomain,
    });
  };

  const handleSave = () => {
    const fullDomain = `growday.com/${newBusiness.domain_url}`;
    const businessWithFullDomain = {
      ...newBusiness,
      business_url: fullDomain,
    };
    onSave(businessWithFullDomain);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-palatteTeritary  bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-darkbg p-10 rounded-md">
        <h2 className="text-lg font-bold mb-4">Add Business</h2>
        <label className="block mb-2">
          Business Name:
          <input
            type="text"
            value={newBusiness.name}
            onChange={handleBusinessNameChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Business Type:
          <input
            type="text"
            value={newBusiness.business_type}
            onChange={(e) =>
              setNewBusiness({ ...newBusiness, business_type: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </label>

        <label className="block mb-2">
          Business URL:
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              growday.com/
            </span>
            <input
              type="text"
              value={newBusiness.domain_url}
              onChange={(e) => {
                const newDomain = e.target.value;
                setNewBusiness({ ...newBusiness, domain_url: newDomain });
              }}
              className="rounded-none rounded-r-md bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="domain"
            />
          </div>
        </label>

        <div className="flex justify-center pt-3">
          <button
            className="bg-palatteSecondary text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBusinessPopup;
