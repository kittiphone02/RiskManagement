import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import DialogProvider from "../../common/DialogProvider";
import classNames from "../../utils/classname";
import { impactValidate } from "../../services/validatator";
import { addImpact } from "../../features/impact/impactSlice";
import { useDispatch } from "react-redux";


function AddImpact({ open, setOpen }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-md">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            ເພີ່ມຜົນກະທົບ
          </h3>
          <Formik
            initialValues={{
              value: "",
            }}
            validationSchema={impactValidate}
            onSubmit={async (values) => {
              setSubmitted(true);
              try {
              const res = await dispatch(addImpact(values));
              if (res.payload.success) {
                setOpen(false);
              }
            } catch (error) {}
              setSubmitted(false);
            }}
          >
            {({ touched, errors, values, handleChange }) => (
              <Form className="mt-5 grid grid-cols-6">
                <div className="col-span-6">
                  <label htmlFor="value" className="form-label">
                    ຜົນກະທົບ (Risk Impact)
                  </label>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    autoComplete="value"
                    className={classNames(
                      touched.value && errors.value
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.value}
                    onChange={handleChange}
                  />
                  {touched.value && errors.value && (
                    <p className="mt-2 text-sm text-red-600">{errors.value}</p>
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
  );
}

// AddImpact.propTypes = {
//   addImpact: PropTypes.func.isRequired,
// };

export default AddImpact;
