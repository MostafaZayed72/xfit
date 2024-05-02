import { useCustomAxios } from "@/composables/common/useCustomAxios";
const packageID = useState("packageID");
export const useGetPackage = () => {
   if (!packageID.value) return navigateTo("/packages/view");
   return useCustomAxios("packages/view", {
      params: { id: packageID.value },
   });
};
