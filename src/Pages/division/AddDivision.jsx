import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import DialogProvider from "../../common/DialogProvider";
import classNames from "../../utils/classname";
// import { divisionValidate } from "../../services/validatator";
import { addDivision } from "../../features/division/divisionSlice"; // Import the Redux Toolkit slice
import Dropdown from "../../core/dropdowns/Dropdown";
import * as yup from "yup";


function AddDivision({ open, setOpen }) {
  const dispatch = useDispatch();
  const { branches, selectedBranch } = useSelector((state) => ({
    branches: state.branch.branches,
    selectedBranch: state.division.selectedBranch,
  }));
  const divisionValidate = yup.object({
    branch: yup.object().required("ກະລຸນາເລືອກສາຂາ"),
    name: yup.string().trim().required("ກະລຸນາປ້ອນຊື່ພະແນກ"),
    abbreviations: yup.string().trim().required("ກະລຸນາປ້ອນຕົວຫຍໍ້"),
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (values) => {
    const body = { ...values, branch: values.branch._id };
    setSubmitted(true);
    const res = await dispatch(addDivision(body)); // Dispatch the addDivision action
    if (res.success) {
      setOpen(false);
    }
    setSubmitted(false);
  };

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-md">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            ເພີ່ມພະແນກ
          </h3>
          <Formik
            initialValues={{
              branch: selectedBranch || "",
              name: "",
              abbreviations: "",
            }}
             validationSchema={divisionValidate}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ touched, errors, values, handleChange, setFieldValue }) => (
              <Form className="mt-5 grid grid-cols-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="form-label">
                    ສາຂາ (Branch)
                  </label>
                  <Dropdown
                    list={branches}
                    value={values.branch}
                    setValue={(val) => {
                      setFieldValue("branch", val);
                    }}
                    customClass="mt-2"
                  />
                  {touched.branch && errors.branch && (
                    <p className="mt-2 text-sm text-red-600">{errors.branch}</p>
                  )}
                </div>
                <div className="col-span-6 mt-2">
                  <label htmlFor="name" className="form-label">
                    ພະແນກ (Divisioin)
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className={classNames(
                      touched.name && errors.name
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div className="col-span-6 mt-2">
                  <label htmlFor="abbreviations" className="form-label">
                    ຕົວຫຍໍ້ (abbreviations)
                  </label>
                  <input
                    type="text"
                    name="abbreviations"
                    id="abbreviations"
                    autoComplete="name"
                    className={classNames(
                      touched.abbreviations && errors.abbreviations
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.abbreviations}
                    onChange={handleChange}
                  />
                  {touched.abbreviations && errors.abbreviations && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.abbreviations}
                    </p>
                  )}
                </div>
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
                    onClick={() => setOpen(false)}
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
  );
}

AddDivision.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddDivision;
