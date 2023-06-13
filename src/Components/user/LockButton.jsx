
import classNames from "../../utils/classname";
import { confirmModal } from "../../services/sweetAlert";
import { HiOutlineLockClosed,HiOutlineLockOpen } from "react-icons/hi2";

function LockButton({ id, verified, onVerify, onUnverify }) {

  const onClick = async () => {
    const result = await confirmModal(
      `ທ່ານຕ້ອງການ${verified ? "ລ໋ອກ" : "ປົດລ໋ອກ"}ຜູ້ໃຊ້ບໍ່?`
    );
    if (result.isConfirmed) {
      verified ? onUnverify(id) : onVerify(id);
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        verified
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2"
      )}
      onClick={onClick}
    >
      {verified ? (
        <HiOutlineLockClosed className="h-5 w-5" aria-hidden="true" />
      ) : (
        <HiOutlineLockOpen className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

export default LockButton;
