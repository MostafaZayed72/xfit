import { useCustomAxios } from "@/composables/common/useCustomAxios";
import { notify } from "@/composables/common/useNotifications";

type newMembership = {
   branch_id: number;
   package_id: number;
   membership_start_date: number;
};

export const useCreateMembership = (
   memberInformationIsRequired: boolean,
   minMembershipStartDate: string,
   maxMembershipStartDate: string,
   newMembership: newMembership
) => {
   const { $t } = useNuxtApp();

   // if (memberInformationIsRequired)
   //    return notify("danger", [
   //       $t(
   //          "Please, complete the required information.",
   //          "يرجي استكمال البيانات المطلوبة"
   //       ),
   //    ]);

   if (!newMembership.branch_id)
      return notify("danger", [
         $t("Please, choose a branch", "يرجي اختيار الفرع"),
      ]);

   if (!newMembership.membership_start_date)
      return notify("danger", [
         $t(
            "Please, enter membership start date",
            "يرجى إدخال تاريخ بدء الاشتراك"
         ),
      ]);

   if (
      new Date(newMembership.membership_start_date) >
         new Date(maxMembershipStartDate) ||
      new Date(newMembership.membership_start_date) <
         new Date(minMembershipStartDate)
   )
      return notify(
         "danger",
         [
            $t("You should enter a date between", "يجب ادخال تاريخ بين"),
            minMembershipStartDate,
            $t("and", "و"),
            maxMembershipStartDate,
         ],
         6
      );

   return useCustomAxios("memberships/create", {
      method: "POST",
      data: newMembership,
   });
};
