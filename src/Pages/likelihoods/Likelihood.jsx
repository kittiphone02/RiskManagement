


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/layouts/RootLayout";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
 import EditLikelihood from "./EditLikelihood";
import ConfirmModal from "../../core/dialog/ConfirmModal";
import Breadcrumbs from "../../core/components/Breadcrumbs";
import { likelihoodPages } from "../../constants/breadcrumb";
import { getRiskLikelihoods, deleteLikelihoods } from "../../features/likelihoods/likelihoodsSlice";

 import AddLikelihood  from "./AddLikelihood";
import { Loader } from "../../core/spinner";

function Likelihood() {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);
//   const [selectedlikelihood, setSelectedlikelihood] = useState({});

const { likelihoods, loading } = useSelector((state) => state.likelihoods);
const [selectedlikelihood, setSelectedlikelihood] = useState(null);


  useEffect(() => {
    dispatch(getRiskLikelihoods());
  }, [dispatch]);

  const onDelete = async () => {
    if (selectedlikelihood) {
      await dispatch(deleteLikelihoods(selectedlikelihood._id));
      setDelete(false);
    }
  };
//   console.log(likelihoods);
//   console.log(loading);

  return (
    <>
    <Layout>
    <section className="section w-full">
        <Breadcrumbs pages={likelihoodPages} />
        <div className="w-full mx-auto">
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
            {!loading && !likelihoods.length && (
              <div className="mb-5">
                <Empty text={`ຍັງບໍ່ມີມີຂໍ້ມູນສາຂາ, ກະລຸນາເພີ່ມຂໍ້ມູນໃໝ່`} />
              </div>
            )}
            {/* Table */}
            {!loading && likelihoods.length > 0 && (
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
                  {likelihoods?.map((item, index) => (
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
                            setSelectedlikelihood(item);
                            setOpenEdit(true);
                          }}
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <DeleteButton
                          onClick={() => {
                            setSelectedlikelihood(item);
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
      <AddLikelihood open={openNew} setOpen={setOpenNew} />

      <EditLikelihood
      open={openEdit}
      setOpen={setOpenEdit}
      selectedlikelihood={selectedlikelihood}
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



export default Likelihood;

