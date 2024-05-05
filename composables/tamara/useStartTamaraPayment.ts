import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useStartTamaraPayment = async (paymentType: string) => {
   const membershipID = useState("membershipID");
   const res = await useCustomAxios("memberships/tamara-session", {
      method: "POST",
      data: {
         membership_id: membershipID.value,
         payment_type: paymentType,
      },
   });
   if (res.data.value.errors) {
      throw res.data.value.errors;
   }
   return res;
};
