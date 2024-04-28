import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useGetTabbySession = (orderID: string, paymentStatus: string) => {
   const membershipID = useState("membershipID");
   console.log('membershipID',membershipID)

   if (!membershipID.value) {
      if(localStorage.getItem("membershipID")){
         membershipID.value = localStorage.getItem("membershipID")
         console.log('membershipID localStorage:',membershipID)
      }else{
         return;
      }
   } 
   return useCustomAxios("memberships/view-tabby-session", {
      params: {
         order_id: orderID,
         payment_status: paymentStatus,
         membershipID: membershipID.value ,
      },
   });
};
