import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useGetTabbySession = (orderID: string, paymentStatus: string) => {
   const membershipID = useState("membershipID");
   //if (!membershipID.value) return;
   return useCustomAxios("memberships/view-tabby-session", {
      params: {
         order_id: orderID,
         payment_status: paymentStatus,
         membershipID: membershipID.value ,
      },
   });
};
