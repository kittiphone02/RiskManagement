import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import DialogProvider from "../../common/DialogProvider";
import { passwordValidate } from "../../services/validatator";
import classNames from "../../utils/classname";
import { useSelector, useDispatch } from "react-redux";
import {resetPassword} from "../../features/user/userSlice"

function ResetPassword({ open, setOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.user.user,
  }));

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (values) => {

    if (user) {
      setSubmitted(true);
      const res = await dispatch(resetPassword({id : user._id, body : values}));
      if (res) {
        setOpen(false);
      }
      setSubmitted(false);
    }
  };

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-md">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            ປ່ຽນລະຫັດຜ່ານ
          </h3>
          <Formik
            initialValues={{
              newPassword: "",
            }}
            validationSchema={passwordValidate}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ touched, errors, values, handleChange }) => (
              <Form className="mt-5 grid grid-cols-6">
                <div className="col-span-6">
                  <label htmlFor="newPassword" className="form-label">
                    ລະຫັດຜ່ານ
                  </label>
                  <input
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    autoComplete="value"
                    className={classNames(
                      touched.newPassword && errors.newPassword
                        ? "form-input-invalid"
                        : "form-input",
                      "mt-1"
                    )}
                    value={values.newPassword}
                    onChange={handleChange}
                  />
                  {touched.newPassword && errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.newPassword}
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

// ResetPassword.propTypes = {
//   resetPassword: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// }

export default ResetPassword;
