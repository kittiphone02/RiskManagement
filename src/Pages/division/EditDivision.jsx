import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import DialogProvider from "../../common/DialogProvider";
import classNames from "../../utils/classname";
import Dropdown from "../../core/dropdowns/Dropdown";
import { updateDivision } from "../../features/division/divisionSlice";
import * as Yup from "yup";

function EditDivision({ open, setOpen }) {
  const dispatch = useDispatch();
  const { branches, division } = useSelector((state) => ({
    branches: state.branch.branches,
    division: state.division.division,
  }));
  const [submitted, setSubmitted] = useState(false);
 const divisionValidate = Yup.object({
    branch: Yup.object().required("ກະລຸນາເລືອກສາຂາ"),
    name: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ພະແນກ"),
    abbreviations: Yup.string().trim().required("ກະລຸນາປ້ອນຕົວຫຍໍ້"),
  });
  const onSubmit = async (values) => {
    if (division) {
      const body = { ...values, branch: values.branch._id };
      setSubmitted(true);
      const res = await dispatch(updateDivision({ id: division._id, body }));
      if (res.success) {
        setOpen(false);
      }
      setSubmitted(false);
    }
  };

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-md">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            ແກ້ໄຂຂໍ້ມູນພະແນກ
          </h3>
          <Formik
            initialValues={{
              branch: division?.branch || "",
              name: division?.name || "",
              abbreviations: division?.abbreviations || "",
            }}
            validationSchema={divisionValidate}
            onSubmit={onSubmit}
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

EditDivision.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default EditDivision;
