import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getYears } from "../../features/year/yearSlice";
import { getBranches } from "../../features/branch/branchSlice";
import { getDivisionsByBranch } from "../../features/division/divisionSlice";
import {
  getTransactions,
  getTransactionsByDivision,
  getTransactionsByYear,
  setTransactionDateType,
  setTransactionStartDate,
  setTransactionEndDate,
  setTransactionYear,
  setTransactionBranch,
  setTransactionDivision,
  setTransactionType,
  clearTransactionDivision,
} from "../../features/transaction/transactionSlice";
import { registeredPages } from "../../constants/breadcrumb";
import { currentYear, ROLE_USER } from "../../constants/config";
import classNames from "../../utils/classname";
import { Breadcrumbs, Empty } from "../../core/components";
import YearDropdown from "../../core/dropdowns/YearDropdown";
import TransactionItem from "../../Components/transaction/TransactionItem";
import FilterRegister from "../../Components/register/FilterRegister";
import { enableCache } from "@iconify/react";

function Transaction() {
  const dispatch = useDispatch();
  const {
    user,
    years,
    branches,
    divisions,
    transactions,
    selectedYear,
    selectedBranch,
    selectedDivision,
    dateType,
    dataType,
    startDate,
    endDate,
  } = useSelector((state) => ({
    user: state.auth.user,
    years: state.year.years,
    branches: state.branch.branches,
    divisions: state.division.divisions,
    transactions: state.transaction.transactions,
    selectedYear: state.transaction.selectedYear,
    selectedBranch: state.transaction.selectedBranch,
    selectedDivision: state.transaction.selectedDivision,
    dateType: state.transaction.dateType,
    dataType: state.transaction.dataType,
    startDate: state.transaction.startDate,
    endDate: state.transaction.endDate,
  }));

  useEffect(() => {
    dispatch(getYears());
    dispatch(getBranches());
    dispatch(getTransactionsByYear(currentYear));
  }, [dispatch]);

  const handleBranch = (branch) => {
    dispatch(setTransactionBranch(branch));
    dispatch(getDivisionsByBranch(branch._id));
    dispatch(clearTransactionDivision());
  };

  const handleYear = (year) => {
    dispatch(setTransactionYear(year));
    dispatch(getTransactionsByYear(year));
  };
  const handleDatePickerChange = (ranges) => {
    // Handle the selected range
    const { startDate, endDate } = ranges;
  
    dispatch(setTransactionStartDate(startDate.toDateString()));
    dispatch(setTransactionEndDate(endDate.toDateString()));
  };
  
  
  return (
    user && (
      <>
        {/* Breadcrumbs */}
        <Breadcrumbs pages={registeredPages} />
        <section className="section-md">
          {/* Register  List */}

          <div className="border rounded sm:mx-2 sm:rounded-lg lg:flex-1">
            <div
              className={classNames(
                transactions.length > 0 && "border-b",
                "px-5 py-2 flex flex-col gap-y-2 justify-between"
              )}
            >
              {user.role === ROLE_USER ? (
                <FilterRegister
                  years={years}
                  branches={branches}
                  divisions={divisions}
                  dateType={dateType}
                  dataType={dataType}
                  selectedYear={selectedYear}
                  selectedBranch={selectedBranch}
                  selectedDivision={selectedDivision}
                  startDate={startDate}
                  endDate={endDate}
                  getDataByUser={(year) => {
                    dispatch(getTransactionsByYear(year));
                  }}
                  getDataByDivision={(year, division) => {
                    dispatch(getTransactionsByDivision({ year, division }));
                  }}
                  getDataByDate={getTransactions}
                  setDateType={(date) => {
                    dispatch(setTransactionDateType(date))
                  }}
                  setDataType={(type) => {
                    dispatch(setTransactionType(type));
                  }}
                  setYear={(year) => {
                    dispatch(setTransactionYear(year));
                  }}
                  setStartDate={setTransactionStartDate}
                  setEndDate={setTransactionEndDate}
                  setDivision={(division) => {
                    dispatch(setTransactionDivision(division));
                  }}
                  handleBranch={handleBranch}
                  handleDatePickerChange={handleDatePickerChange}
                />
              ) : (
                <div className="flex items-center">
                  <h1 className="flex-1 font-medium text-gray-600 font-lao">
                    {user.division.name}
                  </h1>

                  <div className="flex gap-x-2">
                    <YearDropdown
                      years={years}
                      year={selectedYear}
                      setYear={handleYear}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Risk Register List */}
            {transactions.length > 0 && (
              <TransactionItem transactions={transactions} />
            )}
          </div>
          {transactions.length === 0 && (
            <Empty text="ຍັງບໍ່ມີຂໍ້ມູນການເຄື່ອນໄຫວ, ກະລຸນາຄົ້ຫາຂໍ້ມູນດ້ານເທິງ" />
          )}
        </section>
      </>
    )
  );
}


Transaction.propTypes = {
  user: PropTypes.object,
  years: PropTypes.array,
  branches: PropTypes.array,
  divisions: PropTypes.array,
  transactions: PropTypes.array,
  selectedYear: PropTypes.array, // Incorrect type (should be string)
  selectedBranch: PropTypes.string,
  selectedDivision: PropTypes.string,
  dateType: PropTypes.string,
  dataType: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};


export default Transaction;
