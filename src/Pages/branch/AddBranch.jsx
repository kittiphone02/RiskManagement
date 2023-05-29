import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "../../utils/classname";
import { addBranch } from "../../features/branch/branchSlice";
import DialogProvider from "../../common/DialogProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const branchValidate = yup.object().shape({
  name: yup.string().required("Branch name is required"),
});

function AddBranch({ open, setOpen }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, touched },
    setValue,
  } = useForm({
    resolver: yupResolver(branchValidate),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitted(true);
    const res = await dispatch(addBranch(values));
    if (res) {
      setOpen(false);
    }
    setSubmitted(false);
  };

  return (
    <DialogProvider open={open}>
      <div className="dialog-container w-full sm:max-w-md">
        <div className="mt-3 sm:mt-0">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            ເພີ່ມສາຂາ
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-6">
            <div className="col-span-6">
              <label htmlFor="name" className="form-label">
                ສາຂາ (Branch)
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className={classNames(
                  touched && touched.name && errors && errors.name
                    ? "form-input-invalid"
                    : "form-input",
                  "mt-1"
                )}
                {...register("name")}
              />
              {touched && touched.name && errors && errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
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
          </form>
        </div>
      </div>
    </DialogProvider>
  );
}

AddBranch.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default AddBranch;
