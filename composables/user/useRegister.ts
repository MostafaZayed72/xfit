import { useCustomAxios } from "../common/useCustomAxios";
import { notify } from "../common/useNotifications";

type newUser = {
   first_name: string;
   last_name: string;
   mobile_phone: string;
   password: string;
};

export const useRegister = (newUser: newUser) => {
   if (newUser.first_name == "")
      return notify("danger", ["يجب ادخال الاسم الاول"]);

   if (newUser.last_name == "")
      return notify("danger", ["يجب ادخال الاسم الاخير"]);

   if (newUser.mobile_phone == "")
      return notify("danger", ["يجب ادخال رقم الجوال"]);

   if (!validatePassword(newUser.password)) return;

   return useCustomAxios("members/register", {
      method: "POST",
      data: newUser,
   });
};
