"use client";
import { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react"; // Make sure to import these icons
import {
  addNewCustomer,
  getAllCustomers,
  customerSelectors,
  editCustomer,
} from "@/application/reducers/customer-reducer";
import EmptyData from "./../empty-data";
import { useDispatch, useSelector } from "react-redux";
import AddCustomerPopup from "@/components/popups/AddCustomerPopup";
import Loader from "@/components/loaders/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  businessSelectors,
  getBusinesses,
} from "@/application/reducers/business-reducer";
import CommonModal from "@/components/common/dialog-box/dialog-box";
import {
  commonActions,
  commonSelectors,
} from "@/application/reducers/common-reducer";

const CustomerDetailsPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(commonSelectors.isModalOpen);
  const { updateModal } = commonActions;
  const {
    data: getCustomers,
    loading: getCustomersLoading,
    error: getCustomersError,
  } = useSelector(customerSelectors.getAllCustomers);
  const {
    data: newCustomerData,
    loading: newCustomerLoading,
    error: newCustomerError,
  } = useSelector(customerSelectors.addNewCustomer);
  const {
    data: getBusinessData,
    loading: getBusinessLoading,
    error: getBusinessError,
  } = useSelector(businessSelectors.getBusinesses);
  const {
    data: getCutomerEdit,
    loading: getCutomerEditLoading,
    error: getCutomerEditError,
  } = useSelector(customerSelectors.editCustomer);

  const [editedCustomer, setEditedCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    business_ids: null, // Specify the type explicitly as string
    created_at: new Date().toISOString(),
  });
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getBusinesses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [!newCustomerLoading, !getCutomerEditLoading]);

  useEffect(() => {
    setCustomers(getCustomers);
  }, [getCustomers, setCustomers]);

  useEffect(() => {
    if (getCustomersError) {
      toast.error("Error fetching customers");
    }
    if (newCustomerError) {
      toast.error("Error adding new customer");
    }
  }, [getCustomersError, newCustomerError, newCustomerData]);

  const handleEdit = (customerId) => {
    setEditingCustomer(customerId);
    const customer = getCustomers.find(
      (customer) => customer._id.$oid === customerId
    );
    if (customer) {
      setEditedCustomer({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });
    }
  };

  const handleSaveEdit = async () => {
    console.log(editedCustomer);
    dispatch(editCustomer(editedCustomer));
    setEditingCustomer(null);
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  const handleDelete = async (customerId) => {
    // Implement delete logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCustomerClick = () => {
    dispatch(updateModal(true));
  };

  const handleAddCustomerClose = () => {
    dispatch(updateModal(false));
    setNewCustomer({
      name: "",
      email: "",
      password: "",
      phone: "",
      business_ids: null, // Specify the type explicitly as string
      created_at: new Date().toISOString(),
    });
  };

  const handleAddCustomerSave = async () => {
    const businessIdsAsString = Array.isArray(newCustomer.business_ids)
      ? newCustomer.business_ids.join(", ")
      : newCustomer.business_ids;
    dispatch(
      addNewCustomer({ ...newCustomer, business_ids: businessIdsAsString })
    );
    handleAddCustomerClose();
    dispatch(getAllCustomers());
  };

  const handleOnchangeModal = (e, label) => {
    if (label === "business") {
      setNewCustomer({
        ...newCustomer,
        business_ids: e,
      });
    } else {
      const { name, value } = e.target;
      setNewCustomer({
        ...newCustomer,
        [name]: value,
      });
    }
  };

  return (
    <div className=" border-black p-10 rounded h-full">
      <ToastContainer position="top-right" />
      <div className="flex flex-row pb-4 mb-5 ">
        <div>
          <h1 className="text-xl font-bold">All Customers</h1>
          <h1 className="font-extralight text-sm text-gray-500">
            See all your customers here!
          </h1>
        </div>
        {getCustomers.length > 0 && (
          <div className="self-end  ml-auto ">
            <button
              className="flex items-center bg-addNewBtn text-white px-4 py-2 rounded"
              onClick={handleAddCustomerClick}
            >
              <span className="mr-2">Create New Customer</span>
            </button>
          </div>
        )}
      </div>

      {getCustomersLoading || getBusinessLoading ? (
        <div>
          {/* Display loader */}
          <Loader />
        </div>
      ) : (
        <div>
          {getCustomers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Customer Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Created Date</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(getCustomers) &&
                  getCustomers.map((customer) => (
                    <tr key={customer._id.$oid} className="border-b">
                      <td className="text-left py-2">
                        {editingCustomer === customer._id.$oid ? (
                          <input
                            type="text"
                            name="name"
                            value={editedCustomer.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          customer.name
                        )}
                      </td>
                      <td className="text-left py-2">{customer.email}</td>
                      <td className="text-left py-2">
                        {new Date(
                          customer.created_at.$date
                        ).toLocaleDateString()}
                      </td>
                      <td className="text-left py-2">
                        {editingCustomer === customer._id.$oid ? (
                          <input
                            type="text"
                            name="phone"
                            value={editedCustomer.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          customer.phone
                        )}
                      </td>
                      <td className="text-left py-2">
                        {editingCustomer === customer._id.$oid ? (
                          <div>
                            <button
                              className="text-green-500 mr-2"
                              onClick={handleSaveEdit}
                            >
                              Save
                            </button>
                            <button
                              className="text-gray-500"
                              onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              // className="text-blue-500 mr-2"
                              onClick={() => handleEdit(customer._id.$oid)}
                            >
                              <Edit size={14} />
                            </button>
                            {/* <button
                              className="text-red-500"
                              onClick={() => handleDelete(customer._id.$oid)}
                            >
                              <Trash size={20} />
                            </button> */}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <EmptyData
              title="Customer"
              onClick={handleAddCustomerClick}
              disable={!getBusinessData.length}
            />

            // <div
            //   style={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     height: "55vh",
            //   }}
            // >
            //   No data available
            // </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        {Array.from(
          { length: Math.ceil(customers.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-2 mx-1 bg-palatteTeritary text-white rounded ${
                index + 1 === currentPage ? "bg-opacity-80" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <CommonModal
        title="Create New Customer"
        component="customer"
        isOpen={isModalOpen}
        value={newCustomer}
        onClose={handleAddCustomerClose}
        onSubmit={handleAddCustomerSave}
        onChange={handleOnchangeModal}
      />

      {/* <AddCustomerPopup
        isOpen={isAddCustomerPopupOpen}
        onClose={handleAddCustomerClose}
        onSave={handleAddCustomerSave}
        businesses={getBusinessData} // Pass businesses data
      /> */}
    </div>
  );
};

export default CustomerDetailsPage;
