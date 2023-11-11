import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useUpdateProfileField = (field: {}) => {
   return useCustomAxios("members/update-profile", {
      method: "POST",
      data: field,
   });
};
