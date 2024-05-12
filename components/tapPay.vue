<template>
   <form id="form-container" method="post" @submit.prevent="generateToken()">
      <!-- Tap element will be here -->
      <div id="element-container"></div>
      <div id="error-handler" role="alert"></div>
      <div id="success" style="display: none; position: relative; float: left;">
         Success! Your token is <span id="token"></span>
      </div>
      <!-- Tap pay button -->
      <button class="w-20 py-1 text-center rounded bg-cyan-500 choose mt-6 mx-auto"> {{ $t("Confirm", "تأكيد") }}
      </button>
   </form>
</template>

<script>

import('https://secure.gosell.io/js/sdk/tap.min.js')

import { membershipTerms } from "@/utils/membershipTerms";
import { useGetMembership } from "@/composables/memberships/useGetMembership";
import { lang } from "@/composables/user/useUser";
const dir = computed(() => {
   return lang == "ar" ? "rtl" : "ltr";
});
const membership = ref();
const tap_init = ref();
const generated_token = ref();
const submit_disabled = ref();

const getMembership = () => {
   membership.value = useGetMembership();
};

//pass your public key from tap's dashboard
var tap = Tapjsli('pk_test_Fb1AGPBOUqrnamTCEj4c62il');
// import * as tap from "@/utils/tap";

var elements = tap.elements({});

var style = {
   base: {
      color: '#535353',
      lineHeight: '18px',
      fontFamily: 'sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
         color: 'rgba(0, 0, 0, 0.26)',
         fontSize: '15px'
      }
   },
   invalid: {
      color: 'red'
   }
};
// input labels/placeholders
var labels = {
   cardNumber: "Card Number",
   expirationDate: "MM/YY",
   cvv: "CVV",
   cardHolder: "Card Holder Name"
};
// payment options
var paymentOptions = {
   currencyCode: ["KWD", "USD", "SAR"], //change the currency array as per your requirement
   labels: labels,
   TextDirection: 'ltr', //only two values valid (rtl, ltr)
   paymentAllowed: ['VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'MADA'] //default string 'all' to show all payment methods enabled on your account
}
//create element, pass style and payment options
var card = elements.create('card', { style: style }, paymentOptions);


//mount element
export default {
   mounted() {
      function init(dir) {
         
         //pass your public key from tap's dashboard
         var tap = Tapjsli(PRO_AUTH_KEY)
      
         var elements = tap.elements({})
      
         var style = {
            base: {
               color: '#535353',
               lineHeight: '18px',
               fontFamily: 'sans-serif',
               fontSmoothing: 'antialiased',
               fontSize: '16px',
               '::placeholder': {
                  color: 'rgba(0, 0, 0, 0.26)',
                  fontSize: '15px',
               },
            },
            invalid: {
               color: 'green',
            },
         }
         // input labels/placeholders
         var labels = {
            cardNumber: 'Card Number',
            expirationDate: 'MM/YY',
            cvv: 'CVV',
            cardHolder: 'Card Holder Name',
         }
         //payment options
         var paymentOptions = {
            currencyCode: ['KWD', 'USD', 'SAR'],
            labels: labels,
            TextDirection: dir,
            // TextDirection: 'ltr',
         }
         //create element, pass style and payment options
         var card = elements.create('card', { style: style }, paymentOptions)
         //mount element
         setTimeout(() => {
            card.mount('#element-container')
         }, 600)
      
         return { tap: tap, card: card }
      }
      
      
       async function createToken(tap, card) {
         return tap.createToken(card)
      }
      
     card.mount('#element-container');
      getMembership();
   tap_init.value = init(dir.value);

   import('https://secure.gosell.io/js/sdk/tap.min.js')








  
   var form = document.getElementById('form-container');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  tap.createToken(card).then(function(result) {
    console.log(result);
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('error-handler');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      var errorElement = document.getElementById('success');
      errorElement.style.display = "block";
      var tokenElement = document.getElementById('token');
      tokenElement.textContent = result.id;
      console.log(result.id);
    }
  });
});



//card change event listener
card.addEventListener('change', function(event) {
  if(event.BIN){
    console.log(event.BIN)
  }
  if(event.loaded){
    console.log("UI loaded :"+event.loaded);
    console.log("current currency is :"+card.getCurrency())
  }
  var displayError = document.getElementById('error-handler');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});



   },

   methods: {

      generateToken() {
         var card = elements.create('card', { style: style }, paymentOptions)
         var tap = Tapjsli('pk_test_Fb1AGPBOUqrnamTCEj4c62il');

         if (this.submit_disabled) return
         this.generated_token =  tap.createToken(
            this.tap_init.tap,
            this.tap_init.card
         )
         this.submit_disabled = true
         console.log('true' + this.tap)

      },
  createToken(tap, card) {
         return tap.createToken(card)
      }


   },
  

   watch: {
      generated_token() {
         setTimeout(() => {
            console.log(this.generated_token)
            if (this.generated_token.id) this.charge()
            else {
               this.$notify('danger', this.generated_token.error)
               this.submit_disabled = false
            }
         }, 1000)
      },
   },

}


