import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useGetPackages = () => {
   return useCustomAxios("packages/index");
};
