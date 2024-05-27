import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useGetTabbySession = async (orderID: string, paymentStatus: string) => {
   const membershipID = useState("membershipID");

   if (!membershipID.value) {
      const storedMembershipID = localStorage.getItem("membershipID");
      if(storedMembershipID){
         membershipID.value = storedMembershipID;
      } else {
         return null; // أو يمكنك إرجاع قيمة افتراضية أو رسالة خطأ
      }
   }

   try {
      const response = await useCustomAxios("memberships/view-tabby-session", {
         params: {
            order_id: orderID,
            payment_status: paymentStatus,
            membershipID: membershipID.value,
         },
      });
      // console.log(response.data.value.membership_id)

      return response;
   } catch (error) {
      console.error('Error fetching Tabby session:', error);
      return null; // أو يمكنك إرجاع قيمة افتراضية أو رسالة خطأ
   }
};
