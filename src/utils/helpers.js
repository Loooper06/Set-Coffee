const { default: swal } = require("sweetalert");

const showSwal = (text, icon, buttons) => {
  swal({ text, icon, buttons });
};

export { showSwal };
