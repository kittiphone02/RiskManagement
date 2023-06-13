import React, { useState } from "react"
import PropTypes from "prop-types"
import { Formik, Form } from "formik"
import DialogProvider from "../../common/DialogProvider"
import classNames from "../../utils/classname"
import { userValidate } from "../../services/validatator"
import { addUser,setUserBranch } from "../../features/user/userSlice"
import { useSelector, useDispatch } from "react-redux";
import { getDivisionsByBranch } from "../../features/division/divisionSlice";
import RolesDropdown from "../../Components/user/RolesDropdown";
import BranchDropdown from "../../core/dropdowns/BranchDropdown";
import DivisionDropdown from "../../core/dropdowns/DivisionDropdown";
// import { ROLE_USER } from "../../constants/config"

function AddUser({ open, setOpen }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false)
  const { user, branches, branch, divisions, selectedDivision } = useSelector(
    (state) => ({
      user: state.user.user,
      branches: state.branch.branches,
      branch: state.user.branch,
      divisions: state.division.divisions,
      selectedDivision: state.user.selectedDivision,
    })
  );
  

  
  const onSubmit = async values => {
    setSubmitted(false)
    const { fullName, phoneNumber, role, selectedDivision, username, password } = values
    if (role === "ROLE_USER") {
      const body = { fullName, phoneNumber, role, username, password }
      const res = await dispatch(addUser({ body: body }));
      if (res.payload.success) {
        setOpen(false)
      }
      setSubmitted(false)
    } else {
      const body = { ...values, division: selectedDivision._id }
       const res = await dispatch(addUser({ body: body }));
      if (res.payload.success) {
        setOpen(false)
      }
      setSubmitted(false)
     }

    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-xl">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            ເພີ່ມຜູ້ໃຊ້ງານ
          </h3>
          <Formik
            initialValues={{
              fullName: "",
              phoneNumber: "",
              role: "",
              branch: "",
              selectedDivision: selectedDivision || "",
              username: "",
              password: "",
            }}
            // validationSchema={userValidate}
            onSubmit={values => onSubmit(values)}
          >
            {({ touched, errors, values, handleChange, setFieldValue }) => (
              <Form className="mt-5 grid grid-cols-6 gap-x-2.5">
                {/* FullName */}
                <div className="col-span-6">
                  <label htmlFor="fullName" className="form-label">
                    ຊື່ ແລະ ນາມສະກຸນ
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    autoComplete="fullName"
                    className={classNames(
                      touched.fullName && errors.fullName
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.fullName}
                    onChange={handleChange}
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone number */}
                <div className="col-span-6 mt-3 md:col-span-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    ເບີໂທລະສັບ
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    className={classNames(
                      touched.phoneNumber && errors.phoneNumber
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="col-span-6 mt-3 md:col-span-3">
                  <label className="form-label">ລະດັບຜູ້ໃຊ້</label>

                    <RolesDropdown
                    value={values.role}
                    setValue={(val) => setFieldValue("role", val)}
                  />
                  {touched.role && errors.role && (
                    <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                  )}
                </div>

                {/* Branch */}
                <div className="col-span-6 mt-3 md:col-span-2">
                  <label className="form-label mb-1">ສາຂາ</label>
                  <BranchDropdown
                    branches={branches}
                    selectedBranch={values.branch}
                    onChange={(val) => {
                        setFieldValue("branch", val);
                        setFieldValue("selectedDivision", "");
                        dispatch(setUserBranch(val)); 
                        dispatch(getDivisionsByBranch(val._id));
                      }}
                      
                    disabled={!values.role || values.role === "ROLE_USER"}
                  />
                  {touched.branch && errors.branch && (
                    <p className="mt-2 text-sm text-red-600">{errors.branch}</p>
                  )}
                </div>

                {/* Division */}
                <div className="col-span-6 mt-3 md:col-span-4">
                  <label className="form-label mb-1">ພະແນກ</label>
                  <DivisionDropdown
                    divisions={divisions}
                    selectedDivision={values.selectedDivision}
                    onChange={(val) => {
                      setFieldValue("selectedDivision", val);
                    }}
                    disabled={!values.role || values.role === "ROLE_USER"}
                    custumClass="w-full"
                  />
                  {touched.division && errors.division && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.division}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div className="col-span-6 mt-3 md:col-span-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className={classNames(
                      touched.username && errors.username
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.username}
                    onChange={handleChange}
                  />
                  {touched.username && errors.username && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="col-span-6 mt-3 md:col-span-3">
                  <label htmlFor="password" className="form-label">
                    ລະຫັດຜ່ານ
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className={classNames(
                      touched.password && errors.password
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Button */}
                <div className="col-span-6 mt-8 flex justify-end gap-x-2">
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setOpen(false)}
                  >
                    ຍົກເລີກ
                  </button>
                  <button
                    type="submit"
                    className={submitted ? "btn-disabled" : "btn-primary"}
                    onClick={() => setOpen(true)}
                    disabled={submitted}
                  >
                    ບັນທຶກ
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </DialogProvider>
  )
}

// AddUser.propTypes = {
//   addUser: PropTypes.func.isRequired,
// }

export default (AddUser)
