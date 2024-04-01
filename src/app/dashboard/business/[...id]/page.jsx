"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  editBusiness,
  businessSelectors,
  fetchBusinessById,
} from "@/application/reducers/business-reducer";
import Loader from "@/components/loaders/Loader";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Card, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    data: getBusiness,
    loading: getLoading,
    error: getError,
  } = useSelector(businessSelectors.fetchBusinessById);
  const {
    data: editedBusinessData,
    loading: editBusinessLoading,
    error: editBusinessError,
  } = useSelector(businessSelectors.editBusiness);
  const [formData, setFormData] = useState({
    name: "",
    business_type: "",
    description: "",
    created_date: "",
    address: "",
    domain_url: "",
    business_url: "",
    created_by: "",
  });

  const params = useParams();
  const id = params.id.toString();
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(fetchBusinessById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (getBusiness) {
      const { created_date, ...businessData } = getBusiness;
      setFormData((prevState) => ({
        ...prevState,
        ...businessData,
        created_date:
          created_date && created_date.$date
            ? new Date(created_date.$date).toISOString()
            : "",
      }));
    }
  }, [getBusiness]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(
      "form submit-------------------------------------------------------------"
    );
    dispatch(editBusiness(formData))
      .then(() => {
        toast.success("Updated"); // Redirect to home page after successful edit
      })
      .catch((error) => {
        toast.error("Error adding new customer");
      });
  };

  console.log(formData, "form data-0---");

  useEffect(() => {
    if (editBusinessError) {
      toast.error("Error adding new customer");
    }
  }, [editedBusinessData, editBusinessError]);

  return (
    <section>
      <ToastContainer position="top-right" />

      <Link href={"/dashboard/business"}>
        <div className="px-10  mt-5  flex flex-row">
          <ArrowLeftIcon /> Back
        </div>
      </Link>

      <div className="p-10">
        <Card title="Edit Your Business" bordered={false}>
          {/* <h1 className="text-2xl font-bold mb-4">Edit Your Business</h1> */}

          {getLoading || editBusinessLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div>
              {/* <Card title="Card title" bordered={false}>
              Card content  </Card> */}

              <div className="grid gap-5 grid-cols-12">
                {/* Name */}
                <div className="col-span-4">
                  {/* <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 bg-lightbg dark:bg-darkbg w-full"
                      required
                    />
                  </div> */}
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <Input
                    name="name"
                    id="name"
                    size="large"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="business_type"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Business Type
                  </label>
                  <Input
                    name="business_type"
                    id="business_type"
                    size="large"
                    value={formData.business_type}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                </div>
                <div className="col-span-4">
                  <label
                    htmlFor="business_url"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Business URL
                  </label>
                  <Input
                    name="business_url"
                    id="business_url"
                    size="large"
                    value={formData.domain_url}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                </div>
                {/* Created By */}
                {/* <div className='col-span-4'>
                <div className="mb-4">
                  <label htmlFor="created_by" className="block text-sm font-medium text-gray-600">
                    Created by
                  </label>
                  <input
                    id="created_by"
                    name="created_by"
                    value={formData.created_by}
                    onChange={handleChange}
                    className="mt-1 p-2 bg-lightbg dark:bg-darkbg w-full"
                    required
                  />
                </div>
              </div> */}
                {/* Created On */}
                {/* <div className='col-span-4'>
                <div className="mb-4">
                  <label htmlFor="created_date" className="block text-sm font-medium text-gray-600">
                    Created on
                  </label>
                  <input
                    id="created_date"
                    name="created_date"
                    value={formData.created_date}
                    onChange={handleChange}
                    className="mt-1 p-2 bg-lightbg dark:bg-darkbg w-full"
                    required
                  />
                </div>
              </div> */}
                {/* Business Description */}
                <div className="col-span-12">
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Address
                    </label>
                    {/* <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    /> */}
                    <TextArea
                      id="address"
                      name="address"
                      rows={4}
                      placeholder="Enter address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Business Description
                    </label>
                    <TextArea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                    />

                    {/* <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 p-2 border rounded-md w-full"
                    /> */}
                  </div>
                </div>
                {/* Address */}

                {/* Business Type */}
                {/* <div className="col-span-4">
                  <div className="mb-4">
                    <label
                      htmlFor="business_type"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Business Type
                    </label>
                    <input
                      type="text"
                      id="business_type"
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                      className="mt-1 p-2  border rounded-md  w-full"
                      required
                    />
                  </div>
                </div> */}
                {/* Domain URL */}
                {/* <div className="col-span-4">
                  <div className="mb-4">
                    <label
                      htmlFor="domain_url"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Domain URL
                    </label>
                    <input
                      type="text"
                      id="domain_url"
                      name="domain_url"
                      value={formData.domain_url}
                      onChange={handleChange}
                      className="mt-1 p-2  border rounded-md  w-full"
                      required
                    />
                  </div>
                </div> */}
                {/* Business URL */}
                {/* <div className="col-span-4">
                  <div className="mb-4">
                    <label
                      htmlFor="business_url"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Business URL
                    </label>
                    <input
                      type="text"
                      id="business_url"
                      name="business_url"
                      value={formData.business_url}
                      onChange={handleChange}
                      className="mt-1 p-2  border rounded-md  w-full"
                      required
                    />
                  </div>
                </div> */}
              </div>
              {/* Submit Button */}
              <div className="mb-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  type="button" // Ensure button doesn't trigger form submission
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default EditPage;
