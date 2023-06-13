import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { userPages } from "../../constants/breadcrumb";
import {
  deleteUser,
  getUsers,
  verifyUser,
  unverifyUser,
  setUser,
  setUserBranch,
  setUserDivision,
  setUserType,
  setFilterUsers,
} from "../../features/user/userSlice";
import { Loader } from "../../core/spinner";
import { Breadcrumbs, Empty } from "../../core/components";
import {
  DeleteButton,
  EditButton,
  NewButton,
  ResetPasswordButton,
} from "../../core/buttons";
import ConfirmModal from "../../core/dialog/ConfirmModal";
import BranchDropdown from "../../core/dropdowns/BranchDropdown";
import DivisionDropdown from "../../core/dropdowns/DivisionDropdown";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
 import ResetPassword from "./ResetPassword";
import { getDivisionsByBranch } from "../../features/division/divisionSlice";
import { ROLE_USER } from "../../constants/config";
import UserTypeDropdown from "../../Components/user/UserTypeDropdown";
import classNames from "../../utils/classname";
import { getBranches } from "../../features/branch/branchSlice";
import LockButton from "../../Components/user/LockButton";

const User = () => {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [openDelete, setDelete] = useState(false);

  const {
    branches,
    branch,
    users,
    filterUsers,
    divisions,
    loading,
    userType,
    selectedDivision,
    user,
    // verifyUser,
  } = useSelector((state) => ({
    branches: state.branch.branches,
    branch: state.user.branch,
    users: state.user.users,
    filterUsers: state.user.filterUsers,
    divisions: state.division.divisions,
    loading: state.user.loading,
    userType: state.user.userType,
    selectedDivision: state.user.selectedDivision,
    user: state.user.user,
    // verifyUser: state.user.user.verified,
  }));

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getBranches());
  }, [dispatch]);

  const handleUserType = (type) => {
    dispatch(setUserType(type));
    if (type?.value === "user") {
      const data = users?.filter((item) => item.role === ROLE_USER);
      dispatch(setFilterUsers(data));
    } else {
      const data = selectedDivision
        ? users.filter((item) => item?.division?._id === selectedDivision._id)
        : [];
      dispatch(setFilterUsers(data));
    }
  };

  const handleBranch = (val) => {
    if (val) {
      dispatch(setUserBranch(val));
      dispatch(getDivisionsByBranch(val._id));
      dispatch(setUserDivision(""));
      dispatch(setFilterUsers(""));
    }
  };

  const handleDivision = (val) => {
    dispatch(setUserDivision(val));
    const data = users?.filter((item) => item?.division?._id == val._id);
    dispatch(setFilterUsers(data));
  };

  const onDelete = async () => {
    // console.log("hello");
    // console.log(openDelete); // Check the value of openDelete before calling setDelete
    if (user) {
      await dispatch(deleteUser(user._id));
      setDelete(false);
    }
  };

  // const onDelete = async () => {
  //   console.log("hello");
  // };

  const userTypes = [
    { value: "user", name: "ຂະແໜງຄວາມສ່ຽງ" },
    { value: "division", name: "ພະແນກ" },
  ];

  return (
    <>
      <>
        <section className="section-md">
          <Breadcrumbs pages={userPages} />
          <div className="border-b border-gray-200 shadow sm:mx-2 sm:rounded-lg">
            <div className="flex justify-between border-b px-5 py-2">
              <div className="flex items-center gap-x-2">
                <h2 className="font-semibold">Filter:</h2>

                <UserTypeDropdown
                  setUserType={handleUserType}
                  // setUserType={(type) => dispatch(setUserType(type))}
                  userType={userType}
                  userTypes={userTypes}
                  onClick={handleUserType}
                />

                {/* {/ Branch Dropdown /} */}
                <BranchDropdown
                  branches={branches}
                  selectedBranch={branch}
                  onChange={handleBranch}
                  disabled={!userType || userType?.value === "user"}
                />
                {/* {/ Division Dropdown /} */}

                <DivisionDropdown
                  divisions={divisions}
                  selectedDivision={selectedDivision}
                  onChange={handleDivision}
                  disabled={!userType || userType?.value === "user"}
                  custumClass="w-72"
                />

                {/* <DivisionDropdown
                divisions={divisions}
                selectedDivision = {selectedDivision}
                onChange={handleDivision}
                disabled={!userType || userType?.value === "user"}
                custumClass="w-72"
              /> */}
              </div>
              <NewButton onClick={() => setOpenNew(true)} />
            </div>
            {/* {/ Loading /} */}
            {loading && (
              <div className="mb-5">
                <Loader />
              </div>
            )}
            {/* {/ No Data /} */}
            {!loading && (!filterUsers || filterUsers.length === 0) && (
              <div className="mb-5">
                {/* empty */}
                <Empty text="ຍັງບໍ່ມີມີຂໍ້ມູນຜູ້ໃຊ້, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່" />
              </div>
            )}
            {/* {/ Table /} */}
            {!loading && filterUsers.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ລ/ດ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ຊື່ ແລະ ນາມສະກຸນ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ເບີໂທ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ລະດັບຜູ້ໃຊ້
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ສະຖານະ
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ແກ້ໄຂ
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ປ່ຽນລະຫັດຜ່ານ
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ລ໋ອກ | ປົກລ໋ອກ
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left font-lao text-sm font-medium text-gray-500"
                    >
                      ລຶບ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white font-lao">
                  {filterUsers?.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 text-sm font-normal text-gray-500">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-500">
                        {item.fullName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-500">
                        {item.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-500">
                        {item.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-500">
                        {item.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-500">
                        <span
                          className={classNames(
                            item.verified ? "text-indigo-600" : "text-red-600",
                            "font-semibold uppercase"
                          )}
                        >
                          {item.verified ? "Active" : "Locked"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-1 text-sm text-gray-500">
                        <EditButton
                          onClick={() => {
                            dispatch(setUser(item));
                            setOpenEdit(true);
                          }}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-1 text-sm text-gray-500">
                        <ResetPasswordButton
                        onClick={() => {
                          dispatch(setUser(item));
                          setOpenResetPassword(true);
                        }}
                      />
                      </td>
                      <td className="whitespace-nowrap px-6 py-1 text-sm text-gray-500">
                        <LockButton
                        id={item._id}
                        verified={item.verified}
                        onVerify={() => dispatch(verifyUser(item._id))}
                        onUnverify={() => dispatch(unverifyUser(item._id))}
                      />
                      </td>
                      <td className="whitespace-nowrap px-6 py-1 text-sm text-gray-500">
                        <DeleteButton
                          onClick={() => {
                            dispatch(setUser(item));
                            setDelete(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
        {/* {/ Add Branch /} */}
        <AddUser open={openNew} setOpen={setOpenNew} />
        {/* {/ Edit Branch /} */}
      </>

      <EditUser open={openEdit} setOpen={setOpenEdit} />
      {/* {/ Reset Password /} */}
      <ResetPassword open={openResetPassword} setOpen={setOpenResetPassword} />


      <ConfirmModal
      open={openDelete}
      setOpen={setDelete}
      text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນສາຂາຫຼືບໍ່"
      confirmed={onDelete}  
    />

    </>
  );
};

export default User;
