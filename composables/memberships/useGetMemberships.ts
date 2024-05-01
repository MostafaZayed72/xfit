import { useCustomAxios } from "@/composables/common/useCustomAxios";
export const useGetMemberships = () => {
   return useCustomAxios("members/memberships");
};

// example for post
// export const useGetMemberships = (data) => {
//    return useCustomAxios("members/memberships",{
//       method:'post',
//       data:data
//    });
// };