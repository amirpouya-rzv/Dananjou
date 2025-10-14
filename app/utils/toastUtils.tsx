  import { toast, TypeOptions } from "react-toastify";

  let isToastVisible = false;

  export const showToast = (
    text: string,
    icon: TypeOptions = "info",
    autoClose: number | false = 3000 
  ) => {

      if (!isToastVisible) {
      isToastVisible = true;
      toast(text, {
        closeOnClick: true,
        autoClose,
        type: icon,
        rtl: true,
        onClose: () => {
          isToastVisible = false;
        },
      });
    }
  };

  export const errorToast = (text = "عملیات ناموفق") => {
    return showToast(text, "error", 5000);
  };

  export const successToast = (text = "عملیات موفق") => {
    return showToast(text, "success", 3000);
  };

  export const warningToast = (text = "feild input is not corect") => {
    return showToast(text, "warning", 3000);
  };

  export const infoToast = (text = "feild input is not corect") => {
    return showToast(text, "info", 3000);
  };