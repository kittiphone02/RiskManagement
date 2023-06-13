import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

 import { measurePages } from "../../constants/breadcrumb";
import {
  deleteMeasure,
  getRiskMeasures,
  setMeasure,
} from "../../features/measure/measureSlice";
import { Loader } from "../../core/spinner";
import Breadcrumbs from "../../core/components/Breadcrumbs";
// import { Breadcrumbs, Empty } from "../../cores/components";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
 import ConfirmModal from "../../core/dialog/ConfirmModal";
import AddMeasure from "./AddMeasure";
import EditMeasure from "./EditMeasure";
import { Pagination } from "../../core/table";

function Measure() {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);

  const { measure, measures, pagination, loading } = useSelector(
    (state) => state.measure
  );

  useEffect(() => {
    dispatch(getRiskMeasures(1));
  }, [dispatch]);

  const onDelete = async () => {
    if (measure) {
      await dispatch(deleteMeasure(measure._id));
      setDelete(false);
    }
  };

  return (
    <>
  <section className="section w-full">
        <Breadcrumbs pages={measurePages} />
        <div className="shadow border-b border-gray-200 sm:mx-2 sm:rounded-lg">
          <div className="px-5 py-2 flex justify-between items-center border-b">
            {!loading && measures.length > 0 ? (
              <h3 className="font-medium font-lao">
                ມີຂໍ້ມູນທັງໝົດ {pagination.total} ລາຍການ
              </h3>
            ) : (
              <span>&#8203;</span>
            )}
            <NewButton onClick={() => setOpenNew(true)} />
          </div>
          {/* Loading */}
          {loading && (
            <div className="mb-5">
              <Loader />
            </div>
          )}
          {/* No Data */}
          {!loading && !measures.length && (
            <div className="mb-5">
              <Empty text={`ຍັງບໍ່ມີມີຂໍ້ມູນສາຂາ, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`} />
            </div>
          )}
          {/* Table */}
          {!loading && measures.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ລ/ດ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ຄວາມເປັນໄປໄດ້
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ຜົນກະທົບ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ລະດັບຄວາມສ່ຽງ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 font-lao"
                  >
                    ແກ້ໄຂ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 font-lao"
                  >
                    ລຶບ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-lao">
                {measures?.map((item, idx) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 text-sm font-normal text-gray-500">
                      {(pagination.current.page - 1) *
                        pagination.current.limit +
                        (idx + 1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.likelihood?.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.impact?.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.level?.name}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <EditButton
                        onClick={() => {
                          dispatch(setMeasure(item));
                          setOpenEdit(true);
                        }}
                      />
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <DeleteButton
                        onClick={() => {
                          dispatch(setMeasure(item));
                          setDelete(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-gray-200 bg-gray-50">
                <tr>
                  <td colSpan={6}>
                    <Pagination
                      pagination={pagination}
                      onPrev={() => dispatch(getRiskMeasures(pagination.prev.page))}
                      onNext={() => dispatch(getRiskMeasures(pagination.next.page))}
                      onPageClick={(page) => dispatch(getRiskMeasures(page))}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </section>
      {/* Add Measure */}
      <AddMeasure
        open={openNew}
        setOpen={setOpenNew}
        page={pagination ? pagination.current.page : 0}
      />
      {/* Edit Measure */}
      <EditMeasure open={openEdit} setOpen={setOpenEdit} />
      {/* Delete Modal */}
      <ConfirmModal
        open={openDelete}
        setOpen={setDelete}
        text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນການປະເມີນຄວາມສ່ຽງຫຼືບໍ່"
        confirmed={onDelete}
      />
    </>
  );
}

// Measure.propTypes = {
//   getRiskMeasures: PropTypes.func.isRequired,
//   deleteMeasure: PropTypes.func.isRequired,
//   setMeasure: PropTypes.func.isRequired,
// };

export default Measure;
