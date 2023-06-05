import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import DialogProvider from "../../common/DialogProvider";
// import { measureValidate } from "../../services/validatator";
import { updateMeasure } from "../../features/measure/measureSlice";
// import {
//   LikelihoodDropdown
// //   ImpactDropdown,
// //   LevelDropdown,
// } from "../../Components/measure/LikelihoodDropdown";
import LikelihoodDropdown from "../../Components/measure/LikelihoodDropdown";
import ImpactDropdown from "../../Components/measure/ImpactDropdown";
import LevelDropdown from "../../Components/measure/LevelDropdown";

function EditMeasure({ open, setOpen }) {
  const dispatch = useDispatch();
  const measure = useSelector((state) => state.measure.measure);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (values) => {
    setSubmitted(true);
    const body = {
      likelihood: values.likelihood._id,
      impact: values.impact._id,
      level: values.level._id,
    };
    const res = await dispatch(updateMeasure({ id: measure._id, body }));
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
            ແກ້ໄຂຜົນກະທົບ
          </h3>
          <Formik
            initialValues={{
              likelihood: measure?.likelihood || "",
              impact: measure?.impact || "",
              level: measure?.level || "",
            }}
            // validationSchema={measureValidate}
            onSubmit={(values) => onSubmit(values)}
          >
            {({ touched, errors, values, setFieldValue }) => (
              <Form className="mt-5 grid grid-cols-6">
                <div className="col-span-6">
                  <label htmlFor="value" className="form-label">
                    ຄວາມເປັນໄປໄດ້ (Risk Likelihood)
                  </label>
                  <LikelihoodDropdown
                    value={values.likelihood}
                    setValue={(val) => setFieldValue("likelihood", val)}
                  />
                  {touched.likelihood && errors.likelihood && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.likelihood}
                    </p>
                  )}
                </div>
                <div className="col-span-6 mt-3">
                  <label htmlFor="value" className="form-label">
                    ຜົນກະທົບ (Risk Impact)
                  </label>
                  <ImpactDropdown
                    value={values.impact}
                    setValue={(val) => setFieldValue("impact", val)}
                  />
                  {touched.impact && errors.impact && (
                    <p className="mt-2 text-sm text-red-600">{errors.impact}</p>
                  )}
                </div>
                <div className="col-span-6 mt-3">
                  <label htmlFor="value" className="form-label">
                    ລະດັບຄວາມສ່ຽງ (Risk Level)
                  </label>
                  <LevelDropdown
                    value={values.level}
                    setValue={(val) => setFieldValue("level", val)}
                  />
                  {touched.level && errors.level && (
                    <p className="mt-2 text-sm text-red-600">{errors.level}</p>
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

// EditMeasure.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
// };

export default EditMeasure;
    