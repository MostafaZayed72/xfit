export const viewMembership = (id: number) => {
   const membershipID = useState("membershipID");
   membershipID.value = id;
   return navigateTo("/member/memberships/view");
};
