import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const confirmModal = (text) =>
  MySwal.fire({
    title: "ຢືນຢັນ",
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    allowOutsideClick: false,
    customClass: {
      container: "sweetalert-container",
      popup: "sweetalert-popup",
      // icon: 'sweetalert-icon',
      title: "sweetalert-title",
      htmlContainer: "sweetalert-text",
      confirmButton: "sweetalert-button",
      cancelButton: "sweetalert-button",
    },
  });

export const confirmWithIputModal = (text) =>
  MySwal.fire({
    title: "ຢືນຢັນ",
    input: "textarea",
    text: text,
    showCancelButton: true,
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#EF4444",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    allowOutsideClick: false,
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage(
          '<i class="fa fa-info-circle"></i> Reason is required'
        );
      }

      return value;
    },
    customClass: {
      container: "sweetalert-container",
      popup: "sweetalert-popup",
      title: "sweetalert-title",
      htmlContainer: "sweetalert-text",
      confirmButton: "sweetalert-button",
      cancelButton: "sweetalert-button",
    },
  });

export const successMessage = (msg) =>
  MySwal.fire({
    icon: "success",
    title: "ສໍາເລັດ",
    text: msg,
    customClass: {
      container: "sweetalert-container",
      popup: "sweetalert-popup",
      title: "sweetalert-title",
      htmlContainer: "sweetalert-text",
      confirmButton: "sweetalert-button",
    },
  });

export const warningMessage = (msg) =>
  MySwal.fire({
    icon: "warning",
    title: "Oops...",
    text: msg,
    customClass: {
      container: "sweetalert-container",
      popup: "sweetalert-popup",
      title: "sweetalert-title",
      htmlContainer: "sweetalert-text",
      confirmButton: "sweetalert-button",
    },
  });

export const errorMessage = (msg) =>
  MySwal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    customClass: {
      container: "sweetalert-container",
      popup: "sweetalert-popup",
      title: "sweetalert-title",
      htmlContainer: "sweetalert-text",
      confirmButton: "sweetalert-button",
    },
  });
