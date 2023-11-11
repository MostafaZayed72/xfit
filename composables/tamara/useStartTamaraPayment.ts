import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useStartTamaraPayment = (paymentType: string) => {
   const membershipID = useState("membershipID");
   return useCustomAxios("memberships/tamara-session", {
      method: "POST",
      data: {
         membership_id: membershipID.value,
         payment_type: paymentType,
      },
   });
};
