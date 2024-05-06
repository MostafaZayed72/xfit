const DEV_AUTH_KEY = 'pk_test_Fb1AGPBOUqrnamTCEj4c62il';
const PRO_AUTH_KEY = 'pk_live_NJI7KQrf4OgCMRhAeHFTxmLl';

export  function useTap(){
    function init(dir: 'ltr' | 'rtl') {
        console.log("Here ?")
        //pass your public key from tap's dashboard // if development locale use the dev
        const tap = Tapjsli(DEV_AUTH_KEY)
  
        const elements = tap.elements({})
  
        const style = {
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
              color: 'red',
           },
        }
        // input labels/placeholders
        const labels = {
           cardNumber: 'Card Number',
           expirationDate: 'MM/YY',
           cvv: 'CVV',
           cardHolder: 'Card Holder Name',
        }
        //payment options
        const paymentOptions = {
           currencyCode: ['KWD', 'USD', 'SAR'],
           labels: labels,
           TextDirection: dir,
           // TextDirection: 'ltr',
        }
        //create element, pass style and payment options
        const card = elements.create('card', { style: style }, paymentOptions)
        //mount element
        setTimeout(() => {
           card.mount('#element-container')
        }, 600)
  
        return { tap: tap, card: card }
     }
     function createToken(tap:any, card:any) {
        return tap.createToken(card)
     }

     return {
        init,
        createToken
     }
   
}