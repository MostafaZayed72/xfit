import { useCustomAxios } from "../common/useCustomAxios";
import { notify } from "../common/useNotifications";

type newUser = {
   first_name: string;
   last_name: string;
   mobile_phone: string;
   password: string;
};

export const useRegister = async (newUser: newUser) => {
   // التحقق من صحة المدخلات قبل الإرسال
   if (newUser.first_name == "")
      return notify("danger", ["يجب ادخال الاسم الاول"]);

   if (newUser.last_name == "")
      return notify("danger", ["يجب ادخال الاسم الاخير"]);

   if (newUser.mobile_phone == "")
      return notify("danger", ["يجب ادخال رقم الجوال"]);

   // التحقق من صحة كلمة المرور إذا كان هناك دالة validatePassword
   // if (!validatePassword(newUser.password)) return;
const myErr= ref()
   try {
      const response = await useCustomAxios("members/register", {
         method: "POST",
         data: newUser,
      });
      
      // التعامل مع الاستجابة الناجحة
      notify("success", ["تم التسجيل بنجاح"]);
      return response; // إرجاع الاستجابة إذا لزم الأمر
   } catch (error : any) {
      // التعامل مع الأخطاء
     myErr.value =error.response?.data.errors.mobile_phone
      return myErr; // إعادة رمي الخطأ ليتم التعامل معه لاحقًا
   }
};
