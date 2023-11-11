export const viewPackage = (id: number) => {
   const packageID = useState("packageID");
   packageID.value = id;
   return navigateTo("/member/buy");
};
