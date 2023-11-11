import { useCustomAxios } from "@/composables/common/useCustomAxios";
const membershipID = useState("membershipID");
export const useGetMembership = () => {
   if (!membershipID.value) return navigateTo("/member/memberships");
   return useCustomAxios("memberships/view", {
      params: { id: membershipID.value },
   });
};
