import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "../../utils/classname";
import { addLikelihood } from "../../features/likelihoods/likelihoodsSlice";
import DialogProvider from "../../common/DialogProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitButton, CancelButton } from "../../core/buttons";
import * as yup from "yup";

const branchValidate = yup.object().shape({
    value: yup.string().required("Branch name is required"),
});

function AddLikelihood({ open, setOpen }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);    
  const {
    handleSubmit,
    register,
    formState: { errors, touched },
  } = useForm({
    resolver: yupResolver(branchValidate),
    defaultValues: {
        value: "",
    },
  });


  const onSubmit = async (values) => {
    setSubmitted(true);
     const res = await dispatch(addLikelihood(values));
     console.log(values);

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
            ເພີ່ມlikelihood
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-6">
            <div className="col-span-6">
              <label htmlFor="value" className="form-label">
                likelihood (likelihood)
              </label>
              <input
                type="text"
                name="value"
                id="value"
                autoComplete="value"
                className={classNames(
                  touched && touched.value && errors && errors.value
                    ? "form-input-invalid"
                    : "form-input",
                  "mt-1"
                )}
                {...register("value")}
              />
              {touched && touched.value && errors && errors.value && (
                <p className="mt-2 text-sm text-red-600">{errors.value.message}</p>
              )}
            </div>

            <div className="col-span-6 mt-8 flex justify-end gap-x-2">

            <button
                type="button"
                className= "btn-danger"
                onClick={() => setOpen(false)}
              >
                ຍົກເລີກ
              </button>
              <button
                type="submit"
                className= "btn-primary"
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

// AddLikelihood.propTypes = {
//   setOpen: PropTypes.func.isRequired,
// };

export default AddLikelihood;
