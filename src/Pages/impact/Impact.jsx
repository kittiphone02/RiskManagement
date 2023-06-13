import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { impactPages } from "../../constants/breadcrumb";
import {
  deleteImpact,
  getRiskImpacts,
  setImpact,
} from "../../features/impact/impactSlice";
import { Loader } from "../../core/spinner";
import Table from "../../core/table";
import { Breadcrumbs, Empty } from "../../core/components";
import { useDispatch, useSelector } from "react-redux";
import { DeleteButton, EditButton, NewButton } from "../../core/buttons";
import AddImpact from "./AddImpact";
import EditImpact from "./EditImpact";
import ConfirmModal from "../../core/dialog/ConfirmModal";

function Impact() {
  const dispatch = useDispatch();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setDelete] = useState(false);

  const {
    impacts,
    impact,
    loading,
  } = useSelector((state) => ({
    impacts: state.impact.impacts,
    impact: state.impact.impact,
    loading: state.impact.loading,
  }));

  const columns = useMemo(() => {

    const handleEditClick = (row) => {
      dispatch(setImpact(row.original));
      setOpenEdit(true);
    };
    const ActionsCell = ({ row }) => (
      <div className="flex space-x-2">
        <EditButton onClick={() => handleEditClick(row)} />
        <DeleteButton
          onClick={() => {
            dispatch(setImpact(row.original));
            setDelete(true);
          }}
        />
      </div>
    );

    return [
      {
        Header: "No",
        accessor: (_, index) => index + 1,
      },
      {
        Header: "Value",
        accessor: "value",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ActionsCell,
      },
    ];
  }, []);

  const data = useMemo(() => impacts, [impacts]);

  useEffect(() => {
    dispatch(getRiskImpacts());
  }, [dispatch]);

  const onDelete = async () => {

    if (impact) {
    
      await dispatch(deleteImpact(impact._id));
      setDelete(false);
    }
  };

  
  return (
    <>
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
              <Table columns={columns} data={data} />
            )}
          </div>
        </div>
      </section>
      {/* Add Branch */}
      <AddImpact open={openNew} setOpen={setOpenNew} />
      {/* Edit Branch */}
      <EditImpact open={openEdit} setOpen={setOpenEdit} />
      {/* Delete Modal */}
      <ConfirmModal
        open={openDelete}
        setOpen={setDelete}
        text="ທ່ານຕ້ອງການລຶບຂໍ້ມູນຜົນກະທົບຫຼືບໍ່"
        confirmed={onDelete}
      />
    </>
  );
}

// Impact.propTypes = {
//   getRiskImpacts: PropTypes.func.isRequired,
//   deleteImpact: PropTypes.func.isRequired,
//   setImpact: PropTypes.func.isRequired,
//   impact: PropTypes.object.isRequired,
// };

export default Impact;
