<template>
   <div class="flex w-[250px]  delayed justify-between fixed  top-0" :class="!open_menu ? 'mx-[-215px]' : 'go-in'">
      <div class="bg-grey-darken-1 flex flex-col grow h-screen w-[215px] " :class="!open_menu ? 'go-out' : 'go-in'">
         <nuxt-link :class="$route.name === 'index'? 'active' : 'hover:bg-gray-600'" class="flex gap-2 items-center cursor-pointer text-center px-4 py-5"  to="/" @click="selectItem(0)"> <i
               class="fas fa-home" /> {{ $t('Home', 'الرئيسية') }}</nuxt-link>
         <nuxt-link :class="$route.name === 'member-memberships'? 'active' : 'hover:bg-gray-600'" class="flex gap-2 items-center cursor-pointer  text-center px-4 py-5" to="/member/memberships" @click="selectItem(1)">
            <Icon class="text-2xl" name="gridicons:multiple-users" />{{ $t('My memberships', 'اشتراكاتي') }}
         </nuxt-link>
         <nuxt-link :class="$route.name === 'packages'? 'active' : 'hover:bg-gray-600'" class="flex gap-2 items-center cursor-pointer text-center px-4 py-5" to="/packages" @click="selectItem(2)">
            <Icon class="text-2xl" name="bx:bxs-offer" />{{ $t('Packages', 'الباقات') }}
         </nuxt-link>
      </div>
      <i v-if="dir = 'rtl'" class="icon w-[35px] fas fa-bars bg-grey-darken-1 h-fit py-2 px-2 cursor-pointer "
         :class="open_menu ? 'icon-closed' : 'icon-open'" @click="open_menu = !open_menu" />
   </div>
</template>
<script setup>
let dir = document.direction;

const open_menu = ref(false)

let selectedIndex = ref(0)
function selectItem(index) {
  selectedIndex.value = index
}

</script>
<style setup>
.active {
   background-color: rgb(6,182,212);
}
.delayed {
   transition: 1s ease-in-out;
}

.icon {
   border-top-right-radius: 0.5rem;
   border-bottom-right-radius: 0.5rem;
}

div[dir='rtl'] .icon {
   border-top-left-radius: 0.5rem;
   border-bottom-left-radius: 0.5rem;
   border-top-right-radius: 0rem;
   border-bottom-right-radius: 0rem;
}
</style>