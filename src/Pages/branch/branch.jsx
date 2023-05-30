import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/layouts/RootLayout";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
import EditBranch from "./EditBranch";
import ConfirmModal from "../../core/dialog/ConfirmModal";
import { getBranches, deleteBranch } from "../../features/branch/branchSlice";
import AddBranch from "./AddBranch";


function Branch() {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState({});

  const { branches, loading } = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const onDelete = async () => {
    if (selectedBranch) {
      await dispatch(deleteBranch(selectedBranch._id));
      setDelete(false);
    }
  };

  return (
    <>
    <Layout>
      <section className="section w-full">
        {/* <Breadcrumbs pages={branchPages} /> */}
        <div className="w-full mx-auto">
          <div className="shadow border-b border-gray-200 sm:mx-2 sm:rounded-lg">
          <div className="px-5 py-2 flex justify-end border-b">
              <NewButton onClick={() => setOpenNew(true)} />
            </div>
            {/* Loading */}
            {loading && (
              <div className="mb-5">
                loading
                {/* <Loader /> */}
              </div>
            )}
            {/* No Data */}
            {!loading && !branches.length && (
              <div className="mb-5">
                <Empty text={`ຍັງບໍ່ມີມີຂໍ້ມູນສາຂາ, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`} />
              </div>
            )}
            {/* Table */}
            {!loading && branches.length > 0 && (
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
                      ສາຂາ
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
                  {branches?.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 text-sm font-normal text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {item.name}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <EditButton
                          onClick={() => {
                            setSelectedBranch(item);
                            setOpenEdit(true);
                          }}
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <DeleteButton
                          onClick={() => {
                            setSelectedBranch(item);
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
        </div>
      </section>
    </Layout>

      {/* Add Branch */}
      <AddBranch open={openNew} setOpen={setOpenNew} />

      <EditBranch
      open={openEdit}
      setOpen={setOpenEdit}
      selectedBranch={selectedBranch}
    />
    {/* Delete Modal */}
    <ConfirmModal
      open={openDelete}
      setOpen={setDelete}
      text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນສາຂາຫຼືບໍ່"
      confirmed={onDelete}
    />
   </>
  );
}



export default Branch;
