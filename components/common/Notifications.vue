<template>
   <section class="notifications-container w-64">
      <div v-for="notification in notifications" :key="notification"
         class="notification-template text-[var(--c1)] shadow-lg rounded-xl p-3 mt-5 leading-8"
         :class="notification.className">
         <p v-for="message in notification.messagesArray">
            {{ message }}
         </p>
      </div>
   </section>
</template>
<script setup>
import { notifications } from '@/composables/common/useNotifications'

</script>
<style scoped>
.notifications-container {
   bottom: 20px;
   left: 20px;
   position: fixed;
   z-index: 1056;
}

.notification-template {
   transition: all 0.5s ease-in-out 0s;
   z-index: 1031;
}

.success {
   background-color: var(--c7);
}

.danger {
   background-color: var(--c9);
}
</style>
