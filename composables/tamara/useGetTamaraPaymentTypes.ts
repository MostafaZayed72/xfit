import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useGetTamaraPaymentTypes = (membershipPrice: number) => {
   return useCustomAxios("tamara/payment-types", {
      params: {
         order_value: membershipPrice,
      },
   });
};
