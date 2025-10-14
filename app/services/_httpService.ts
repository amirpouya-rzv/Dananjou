import axios, { AxiosResponse } from "axios";
import config from "./_config.json";
import { errorToast, showToast } from "../utils/toastUtils";

export const apiPath = config.onlinepath;

// تنظیم تایم‌اوت درخواست‌ها
axios.defaults.timeout = 10000;

// فلگ برای جلوگیری از نمایش مکرر Toast
let toastAlreadyShown = false;

// تنظیم Interceptor پاسخ‌ها
axios.interceptors.response.use(
  (res) => {
    toastAlreadyShown = false; // در صورت موفقیت، فلگ را ریست کن
    return res;
  },
  (error) => {
    const res = error?.response;

    // فقط در صورتی Toast نمایش بده که قبلاً نمایش داده نشده
    if (!toastAlreadyShown) {
      toastAlreadyShown = true;

      if (!res?.status) {
        errorToast("There is a problem with the server...");
      } else if (res.status >= 500) {
        errorToast(`A problem has occurred on the server side... (${res.status})`);
      } else if (res.status === 401) {
        errorToast(`Unauthorized entry (${res.status})`);
      } else if (res.status === 403) {
        errorToast(`You are not authorized to use.(${res.status})`);
      } else if (res.status >= 400) {
        errorToast(`Be careful when entering information. (${res.status})`);
      } else if (res.status > 201) {
        const message =
          res?.data?.message || `Be careful when entering information. (${res.status})`;
        showToast(message);
      }

      // بعد از 5 ثانیه اجازه نمایش دوباره Toast بده
      setTimeout(() => {
        toastAlreadyShown = false;
      }, 5000);
    }

    return Promise.reject(error);
  }
);

// تابع اصلی ارسال درخواست‌ها
const httpService = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: unknown,
): Promise<AxiosResponse<any>> => {
  return axios({
    baseURL: apiPath,
    url,
    method,
    data,
    // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export default httpService;