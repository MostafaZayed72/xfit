import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useGetProfile = (initialData: {}) => {
   return useCustomAxios("members/profile", {}, initialData);
};