const chargeRequest = ref();
const charge = () => {
   this.$store
      .dispatch("membershipTapCharge", {
         membership_id: this.membership_id,
         token_id: this.generated_token.id,
      })
      .then((response) => {})
      .catch(() => {
         this.submit_disabled = false;
      });
};

watch(
   () => chargeRequest.value?.isFinished,
   () => {
      if (chargeRequest.value?.isFinished && !chargeRequest.value?.error) {
         submit_disabled.value = false;

         if (chargeRequest.value.data.url)
            return window.location.replace(chargeRequest.value.data.url);
         if (chargeRequest.value.data.payment_status == "CAPTURED")
            navigateTo({
               path: "/buy/tap/view",
               query: { charge_id: chargeRequest.value.data.charge_id },
            });
      }
   }
);

watch(
   () => generated_token.value,
   () => {
      setTimeout(() => {
         console.log(this.generated_token);
         if (this.generated_token.id) this.charge();
         else {
            this.$notify("danger", [this.generated_token.error]);
            this.submit_disabled = false;
         }
      }, 1000);
   }
);

//    // لحد هنا ماشيين صح

   // Handle form submission

</script>

<style>
.form-row {
   width: 70%;
   float: left;
   background-color: #ededed;
}

#card-element {
   background-color: transparent;
   height: 40px;
   border-radius: 4px;
   border: 1px solid transparent;
   box-shadow: 0 1px 3px 0 #e6ebf1;
   -webkit-transition: box-shadow 150ms ease;
   transition: box-shadow 150ms ease;
}

#card-element--focus {
   box-shadow: 0 1px 3px 0 #cfd7df;
}

#card-element--invalid {
   border-color: #fa755a;
}

#card-element--webkit-autofill {
   background-color: #fefde5 !important;
}

#submitbutton,
#tap-btn {
   align-items: flex-start;
   background-attachment: scroll;
   background-clip: border-box;
   background-color: rgb(50, 50, 93);
   background-image: none;
   background-origin: padding-box;
   background-position-x: 0%;
   background-position-y: 0%;
   background-size: auto;
   border-bottom-color: rgb(255, 255, 255);
   border-bottom-left-radius: 4px;
   border-bottom-right-radius: 4px;
   border-bottom-style: none;
   border-bottom-width: 0px;
   border-image-outset: 0px;
   border-image-repeat: stretch;
   border-image-slice: 100%;
   border-image-source: none;
   border-image-width: 1;
   border-left-color: rgb(255, 255, 255);
   border-left-style: none;
   border-left-width: 0px;
   border-right-color: rgb(255, 255, 255);
   border-right-style: none;
   border-right-width: 0px;
   border-top-color: rgb(255, 255, 255);
   border-top-left-radius: 4px;
   border-top-right-radius: 4px;
   border-top-style: none;
   border-top-width: 0px;
   box-shadow: rgba(50, 50, 93, 0.11) 0px 4px 6px 0px, rgba(0, 0, 0, 0.08) 0px 1px 3px 0px;
   box-sizing: border-box;
   color: rgb(255, 255, 255);
   cursor: pointer;
   display: block;
   float: left;
   font-family: "Helvetica Neue", Helvetica, sans-serif;
   font-size: 15px;
   font-stretch: 100%;
   font-style: normal;
   font-variant-caps: normal;
   font-variant-east-asian: normal;
   font-variant-ligatures: normal;
   font-variant-numeric: normal;
   font-weight: 600;
   height: 35px;
   letter-spacing: 0.375px;
   line-height: 35px;
   margin-bottom: 0px;
   margin-left: 12px;
   margin-right: 0px;
   margin-top: 28px;
   outline-color: rgb(255, 255, 255);
   outline-style: none;
   outline-width: 0px;
   overflow-x: visible;
   overflow-y: visible;
   padding-bottom: 0px;
   padding-left: 14px;
   padding-right: 14px;
   padding-top: 0px;
   text-align: center;
   text-decoration-color: rgb(255, 255, 255);
   text-decoration-line: none;
   text-decoration-style: solid;
   text-indent: 0px;
   text-rendering: auto;
   text-shadow: none;
   text-size-adjust: 100%;
   text-transform: none;
   transition-delay: 0s;
   transition-duration: 0.15s;
   transition-property: all;
   transition-timing-function: ease;
   white-space: nowrap;
   width: 150.781px;
   word-spacing: 0px;
   writing-mode: horizontal-tb;
   -webkit-appearance: none;
   -webkit-font-smoothing: antialiased;
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
   -webkit-border-image: none;

}
</style>