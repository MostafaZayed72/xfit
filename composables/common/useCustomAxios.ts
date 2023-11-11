import axios from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { logout } from "@/composables/user/useUser";
import { useCheckConnectionToServer } from "@/composables/common/useCheckConnectionToServer";
import { notify } from "@/composables/common/useNotifications";

type axiosConfig = {
   method?: string;
   params?: {};
   data?: {};
};

export const useCustomAxios = (
   url: string,
   axiosConfig: axiosConfig = {},
   initialData: any = null
) => {
   const accessToken = useCookie("accessToken");
   const config = useRuntimeConfig();
   const instance = axios.create({
      baseURL: config.public.baseURL,
      headers: { Authorization: "Bearer " + accessToken.value },
   });

   instance.interceptors.response.use(
      function (response) {
         if (response.config.method == "post" && response.status == 201) {
            notify("success", ["تم الحفظ"]);
         } else if (response.config.method == "put" && response.status == 204) {
            notify("success", ["تم الحفظ"]);
         } else if (
            response.config.method == "delete" &&
            response.status == 204
         ) {
            notify("success", ["تم الحذف"]);
         }
         return response;
      },
      function (error) {
         if (!error.response) useCheckConnectionToServer();
         else if (error.response?.status == 401) logout();
         else if (error.response?.status == 500)
            notify("danger", [
               "حدث خطأ من الخادم ، تم ارسال تنبيه لمسئول النظام",
            ]);

         return Promise.reject(error);
      }
   );

   return useAxios(url, axiosConfig, instance, {
      immediate: true,
      initialData: initialData,
   });
};
