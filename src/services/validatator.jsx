import * as Yup from "yup";
import { ROLE_APPROVE, ROLE_CREATE, ROLE_VERIFY } from "../constants/config";

const date = new Date();

export const registerValidate = Yup.object({
  objective: Yup.string().trim().required("ກະລຸນາປ້ອນເປົ້າໝາຍ"),
  identity: Yup.string().trim().required("ກະລຸນາປ້ອນຄວາມສ່ຽງທີອາດຈະເກີດຂື້ນ"),
  likelihood: Yup.string().trim().required("ກະລຸນາເລືອກຄວາມເປັນໄປໄດ້"),
  impact: Yup.string().trim().required("ກະລຸນາເລືອກຜົນກະທົບ"),
  level: Yup.string()
    .trim()
    .required("ກະລຸນາເລືອກຄວາມເປັນໄປໄດ້ ແລະ ເລືອກຜົນກະທົບ"),
  expected: Yup.string().trim().required("ກະລຸນາເລືອກແຜນແກ້ໄຂສໍາເລັດ"),
  controls: Yup.array().min(1).of(Yup.string().trim().required()),
});

export const registerInitialValues = {
  year: date.getFullYear(),
  objective: "",
  identity: "",
  likelihood: "",
  impact: "",
  level: "",
  controls: [""],
  additional: [],
  expected: date,
};

export const branchValidate = Yup.object({
  name: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ສາຂາ"),
});

export const divisionValidate = Yup.object({
  branch: Yup.object().required("ກະລຸນາເລືອກສາຂາ"),
  name: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ພະແນກ"),
  abbreviations: Yup.string().trim().required("ກະລຸນາປ້ອນຕົວຫຍໍ້"),
});

export const likelihoodValidate = Yup.object({
  value: Yup.number().required("ກະລຸນາປ້ອນຄ່າຄວາມເປັນໄປໄດ້"),
});

export const impactValidate = Yup.object({
  value: Yup.number().required("ກະລຸນາປ້ອນຄ່າຜົນກະທົບ"),
});

export const levelValidate = Yup.object({
  name: Yup.string().trim().required("ກະລຸນາປ້ອນລະດັບຄວາມສ່ຽງ"),
  controlFrequency: Yup.string()
    .trim()
    .required("ກະລຸນາປ້ອນຄວາມຖີ່ໃນການຕິດຕາມແກ້ໄຂ"),
});

export const measureValidate = Yup.object({
  likelihood: Yup.object().required("ກະລຸນາເລືອກຄວາມເປັນໄປໄດ້"),
  impact: Yup.object().required("ກະລຸນາເລືອກຜົນກະທົບ"),
  level: Yup.object().required("ກະລຸນາປເລືອກລະດັບຄວາມສ່ຽງ"),
});

export const userValidate = Yup.object({
  fullName: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"),
  phoneNumber: Yup.string().trim().min(7).required("ກະລຸນາປ້ອນເບີໂທລະສັບ"),
  role: Yup.string().trim().required("ກະລຸນາປ້ອນເລືອກລະດັບຜູ້ໃຊ້"),
  branch: Yup.object()
    .when("role", {
      is: ROLE_CREATE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    })
    .when("role", {
      is: ROLE_VERIFY,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    })
    .when("role", {
      is: ROLE_APPROVE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    }),
  division: Yup.object()
    .when("role", {
      is: ROLE_CREATE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    })
    .when("role", {
      is: ROLE_VERIFY,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    })
    .when("role", {
      is: ROLE_APPROVE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    }),
  username: Yup.string().trim().required("ກະລຸນາປ້ອນ Username"),
  password: Yup.string().trim().min(4).required("ກະລຸນາປ້ອນລະຫັດຜ່ານ"),
});

export const editUserValidate = Yup.object({
  fullName: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"),
  phoneNumber: Yup.string().trim().min(7).required("ກະລຸນາປ້ອນເບີໂທລະສັບ"),
  role: Yup.string().trim().required("ກະລຸນາປ້ອນເລືອກລະດັບຜູ້ໃຊ້"),
  branch: Yup.object()
    .when("role", {
      is: ROLE_CREATE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    })
    .when("role", {
      is: ROLE_VERIFY,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    })
    .when("role", {
      is: ROLE_APPROVE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກສາຂາ"),
    }),
  division: Yup.object()
    .when("role", {
      is: ROLE_CREATE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    })
    .when("role", {
      is: ROLE_VERIFY,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    })
    .when("role", {
      is: ROLE_APPROVE,
      then: Yup.object().required("ກະລຸນາປ້ອນເລືອກພະແນກ"),
    }),
});

export const adminValidate = Yup.object({
  fullName: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"),
  phoneNumber: Yup.string().trim().min(7).required("ກະລຸນາປ້ອນເບີໂທລະສັບ"),
  role: Yup.string().trim().required("ກະລຸນາປ້ອນເລືອກລະດັບຜູ້ໃຊ້"),
  username: Yup.string().trim().required("ກະລຸນາປ້ອນ Username"),
  password: Yup.string().trim().min(4).required("ກະລຸນາປ້ອນລະຫັດຜ່ານ"),
});

export const updateAdminValidate = Yup.object({
  fullName: Yup.string().trim().required("ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"),
  phoneNumber: Yup.string().trim().min(7).required("ກະລຸນາປ້ອນເບີໂທລະສັບ"),
});

export const passwordValidate = Yup.object({
  newPassword: Yup.string().required("ກະລຸນາປ້ອນລະຫັດຜ່ານ"),
});

export const changePasswordValidate = Yup.object({
  currentPassword: Yup.string()
    .trim()
    .min(4)
    .required("ກະລຸນາປ້ອນລະຫັດຜ່ານປະຈຸບັນ"),
  newPassword: Yup.string().trim().min(4).required("ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່"),
  confirmPassword: Yup.string()
    .trim()
    .min(4)
    .required("ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່ອີກຄັ້ງ"),
});
