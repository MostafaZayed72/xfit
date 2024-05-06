import { useCustomAxios } from "@/composables/common/useCustomAxios";
type Params = {
    membership_id: string;
    token_id: string;
}
export const useMembershipTapChargeApplePay = (params) => {
   
   return useCustomAxios("memberships/tap-charge", {
      data: { 
        membership_id: params.membership_id,
        token_id: params.token_id
       },
       method:'POST'
   });
};
