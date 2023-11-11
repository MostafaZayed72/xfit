export default defineNuxtPlugin((nuxtApp) => {
   const lang = useCookie("lang");
   return {
      provide: {
         t: (english: string, arabic: string) => {
            if (lang.value == "ar" && arabic) return arabic;
            return english;
         },
      },
   };
});
