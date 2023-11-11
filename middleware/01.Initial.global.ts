export default defineNuxtRouteMiddleware(() => {
   const lang = useCookie("lang");
   if (!lang.value) lang.value = "en";
});
