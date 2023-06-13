import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { levelPages } from "../../constants/breadcrumb";
import {
  deleteLevel,
  getRiskLevel,
  setLevel,
} from "../../features/level/levelSlice";
import { Loader } from "../../core/spinner";
import { Breadcrumbs, Empty } from "../../core/components";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
import ConfirmModal from "../../core/dialog/ConfirmModal";
import { useSelector,useDispatch } from "react-redux";
// import AddLevel from "./AddLevel";
// import EditLevel from "./EditLevel";

function Level() {
  const { level, levels, loading } = useSelector((state) => state.level);

  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);

  useEffect(() => {
    getRiskLevel();
  }, [getRiskLevel]);

  const onDelete = async () => {
    if (level) {
      await deleteLevel(level._id);
      setDelete(false);
    }
  };

  return (
    <>
      <section className="section-md">
        <Breadcrumbs pages={levelPages} />
        <div className="shadow border-b border-gray-200 sm:mx-2 sm:rounded-lg">
          <div className="px-5 py-2 flex justify-end border-b">
            <NewButton onClick={() => setOpenNew(true)} />
          </div>
          {/* Loading */}
          {loading && (
            <div className="mb-5">
              <Loader />
            </div>
          )}
          {/* No Data */}
          {!loading && !levels.length && (
            <div className="mb-5">
              <Empty text={`ຍັງບໍ່ມີມີຂໍ້ມູນສາຂາ, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`} />
            </div>
          )}
          {/* Table */}
          {!loading && levels.length > 0 && (
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
                    ລະດັບຄວາມສ່ຽງ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ຄວາມຖີ່ໃນການຕິດຕາມແກ້ໄຂ
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
                {levels?.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 text-sm font-normal text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.controlFrequency}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <EditButton
                        onClick={() => {
                          setLevel(item);
                          setOpenEdit(true);
                        }}
                      />
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <DeleteButton
                        onClick={() => {
                          setLevel(item);
                          setDelete(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      {/* Add Branch */}
      {/* <AddLevel open={openNew} setOpen={setOpenNew} /> */}
      {/* Edit Branch */}
      {/* <EditLevel open={openEdit} setOpen={setOpenEdit} /> */}
      {/* Delete Modal */}
      <ConfirmModal
        open={openDelete}
        setOpen={setDelete}
        text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນລະດັບຄວາມສ່ຽງຫຼືບໍ່"
        confirmed={onDelete}
      />
    </>
  );
}

// const mapStateToProps = (state) => ({
//   level: state.level,
// });

export default Level;
