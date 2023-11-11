import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useCheckMemberRequiredInformation = () => {
   return useCustomAxios("members/required-information");
};
