<template>
   <main class="container">
      <div class="row">
         <div class="col-xs-8 offset-xs-2 col-md-4 offset-md-4">
            
            <p class="text-center">{{ $t('Password reset') }}</p>
            <form action="javascript:;" id="auth" @submit.prevent="submit()">
               <div class="my-3 text-center" >
                  <label class="form-label" >
                     <!-- {{ $t('Please, enter your email or mobile phone') }} -->
                     {{ $t('Enter your email') }}
                  </label>
                  <input
                  style="border: 1px solid;"
                     type="text"
                     class="form-control rounded"
                     v-model="value"
                     required
                     autofocus
                  />
               </div>
            </form>
            <div class=" flex gap-2 justify-center">
               <button type="submit" class="w-24 bg-cyan-500 choose" form="auth">
                  {{ $t('Confirm') }}
               </button>
               <nuxt-link class="btn btn-secondary" to="/auth/login">
                  {{ $t('Back') }}
               </nuxt-link>
            </div>
         </div>
      </div>
   </main>
</template>

<script setup>
definePageMeta({ layout: "auth" });

// export default {
//    auth: false,
//    layout: 'auth',
//    data() {
//       return {
//          value: '',
//       }
//    },
//    mounted() {
//       if (this.$auth.loggedIn) this.$router.push('/')
//    },
//    methods: {
//       submit() {
//          // if (this.value == '') return

//          // if (
//          //    !this.$validateEmail(this.value) &&
//          //    this.value.substring(0, 1) == '0'
//          // )
//          //    return
//          if (!this.$validateEmail(this.value)) return

//          this.$store
//             .dispatch('resetPassword', this.value)
//             .then(() => {
//                this.$router.push('/auth/login')
//                this.$notify('success', [this.$t('A new password has been sent to your email')])
//             })
//             .catch(() => {
//                this.$notify('danger', [this.$t('Please, try again later.')])
//             })
//       },
//    },
// }
</script>

<style scoped>
.logo {
   width: 65%;
   display: block;
   margin: auto;
}
</style>
