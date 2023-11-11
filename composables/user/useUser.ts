import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { notify } from "../common/useNotifications";
import { useCheckConnectionToServer } from "~/composables/common/useCheckConnectionToServer";

// export const authenticated = localStorage.getItem("authenticated");
// export const username = localStorage.getItem("username");
// export const accessToken = localStorage.getItem("accessToken");
// export const lang = localStorage.getItem("lang") || "ar";

type user = {
   emailOrMobilePhone: string;
   password: string;
};

export const login = (user: user) => {
   if (user.emailOrMobilePhone == "")
      return notify("danger", ["يجب ادخال الايميل او رقم الجوال"]);
   if (user.password == "") return notify("danger", ["يجب ادخال كلمة المرور"]);

   const config = useRuntimeConfig();
   const instance = axios.create();

   instance.interceptors.response.use(
      function (response) {
         return response;
      },
      function (error) {
         if (!error.response) useCheckConnectionToServer();
         else if (error.response?.status == 401)
            notify("danger", [
               "فشل تسجيل الدخول ، يرجي التأكد من البيانات المدخلة",
            ]);
         else if (error.response?.status == 500) {
            notify("danger", [
               "حدث خطأ من الخادم ، تم ارسال تنبيه لمسئول النظام",
            ]);
         }
         return Promise.reject(error);
      }
   );

   return useAxios(
      config.public.baseURL + "/members/login",
      { method: "POST", data: user },
      instance,
      { immediate: true }
   );
};

export const saveLoginData = (user: any) => {
   const authenticated = useCookie("authenticated");
   const username = useCookie("username");
   const accessToken = useCookie("accessToken");
   const lang = useCookie("lang");

   authenticated.value = "true";
   username.value = user.user_name;
   accessToken.value = user.access_token;
   location.reload();
};

export const logout = () => {
   const authenticated = useCookie("authenticated");
   const username = useCookie("username");
   const accessToken = useCookie("accessToken");

   authenticated.value = null;
   accessToken.value = null;
   username.value = null;

   location.reload();
};
