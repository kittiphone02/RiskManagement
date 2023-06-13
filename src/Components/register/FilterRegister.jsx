import { warningMessage } from "../../services/sweetAlert";
import FilterDropdown from "../../core/dropdowns/FilterDropdown";
import YearDropdown from "../../core/dropdowns/YearDropdown";
import DatePicker from "../../core/datepicker/DatePicker";
import BranchDropdown from "../../core/dropdowns/BranchDropdown";
import DivisionDropdown from "../../core/dropdowns/DivisionDropdown";
import SearchButton from "../../core/buttons/SearchButton";

function FilterRegister({
  years,
  branches,
  divisions,
  dateType,
  dataType,
  selectedYear,
  selectedBranch,
  selectedDivision,
  startDate,
  endDate,
  getDataByUser,
  getDataByDivision,
  getDataByDate,
  setDateType,
  setDataType,
  setYear,
  setStartDate,
  setEndDate,
  setDivision,
  handleBranch,
  handleDatePickerChange,
}) {
  const onSearch = () => {
    if (dateType.value === "year") {
      if (dataType.value === "all") {
        getDataByUser(selectedYear);
  
      } else if (dataType.value === "division") {
        if (!selectedBranch) {
          return warningMessage("ກະລຸນາເລືອກສາຂາກ່ອນ!");
        } else if (!selectedDivision) {
          return warningMessage("ກະລຸນາເລືອກພະແນກກ່ອນ!");
        }
        
        getDataByDivision(selectedYear, selectedDivision._id);
          //  console.log(selectedDivision._id);
          //  console.log(selectedYear);
      }
    } else if (dateType.value === "date") {
      if (dataType.value === "all") {
        if (!startDate || !endDate) {
          return warningMessage("ກະລຸນາເລືອກວັນທີກ່ອນ!");
        }
        const body = {
          dataType: "all",
          startDate,
          endDate,
        };

        getDataByDate(body);
      } else if (dataType.value === "division") {
        if (!startDate || !endDate) {
          return warningMessage("ກະລຸນາເລືອກວັນທີກ່ອນ!");
        } else if (!selectedBranch) {
          return warningMessage("ກະລຸນາເລືອກສາຂາກ່ອນ!");
        } else if (!selectedDivision) {
          return warningMessage("ກະລຸນາເລືອກພະແນກກ່ອນ!");
        }

        const body = {
          dataType: "division",
          startDate,
          endDate,
          division: selectedDivision._id,
        };

        getDataByDate(body);
   
      }
    }

  };


  return (
    <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2">
      <FilterDropdown
        dateType={dateType}
        dataType={dataType}
        setDateType={setDateType}
        setDataType={setDataType}
      />
      {dateType?.value === "year" ? (
        <YearDropdown year={selectedYear} years={years} setYear={setYear} />
      ) : (
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onChange={handleDatePickerChange}
        />
      )}
      {dataType.value === "division" && (
        <div className="flex flex-col g sm:flex-row gap-x-2">
          <BranchDropdown
            branches={branches}
            selectedBranch={selectedBranch}
            onChange={handleBranch}
            disabled={dataType?.value === "all"}
          />
          <DivisionDropdown
            divisions={divisions}
            selectedDivision={selectedDivision}
            onChange={setDivision}
            disabled={dataType?.value === "all"}
          />
        </div>
      )}
      {/* Search Button */}
      <SearchButton onClick={onSearch} />
    </div>
  );
}

export default FilterRegister;
