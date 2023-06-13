// import { SearchIcon } from "@heroicons/react/outline";

function SearchButton({ onClick }) {
  return (
    <button type="button" className="btn-primary" onClick={onClick}>
      {/* <SearchIcon className="w-6" /> */}
      <span>ຄົ້ນຫາ</span>
    </button>
  );
}

export default SearchButton;
