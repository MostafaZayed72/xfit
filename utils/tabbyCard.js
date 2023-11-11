import('https://checkout.tabby.ai/tabby-card.js')

export function tabbyCard(currency,price,lang){
   new TabbyCard({
      selector: '#tabbyCard', // empty div for TabbyCard.
      currency: currency, // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      lang: lang, // Optional, language of snippet and popups.
      price: price, // required, total price or the cart. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      size: 'narrow', // required, can be also 'wide', depending on the width.
      theme: 'black', // required, can be also 'default'.
      header: false // if a Payment method name present already. 
   });
}