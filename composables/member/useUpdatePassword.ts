import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useUpdatePassword = (passwords: {}) => {
   return useCustomAxios("members/update-password", {
      method: "POST",
      data: passwords,
   });
};
