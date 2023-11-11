import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useGetMemberships = () => {
   return useCustomAxios("members/memberships");
};
