import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "../../utils/classname";
import { updateLikelihoods } from "../../features/likelihoods/likelihoodsSlice";
import DialogProvider from "../../common/DialogProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    value: yup.string().required("Branch v is required"),
});

function EditLikelihood({ open, setOpen, selectedlikelihood }) {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
        value: selectedlikelihood?.value || "",
    },
  });

  useEffect(() => {
    setValue("value", selectedlikelihood?.value || "");
  }, [selectedlikelihood, setValue]);



  const onSubmit = async (values) => {

    if (selectedlikelihood) {
        setSubmitted(true);
      const res = await dispatch(updateLikelihoods({ id: selectedlikelihood._id, body: values }));
      if (res){
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
            ແກ້ໄຂLikelihood
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-6">
            <div className="col-span-6">
              <label htmlFor="name" className="form-label">
              Likelihood (Likelihood)
              </label>
              

              <input
                type="text"
                name="value"
                id="name"
                autoComplete="name"
                className={classNames(
                  touchedFields.name && errors.name ? "form-input-invalid" : "form-input",
                  "mt-1"
                )}
                {...register("value")}
              />
              {touchedFields.name && errors.name && (
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

// EditLikelihood.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   selectedBranch: PropTypes.object.isRequired,
// };

export default EditLikelihood;
