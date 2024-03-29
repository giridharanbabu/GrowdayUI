"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash, Search } from "lucide-react";
import {
  fetchMember,
  registerMember,
  editMember,
  memberSelectors,
} from "@/application/reducers/member-reducer";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AllBusinessLoader from "@/components/loaders/Loader";

// interface Member {
//   id: any;
//   name: string;
//   business: string | string[];
//   email: string;
//   role: string;
// }

const MembersPage = ({ params }) => {
  const dispatch = useDispatch();
  //const memberState = useSelector((state) => state.member);
  const {
    loading: getMemberLoading,
    error: getMemberError,
    data: getMemberData,
  } = useSelector(memberSelectors.fetchMember);
  const {
    loading: registerMemberLoading,
    error: registerMemberError,
    data: registerMemberData,
  } = useSelector(memberSelectors.registerMember);
  const {
    loading: editMemberLoading,
    data: editMemberData,
    error: editMemberError,
  } = useSelector(memberSelectors.editMember);
  const [users, setUsers] = useState([]);
  const [deletions, setDeletions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddMemberPopupOpen, setAddMemberPopupOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    business: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editedValues, setEditedValues] = useState({
    id: 0,
    name: "",
    business_ids: "",
    email: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");

  useEffect(() => {
    if (!initialFetchDone) {
      dispatch(fetchMember());
      setInitialFetchDone(true);
    }
  }, [dispatch, initialFetchDone]);

  useEffect(() => {
    if ((!registerMemberLoading || !editMemberLoading) && initialFetchDone) {
      dispatch(fetchMember());
    }
  }, [dispatch, registerMemberLoading, editMemberLoading]);

  useEffect(() => {
    if (getMemberData) {
      setUsers(Object.values(getMemberData));
    }
  }, [getMemberData]);

  const handleEdit = (userId) => {
    setEditingUser(userId);
    const userToEdit = users.find((user) => user._id.$oid === userId);
    console.log(userToEdit, userId);
    setEditedValues(userToEdit);
  };

  const handleSaveEdit = async () => {
    // const editedValuesWithArrayBusiness = {
    //   ...editedValues,
    //   business: Array.isArray(editedValues?.business)
    //     ? editedValues?.business
    //     : editedValues?.business
    //         ?.split(",")
    //         .map((business) => business?.trim()),
    // };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const payload = {
      ...editedValues,
      business_ids: editedValues.business_ids,
      created_time: formattedDate,
    };
    console.log(editedValues);
    dispatch(editMember(payload));
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    // Reset editingUser and editedValues state
    setEditingUser(null);
    setEditedValues({ id: 0, name: "", business: "", email: "", role: "" });

    setSelectedUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      // Perform a DELETE request to delete the user
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully.`);

        // Get the deleted user
        const deletedUser = users.find((user) => user.id === userId);

        // Update the users state by removing the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        // Update the deletions state by adding the deleted user
        setDeletions((prevDeletions) => {
          if (deletedUser) {
            const updatedDeletions = [...prevDeletions, deletedUser];
            console.log("Updated Deletions:", updatedDeletions);
            return updatedDeletions;
          }
          return prevDeletions;
        });
      } else {
        console.error(`Error deleting user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddMemberClick = () => {
    setAddMemberPopupOpen(true);
  };

  const handleAddMemberClose = () => {
    setAddMemberPopupOpen(false);
    setNewMember({ name: "", email: "", role: "", business: "" });
  };

  const handleAddMemberSave = async () => {
    const businessArray = newMember.business
      .split(",")
      .map((business) => business.trim());
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const payload = {
      business_ids: businessArray,
      created_time: formattedDate,
      role: selectedRole,
      ...newMember,
    };
    console.log(selectedRole);
    dispatch(registerMember(payload));
    // Reset the newMember state
    setNewMember({ name: "", email: "", role: "", business: "" });
    // Close the "Add Member" popup
    handleAddMemberClose();
  };

  const handleShowPopup = (userId) => {
    setSelectedUser(userId);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };
  const handleSelectChange = (event) => {
    setSelectedRole(event.target.value);
    setNewMember({ ...newMember, role: selectedRole });
  };
  return (
    <div className="ml-16 mt-6 border-black p-4 rounded">
      <>
        {(getMemberLoading || registerMemberLoading || editMemberLoading) && (
          <AllBusinessLoader />
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="font-bold text-2xl mb-1">Members Details</h1>
          </div>
          <div>
            <button
              className="flex items-center bg-addNewBtn text-white px-4 py-2 rounded"
              onClick={handleAddMemberClick}
            >
              <span className="mr-2">Create New Member</span>
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded mr-2"
          />
          <Search size={20} className="ml-2" />
        </div>

        {/* Add Member Popup */}
        {isAddMemberPopupOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-darkbg p-20 rounded-md">
              <h2 className="text-lg font-bold mb-4">Create New Member</h2>
              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="text"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </label>
              <label className="block mb-4">
                Business:
                <input
                  type="text"
                  value={newMember.business}
                  onChange={(e) =>
                    setNewMember({ ...newMember, business: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </label>
              {/* <label className="block mb-4">
                Role:
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </label> */}

              <label htmlFor="selectedRole" className="block mb-4">
                Role:
                <select
                  id="selectedRole"
                  value={newMember.role}
                  onChange={(e) =>
                    setNewMember({ ...newMember, role: e.target.value })
                  }
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleAddMemberSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={handleAddMemberClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {getMemberData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Username</th>
                <th className="text-left py-2">User Email</th>
                <th className="text-left py-2">Business</th>
                <th className="text-left py-2">Role</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user) =>
                    user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">
                      {editingUser === user._id.$oid ? (
                        <input
                          type="text"
                          value={editedValues.name}
                          onChange={(e) =>
                            setEditedValues({
                              ...editedValues,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="py-2">
                      {/* {editingUser === user._id.$oid ? (
            <input
              type="text"
              value={editedValues.email}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                  email: e.target.value,
                })
              }
            />
          ) : ( */}
                      {user.email}
                      {/* )} */}
                    </td>
                    <td className="py-2">
                      {editingUser === user._id.$oid ? (
                        <input
                          type="text"
                          value={editedValues.business_ids}
                          onChange={(e) =>
                            setEditedValues({
                              ...editedValues,
                              business_ids: e.target.value,
                            })
                          }
                        />
                      ) : Array.isArray(user.business_ids) ? (
                        <div>
                          {user.business_ids.length === 1 ? (
                            <div>{user.business_ids[0]}</div>
                          ) : (
                            <div>
                              {user.business_ids[0]}
                              <span
                                className="text-blue-500 cursor-pointer ml-1"
                                onClick={() => handleShowPopup(user.id)}
                              >
                                +{user.business_ids.length - 1}
                              </span>
                            </div>
                          )}

                          {selectedUser === user._id.$oid && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="bg-white p-4 rounded-md">
                                <h2 className="text-lg font-bold mb-4">
                                  {user.name}&apos;s Businesses
                                </h2>
                                {Array.isArray(user.business) &&
                                  user.business
                                    .slice(1)
                                    .map((business, index) => (
                                      <div key={index}>{business}</div>
                                    ))}
                                <button
                                  className="bg-gray-300 text-black px-4 py-2 rounded"
                                  onClick={handleClosePopup}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>{user.business}</div>
                      )}
                    </td>
                    <td className="py-2">
                      {/* {editingUser === user._id.$oid ? (
            <input
              type="text"
              value={editedValues.role}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                  role: e.target.value,
                })
              }
            />
          ) : ( */}
                      {editingUser === user._id.$oid ? (
                        <select
                          id="selectedRole"
                          value={editedValues.role}
                          onChange={(e) =>
                            setEditedValues({
                              ...editedValues,
                              role: e.target.value,
                            })
                          }
                          // style={{
                          //   padding: "5px",
                          //   borderRadius: "5px",
                          //   border: "1px solid #ccc",
                          // }}
                          className="border p-2 rounded w-full"
                        >
                          {/* <option value="">Select a role</option> */}
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                      {/* )} */}
                    </td>
                    <td className="py-2 space-x-2">
                      {editingUser === user._id.$oid ? (
                        <>
                          <button className="text-sm" onClick={handleSaveEdit}>
                            Save
                          </button>
                          <button
                            className="text-sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="text-sm"
                          onClick={() => handleEdit(user._id.$oid)}
                        >
                          <Edit size={14} />
                        </button>
                      )}
                      <button
                        className="text-sm"
                        onClick={() => handleDelete(user._id.$oid)}
                      >
                        {/* {editingUser !== user._id.$oid && <Trash size={14} />} */}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "55vh",
            }}
          >
            No data available
          </div>
        )}

        {/* User table */}
      </>
      {/* )} */}
    </div>
  );
};

export default MembersPage;
