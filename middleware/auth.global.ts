export default defineNuxtRouteMiddleware((to, from) => {
   const authenticated = useCookie("authenticated");
   const unProtectedPaths = ["auth-login", "auth-register"];

   if (authenticated.value == true && unProtectedPaths.includes(to.name))
      return navigateTo("/");

   let isPathProtected;
   if (to.path == "/" || to.path.substring(0, 7) == "/member") {
      isPathProtected = true;
   }

   if (isPathProtected && !authenticated.value)
      return navigateTo("/auth/login");
});
