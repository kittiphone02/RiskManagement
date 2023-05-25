

const date = new Date();

// export const API_URI = "http://localhost:5000";
// export const API_URI = "https://risk-register-api.herokuapp.com";
export const API_URI = "http://apb.services.pro:35021";
// CONSTANT VARIABLE
export const currentYear = date.getFullYear();

export const CURRENT_DATE = new Date(Date.now());
// ROLES
export const ROLE_ROOT = "ROLE_ROOT";
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_USER = "ROLE_USER";
export const ROLE_CREATE = "ROLE_CREATE";
export const ROLE_VERIFY = "ROLE_VERIFY";
export const ROLE_APPROVE = "ROLE_APPROVE";
// STATUS
export const STATUS_CREATED = "CREATED";
export const STATUS_VERIFIED = "VERIFIED";
export const STATUS_APPROVED = "APPROVED";
export const STATUS_CONFIRMED = "CONFIRMED";
export const STATUS_UNRELEVANTED = "UNRELEVANTED";
// RISK STATUS
export const RISK_OPEN = "OPEN";
export const RISK_CLOSE = "CLOSE";
