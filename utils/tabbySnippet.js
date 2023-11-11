import('https://checkout.tabby.ai/tabby-promo.js')

export function tabbysnippet(currency,price,lang) {

   new TabbyPromo({
        selector: '#TabbyPromo', // required, content of tabby Promo Snippet will be placed in element with that selector.
        currency: currency, // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
        price: price , // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
        installmentsCount: 4, // Optional, for non-standard plans.
        lang: lang, // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
        source: 'product', // Optional, snippet placement; `product` for product page and `cart` for cart page.
        publicKey: process.env.publicKey, // required, store Public Key which identifies your account when communicating with tabby.
        merchantCode: process.env.merchantCode  // required
      });
}

