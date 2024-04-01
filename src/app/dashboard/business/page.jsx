"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import BusinessCard from "@/components/cards/businessCard";
import EmptyData from "./../empty-data";
import Loader from "@/components/loaders/Loader";
import AddBusinessPopup from "@/components/popups/AddBusinessPopup";
import { ChevronDown, Filter, Search } from "lucide-react";
import {
  businessSelectors,
  getBusinesses,
  saveBusiness,
} from "@/application/reducers/business-reducer";
import CommonModal from "@/components/common/dialog-box/dialog-box";
import {
  commonActions,
  commonSelectors,
} from "@/application/reducers/common-reducer";

const BusinessPage = ({}) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(commonSelectors.isModalOpen);
  const { updateModal } = commonActions;
  const {
    data: getBusinessData,
    loading: getBusinessLoading,
    error: getBusinessError,
  } = useSelector(businessSelectors.getBusinesses);
  const { loading: saveBusinessLoading } = useSelector(
    businessSelectors.saveBusiness
  );
  const [loadedBusinesses, setLoadedBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(null);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

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

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch, saveBusinessLoading]);

  useEffect(() => {
    if (getBusinessData) {
      setLoadedBusinesses(Object.values(getBusinessData));
    }
  }, [getBusinessData]);

  const handleAddBusinessClick = () => {
    dispatch(updateModal(true));
  };

  const handleAddBusinessClose = () => {
    dispatch(updateModal(false));
  };

  const handleAddBusinessSave = () => {
    dispatch(saveBusiness(newBusiness));
    dispatch(getBusinesses());
    setLoadedBusinesses(Object.values(getBusinessData));
    handleAddBusinessClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (isActive) => {
    setFilterActive(isActive);
    setFilterDropdownOpen(false);
  };

  const handleActivateDeactivate = () => {
    dispatch(getBusinesses());
  };

  const handleOnchangeModal = (e) => {
    const { name, value } = e.target;
    setNewBusiness({
      ...newBusiness,
      [name]: value,
    });
  };

  const filteredBusinesses = loadedBusinesses.filter((business) => {
    const name = business.name || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterActive === null || business.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full">
    {/* the search bar here */}

      <div className="flex flex-col md:flex-row pb-[1%] p-5 mx-5">
        <div className="self-center">
          <h1 className="font-black text-xl">All Businesses</h1>
          <h1 className="font-extralight text-sm text-gray-500">
            See all your businesses here!
          </h1>
        </div>
        <div className="self-center md:self-end my-5 ml-auto">
          {getBusinessLoading || saveBusinessLoading ? (
            <div>
              {/* Display loader */}
              {/* <AllBusinessLoader /> */}
            </div>
          ) : loadedBusinesses.length > 0 ? (
            <button
              onClick={handleAddBusinessClick}
              className="bg-addNewBtn text-white px-4 py-2 rounded"
            >
              Create New Business
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {getBusinessLoading || saveBusinessLoading ? (
        <div>
          {/* Display loader */}
          <Loader />
        </div>
      ) : (
        <div>
          {!getBusinessLoading && filteredBusinesses.length > 0 ? (
            <div className="grid gap-7 grid-cols-1 md:grid-cols-4 px-5 pb-10 ml-5">
              {filteredBusinesses.map((business, index) => (
                <div key={index}>
                  <BusinessCard
                    id={business._id.$oid}
                    name={business.name}
                    description={business.description}
                    domain_url={business.business_url}
                    link={`/dashboard/business/${business._id.$oid}`}
                    status={business.status}
                    address={business.address}
                    onStatusToggle={handleActivateDeactivate}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyData title="Business" onClick={handleAddBusinessClick} />
          )}
        </div>
      )}

      <CommonModal
        title="Create New Business"
        component="business"
        isOpen={isModalOpen}
        value={newBusiness}
        onClose={handleAddBusinessClose}
        onSubmit={handleAddBusinessSave}
        onChange={handleOnchangeModal}
      />

      {/* <AddBusinessPopup
        isOpen={isAddBusinessPopupOpen}
        onClose={handleAddBusinessClose}
        onSave={handleAddBusinessSave}
      /> */}
    </div>
  );
};

export default BusinessPage;
