import { toast } from "react-toastify";

const UTILITY = {
TOST: (type, message) => {
    const options = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    };

    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning': 
        toast.warn(message, options);
        break;
      case 'info':
      default:
        toast.info(message, options);
        break;
    }
  }
}

export default UTILITY;