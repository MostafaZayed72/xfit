export const viewMembership = (id: number) => {
   const membershipID = useState("membershipID");
   membershipID.value = id;
   localStorage.setItem("membershipID",id.toString());
   return navigateTo("/member/memberships/view");
};
