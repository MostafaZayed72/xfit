// import { useCustomAxios } from "@/composables/common/useCustomAxios";

// export const useStartTabbySession = () => {
//    const membershipID = useState("membershipID");
//    if (!membershipID.value) return;
//    return useCustomAxios("memberships/tabby/create-session", {
//       method: "POST",
//       data: {
//          membershipID: membershipID.value,
//       },
//    });
// };






import { useCustomAxios } from "@/composables/common/useCustomAxios";

export const useStartTabbySession = () => {
   const membershipID = useState("membershipID");
   if (!membershipID.value) return;
   return useCustomAxios("tabby/create-session", {
      method: "POST",
      data: {
         membershipID: membershipID.value,
      },
   });
};
