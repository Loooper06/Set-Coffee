const Swal = require("sweetalert");

const showSwal = (text, icon, buttons) => {
  Swal({ text, icon, buttons });
};

export { showSwal };
