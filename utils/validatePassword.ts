import { notify } from "~/composables/common/useNotifications";

export const validatePassword = (password: string) => {
   const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
   if (passwordRegex.test(password)) return true;
   notify(
      "danger",
      [
         "يجب ادخال كلمة مرور قوية تحتوي على",
         "- حرف كبير",
         "- حرف صغير",
         "- رقم",
         "- رمز",
         "- طولها لا يقل عن 8",
      ],
      6
   );
};
