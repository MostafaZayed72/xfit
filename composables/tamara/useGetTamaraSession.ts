import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useGetTamaraSession = (orderID: string, paymentStatus: string) => {
   return useCustomAxios("memberships/view-tamara-session", {
      params: {
         order_id: orderID,
         payment_status: paymentStatus,
      },
   });
};
