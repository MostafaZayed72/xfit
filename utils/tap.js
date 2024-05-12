import('https://secure.gosell.io/js/sdk/tap.min.js')
const DEV_AUTH_KEY = 'pk_test_Fb1AGPBOUqrnamTCEj4c62il'
const PRO_AUTH_KEY = 'pk_live_NJI7KQrf4OgCMRhAeHFTxmLl'

export default{
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
      
   },
}