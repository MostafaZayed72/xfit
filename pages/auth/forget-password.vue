<template>
   <main class="container">
      <div class="row">
         <div class="col-xs-8 offset-xs-2 col-md-4 offset-md-4">
            <div class="mb-5">
               <img class="logo" src="/imgs/logo.png" alt="Xfit" />
            </div>
            <p class="text-center">{{ $t('Password reset') }}</p>
            <form action="javascript:;" id="auth" @submit.prevent="submit()">
               <div class="mb-3">
                  <label class="form-label">
                     <!-- {{ $t('Please, enter your email or mobile phone') }} -->
                     {{ $t('Enter your email') }}
                  </label>
                  <input
                     type="text"
                     class="form-control"
                     v-model="value"
                     required
                     autofocus
                  />
               </div>
            </form>
            <div>
               <button type="submit" class="btn btn-primary" form="auth">
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

<script>
export default {
   auth: false,
   layout: 'auth',
   data() {
      return {
         value: '',
      }
   },
   mounted() {
      if (this.$auth.loggedIn) this.$router.push('/')
   },
   methods: {
      submit() {
         // if (this.value == '') return

         // if (
         //    !this.$validateEmail(this.value) &&
         //    this.value.substring(0, 1) == '0'
         // )
         //    return
         if (!this.$validateEmail(this.value)) return

         this.$store
            .dispatch('resetPassword', this.value)
            .then(() => {
               this.$router.push('/auth/login')
               this.$notify('success', [this.$t('A new password has been sent to your email')])
            })
            .catch(() => {
               this.$notify('danger', [this.$t('Please, try again later.')])
            })
      },
   },
}
</script>

<style scoped>
.logo {
   width: 65%;
   display: block;
   margin: auto;
}
</style>
