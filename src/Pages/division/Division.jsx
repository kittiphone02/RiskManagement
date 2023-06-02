import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/layouts/RootLayout";
import { divisionPages } from "../../constants/breadcrumb";
import {
  getDivisionsByBranch,
  deleteDivision ,
  getDivisions,
  setDivision, // Add this line to import the setDivision action creator
} from "../../features/division/divisionSlice";

// import { Breadcrumbs, Empty } from "../../cores/components";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
import ConfirmModal from "../../core/dialog/ConfirmModal";
import BranchDropdown from "./BranchDropdown";
import AddDivision from "./AddDivision";
 import EditDivision from "./EditDivision";
import Empty from "../../Components/Empty";

const Division = () => {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const { division, divisions, selectedBranch, loading } = useSelector(
    (state) => state.division
  );
  

  useEffect(() => {
    if (selectedBranch) {
      dispatch(getDivisionsByBranch(selectedBranch._id));
    }
  }, [dispatch, selectedBranch]);


  const onDelete = async () => {
    if (division) {
      setDeleting(true);
      await dispatch(deleteDivision(division._id));
      // dispatch(getDivisionsByBranch(selectedBranch._id)); // Fetch divisions again
      setDeleting(false);
      setOpenDelete(false);
    }
  };
  
  // const onDelete = async () => {
  //   if (division) {
  //     await dispatch(deleteDivision(division._id));
  //     setOpenDelete(false);
  //   }
  // };
  

  return (
    <Layout>
      <section className="section-md">
        {/* <Breadcrumbs pages={divisionPages} /> */}
        <div className="shadow border-b border-gray-200 sm:mx-2 sm:rounded-lg">
          <div className="px-5 py-2 flex gap-x-4 justify-end border-b">
            <BranchDropdown />
            <NewButton onClick={() => setOpenNew(true)} />
          </div>
          
          {loading && divisions.length === 0 ? (
            <div className="mb-5">
              <Empty text={`ຍັງບໍ່ມີມີຂໍ້ມູນພະແນກ, ກະລຸນາເລືອກສາຂາກ່ອນ`} />
            </div>
          ) : null}

        {!loading && divisions.length === 0 && (
          <div className="mb-5">
            <Empty
              text={`ຍັງບໍ່ມີມີຂໍ້ມູນພະແນກໃນ${selectedBranch?.name}, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`}
            />
          </div>
        )}


      {!loading && divisions.length > 0 && (
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
                    className="px-6 py-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 font-lao"
                  >
                    ສາຂາ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 font-lao"
                  >
                    ພະແນກ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 font-lao"
                  >
                    ຕົວຫຍໍ້
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
              {divisions?.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 text-sm font-normal text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      {item.branch.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      {item.abbreviations}
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <EditButton
                                                onClick={() => {
                                                    dispatch(setDivision(item));
                                                    setOpenEdit(true);
                                                }}
                                            />
                    </td>
                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                      <DeleteButton
                        onClick={() => {
                          dispatch(setDivision(item)); // Use dispatch to call the setDivision action creator
                          setOpenDelete(true);
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
      {/* Delete Modal */}
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        text={`ທ່ານຕ້ອງການລຶບຂໍ້ມູນ${division?.name}ຫຼືບໍ່`}
        confirmed={onDelete}
        />

      <AddDivision open={openNew} setOpen={setOpenNew} />

      <EditDivision open={openEdit} setOpen={setOpenEdit} />
    </Layout>
  );
};

export default Division;
