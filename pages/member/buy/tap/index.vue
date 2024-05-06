<template>
   <main v-if="membership">
     <h3 class="display-6 text-center">
       {{ $t('Membership information') }}
     </h3>
 
     <hr class="my-5" />
 
     <membership :membership="membership" />
 
     <section class="text-start mt-3">
       <nuxt-link class="btn btn-secondary" to="/memberships/view">
         {{ $t('Back') }}
       </nuxt-link>
     </section>
 
     <section>
       <hr class="my-4" />
       <h4>{{ $t('Payment') }}</h4>
       <form @submit.prevent="generateToken">
         <div id="element-container"></div>
         <hr class="m-4 m-md-4" />
         <div class="d-flex justify-content-between">
           <div>
             <p class="text-sm">
               <small>
                 {{
                   $t(
                     'Clicking the Pay button means agreeing to all the terms and conditions, '
                   )
                 }}
                 <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                   {{ $t('and it can be viewed from here.') }}
                 </a>
               </small>
             </p>
           </div>
           <div class="mt-2">
             <span class="text-danger px-3">
               {{ $t('Package price') }}:
               {{ membership.price.toLocaleString() }}
               {{ $t('SAR') }}
             </span>
             <button type="submit" class="btn btn-primary" :disabled="submit_disabled">
               <span v-if="!submit_disabled">
                 {{ $t('Pay') }}
               </span>
               <div v-else class="spinner-border spinner-border-sm mx-2" role="status">
                 <span class="visually-hidden">Loading...</span>
               </div>
             </button>
           </div>
         </div>
       </form>
     </section>
 
     <!-- Terms and conditions modal -->
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-lg">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">
               {{ $t('Terms and conditions') }}
             </h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <p v-for="(term, index) in terms" :key="term">
               <small>{{ index + 1 + '. ' + $t(term) }}</small>
             </p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
               {{ $t('Close') }}
             </button>
           </div>
         </div>
       </div>
     </div>
   </main>
 </template>
 
 <script>
 import { membershipTerms } from '~/assets/data/membershipTerms'
 import * as tap from '~/utils/tap'
 export default {
   computed: {
     dir() {
       return this.$store.state.lang === 'ar' ? 'rtl' : 'ltr'
     },
     membership_id() {
       return this.$store.state.container.membership_id
     },
     terms() {
       return membershipTerms()
     },
   },
   data() {
     return {
       membership: null,
       tap_init: null,
       generated_token: null,
       submit_disabled: false,
     }
   },
   mounted() {
     if (!this.membership_id) return this.$router.push('/memberships')
     this.getMembership()
     this.tap_init = tap.init(this.dir)
   },
   methods: {
     async getMembership() {
       try {
         const response = await this.$store.dispatch('getMembership', {
           params: { id: this.membership_id },
         })
         this.membership = response.data
       } catch (error) {
         console.error('Error fetching membership:', error)
       }
     },
     async generateToken() {
       if (this.submit_disabled) return
       try {
         this.generated_token = await tap.createToken(
           this.tap_init.tap,
           this.tap_init.card
         )
         this.submit_disabled = true
       } catch (error) {
         console.error('Error generating token:', error)
       }
     },
     async charge() {
       try {
         const response = await this.$store.dispatch('membershipTapCharge', {
           membership_id: this.membership_id,
           token_id: this.generated_token.id,
         })
         if (response.data.url) {
           return window.location.replace(response.data.url)
         }
         if (response.data.payment_status === 'CAPTURED') {
           this.$router.push({
             path: '/buy/tap/view',
             query: { charge_id: response.data.charge_id },
           })
         }
       } catch (error) {
         console.error('Error charging membership:', error)
         this.submit_disabled = false
       }
     },
   },
   watch: {
     generated_token() {
       setTimeout(() => {
         console.log(this.generated_token)
         if (this.generated_token.id) {
           this.charge()
         } else {
           this.$notify('danger', this.generated_token.error)
           this.submit_disabled = false
         }
       }, 1000)
     },
   },
 }
 </script>
 
 <style scoped>
 iframe {
   min-height: 170px;
 }
 </style>
 