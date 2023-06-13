import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Layout from "../../Components/layouts/RootLayout";
import { impactPages } from "../../constants/breadcrumb";
import {
  deleteImpact,
  getRiskImpacts,
  setImpact,
} from "../../features/impact/impactSlice";
import { Loader } from "../../core/spinner";
import { Breadcrumbs, Empty } from "../../core/components";
import { useDispatch, useSelector } from "react-redux";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
// import AddImpact from "./AddImpact";
// import EditImpact from "./EditImpact";
import ConfirmModal from "../../core/dialog/ConfirmModal";


function Impact() {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);

  const {
    impacts,
    impact,
    loading
    // verifyUser,
  } = useSelector((state) => ({
    impacts: state.impact.impacts,
    impact: state.impact.impact,
    loading: state.impact.loading
    // verifyUser: state.user.user.verified,
  }));


  useEffect(() => {
    dispatch(getRiskImpacts());
  }, [dispatch]);

  const onDelete = async () => {
    if (impact) {
      await deleteImpact(impact._id);
      setDelete(false);
    }
  };

  return (
    <Layout>
      <section className="section-md">
        <Breadcrumbs pages={impactPages} />
        <div className="max-w-5xl mx-auto">
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
            {!loading && !impacts.length && (
              <div className="mb-5">
                <Empty
                  text={`ຍັງບໍ່ມີມີຂໍ້ມູນຜົນກະທົບ, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`}
                />
              </div>
            )}
            {/* Table */}
            {!loading && impacts.length > 0 && (
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
                      ຜົນກະທົບ
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
                  {impacts?.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 text-sm font-normal text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {item.value}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <EditButton
                          onClick={() => {
                            setImpact(item);
                            setOpenEdit(true);
                          }}
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <DeleteButton
                          onClick={() => {
                            setImpact(item);
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
      {/* Add Branch */}
      {/* <AddImpact open={openNew} setOpen={setOpenNew} /> */}
      {/* Edit Branch */}
      {/* <EditImpact open={openEdit} setOpen={setOpenEdit} /> */}
      {/* Delete Modal */}
      <ConfirmModal
        open={openDelete}
        setOpen={setDelete}
        text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນຜົນກະທົບຫຼືບໍ່"
        confirmed={onDelete}
      />
    </Layout>
  );
}

// Impact.propTypes = {
//   getRiskImpacts: PropTypes.func.isRequired,
//   deleteImpact: PropTypes.func.isRequired,
//   setImpact: PropTypes.func.isRequired,
//   impact: PropTypes.object.isRequired,
// };



export default Impact;
