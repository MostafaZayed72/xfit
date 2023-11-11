import isOnline from "is-online";
import { notify } from "./useNotifications";

export const useCheckConnectionToServer = async () => {
   const internetAvailable = await isOnline();
   if (!internetAvailable)
      notify("danger", ["يرجي التأكد من الاتصال بالانترنت"], 10);
   else notify("danger", ["يتم عمل صيانة للنظام الان", "يرجي المحاولة لاحقا"], 10);
};
