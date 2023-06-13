import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import { HiChevronRight } from "@heroicons/react/solid";
import { HiChevronRight } from "react-icons/hi2";
import { transactionDetailPages } from "../../constants/breadcrumb";
import { confirmWithIputModal } from "../../services/sweetAlert";
import { RISK_CLOSE } from "../../constants/config";
import classNames from "../../utils/classname";
import Layout from "../../Components/layouts/RootLayout";
import Breadcrumbs from "../../core/components/Breadcrumbs";
import DateFormat from "../../core/components/DateFormat";
import ListItem from "../../core/dropdowns/ListItem";
import Loading from "../../core/spinner/Loader";
import Banner from "../../Components/transaction/Banner";

import {
  getTransaction,
  closeTransaction,
} from "../../features/transaction/transactionSlice";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, transaction, loading } = useSelector((state) => ({
    user: state.auth.user,
    transaction: state.transaction.transaction,
    loading: state.transaction.loading,
  }));

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getTransaction(id));
  }, [dispatch, id]);

  

  const onCloseTransaction = async () => {
    if (!submitted) {
      const result = await confirmWithIputModal("ກະລຸນາປ້ອນເຫດຜົນ");
      if (result.isConfirmed) {
        setSubmitted(true);
        const res = await dispatch(closeTransaction({ id, body: result.value }));
        if (res.success) {
          navigate("/transaction");
        }
      }
    }
  };

  return (
    user && (
      <Layout>
        <section className="section-md">
          {/* Breadcrumbs */}
          <Breadcrumbs pages={transactionDetailPages} />
          {/* Show Loading */}
          {loading && <Loading customClass="mt-10" />}
          {/* No Data */}
          {!loading && !transaction && <Loading customClass="mt-10" />}
          {/* Transaction Detail */}
          {transaction && !loading && (
            <div className="overflow-hidden bg-white font-lao shadow sm:rounded-lg md:mx-2">
              <div className="flex flex-col items-center justify-between px-4 py-5 sm:flex-row sm:px-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    ລາຍລະອາຍຄວາມສ່ຽງ
                  </h3>
                  <p className="mt-1 flex max-w-2xl flex-col items-start gap-x-0.5 text-sm text-gray-500 md:flex-row md:items-center">
                    {/* <span>{transaction.division.branch.name}</span> */}
                    <HiChevronRight className="hidden w-5 md:block" />
                    <span>{transaction.division.name}</span>
                  </p>
                </div>
                <h2 className="text-lg font-semibold">ປີ {transaction.year}</h2>
              </div>
              {/* Banner */}
              <Banner
                onClick={onCloseTransaction}
                status={transaction.riskStatus}
                role={user.role}
              />
              {/* Detail start from here */}
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                  {/* Risk ID */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ລະຫັດ (ID)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.id}
                    </dd>
                  </div>
                  {/* Objective */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ເປົ້າໝາຍ (Objective)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.objective}
                    </dd>
                  </div>
                  {/* Risk Identity */}
                  <div className="col-span-2 sm:col-span-2">
                    <dt className="text-sm font-light text-gray-500">
                      ຄວາມສ່ຽງທີ່ອາດຈະເກີດຂື້ນ (Risk Identity)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.identity}
                    </dd>
                  </div>
                  {/* Risk Likelihood */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ຄວາມເປັນໄປໄດ້ (Risk Likelihood)
                    </dt>
                    <dd className="mt-2 flex h-9 w-9 items-center justify-center rounded-full text-sm text-gray-900 ring ring-blue-600 ring-offset-1">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black border-opacity-10">
                        {transaction.likelihood.value}
                      </span>
                    </dd>
                  </div>
                  {/* Risk Impact */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ຜົນກະທົບ (Risk Impact)
                    </dt>
                    <dd className="mt-2 flex h-9 w-9 items-center justify-center rounded-full text-sm text-gray-900 ring ring-blue-600 ring-offset-1">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black border-opacity-10">
                        {transaction.impact.value}
                      </span>
                    </dd>
                  </div>
                  {/* Risk Level */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ລະດັບຄວາມສ່ຽງ (Risk Impact)
                    </dt>
                    <dd className="mt-1 text-sm text-red-600">
                      {transaction.level.name}
                    </dd>
                  </div>
                  {/* Control Frequency */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ຄວາມຖີ່ໃນການຕິດຕາມແກ້ໄຂ (Control Frequency)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.level.controlFrequency}
                    </dd>
                  </div>
                  {/* Risk Control */}
                  <div className="col-span-2 lg:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ວິທີແກ້ໄຂ (Risk Control)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {transaction.controls.length > 1 ? (
                        <ListItem list={transaction.controls} />
                      ) : (
                        transaction.controls[0]
                      )}
                    </dd>
                  </div>
                  {/* Additional Recommended Control Actions */}
                  <div className="col-span-2 lg:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ການແກ້ໄຂທີກ່ຽວຂ້ອງກັບພະແນກອື່ນ (Additional Recommended
                      Control Actions)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {!transaction?.additional?.length && <span>N/A</span>}
                      {transaction.additional?.length > 1 ? (
                        <ListItem list={transaction.additional} />
                      ) : (
                        transaction.additional[0]
                      )}
                    </dd>
                  </div>
                  {/* Risk Status */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ສະຖານະພາບ (Risk Status)
                    </dt>
                    <dd
                      className={classNames(
                        transaction?.riskStatus === RISK_CLOSE
                          ? "text-blue-600"
                          : "text-red-600",
                        "mt-1 text-sm font-bold"
                      )}
                    >
                      {transaction.riskStatus}
                    </dd>
                  </div>
                  {/* Risk Status */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ແຜນແກ້ໄຂສໍາເລັດ (Expected tobe solved)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <DateFormat date={transaction.expected} />
                    </dd>
                  </div>
                  {/* Role User Only */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ຜູ້ອະນຸມັດ (Approved By)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span>{transaction.userApproved.fullName}</span>
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ວ ທ ປ ສົ່ງ (Approved Date)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <DateFormat date={transaction.approvedDate} />
                    </dd>
                  </div>
                  {/* Confirmed User */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ຜູ້ກວດ (Confirmed By)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span>{transaction.userConfirmed.fullName}</span>
                    </dd>
                  </div>
                  {/* Confirmed Date */}
                  <div className="col-span-2 sm:col-span-1">
                    <dt className="text-sm font-light text-gray-500">
                      ວ ທ ປ ກວດ (Confirmed Date)
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <DateFormat date={transaction.confirmedDate} />
                    </dd>
                  </div>
                  {/* Risk Close Date */}
                  {transaction.riskStatus === "CLOSE" && (
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-sm font-light text-gray-500">
                        ຜູ້ປິດ (Closed by)
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span>{transaction.userClosed.fullName}</span>
                      </dd>
                    </div>
                  )}
                  {/* Risk Close Date */}
                  {transaction.riskStatus === "CLOSE" && (
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-sm font-light text-gray-500">
                        ວ ທ ປ ປິດ (Closed Date)
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <DateFormat date={transaction.closedDate} />
                      </dd>
                    </div>
                  )}
                  {/* Clesed Reason */}
                  {transaction.riskStatus === "CLOSE" && (
                    <div className="col-span-2">
                      <dt className="text-sm font-light text-gray-500">
                        ເຫດຜົນຂອງການປິດ (Closed Reason)
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {transaction.closedReason}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="bg-gray-50 p-2 text-right text-sm text-gray-500">
                <span className="mr-1.5">ວ ດ ປ ເພີ່ມຂໍ້ມູນ (Created At)</span>
              </div>
            </div>
          )}
        </section>
      </Layout>
    )
  );
};

export default TransactionDetail;
