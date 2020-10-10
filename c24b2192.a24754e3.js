(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{221:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return u}));var a=t(2),i=t(6),r=(t(0),t(254)),o={id:"exchange-sending-transactions",title:"Sending Transactions",keywords:["constructing transaction object","signing transaction","sending transaction","zilliqa"],description:"Sending Zilliqa Transactions For Exchanges"},s={id:"exchanges/exchange-sending-transactions",isDocsHomePage:!1,title:"Sending Transactions",description:"Sending Zilliqa Transactions For Exchanges",source:"@site/docs/exchanges/exchange-sending-transactions.md",permalink:"/docs/exchanges/exchange-sending-transactions",editUrl:"https://github.com/Zilliqa/dev-portal/tree/master/docs/exchanges/exchange-sending-transactions.md",sidebar:"ExchangesSidebar",previous:{title:"Account Management",permalink:"/docs/exchanges/exchange-account-management"},next:{title:"Polling for Deposits",permalink:"/docs/exchanges/exchange-tracking-deposits"}},c=[{value:"Constructing the Transaction Object",id:"constructing-the-transaction-object",children:[]},{value:"Signing the Transaction",id:"signing-the-transaction",children:[]},{value:"Sending the Transaction",id:"sending-the-transaction",children:[]}],l={rightToc:c};function u(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("hr",null),Object(r.b)("p",null,"A critical feature of any exchange is the ability to withdraw the funds held\nin custody to an arbitrary address of the user's choosing. Because Zilliqa\nnodes do not provide an API for signing transactions on your behalf, you will\nhave to do so locally using an SDK of your choosing. We provide examples using\nzilliqa-js, the official JavaScript SDK."),Object(r.b)("h2",{id:"constructing-the-transaction-object"},"Constructing the Transaction Object"),Object(r.b)("p",null,"There are several ways to construct a ",Object(r.b)("inlineCode",{parentName:"p"},"Transaction")," instance. We recommend\nusing the transaction factory that is on the umbrella Zilliqa object, like\nso:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const { Zilliqa } = require("@zilliqa-js/zilliqa");\nconst { getPubKeyFromPrivateKey } = require("@zilliqa-js/crypto");\nconst { BN, Long, bytes, units } = require("@zilliqa-js/util");\n\nconst api = "https://dev-api.zilliqa.com";\nconst chainId = 333; // Testnet\nconst msgVersion = 1;\nconst zilliqa = new Zilliqa(api);\n\nconst toAddress = "BENCH32_ADDRESS";\nconst fromPrivateKey = "SENDER_PRIVATE_KEY";\nconst fromPublicKey = getPubKeyFromPrivateKey(fromPrivateKey)\nconst fromAddress = getAddressFromPrivateKey(fromPrivateKey)\nconst amountToSendInZil = 0.17;\nconst gasPriceInZil = 0.001;\nconst nextNonce = (await zilliqa.blockchain.getBalance(fromAddress)).result.nonce + 1;\n\nconst rawTx = zilliqa.transactions.new({\n  version: bytes.pack(chainId, msgVersion),\n  amount: new BN(units.toQa(amountToSendInZil * 1000000, units.Units.Li)),\n  nonce: nextNonce,\n  gasLimit: Long.fromNumber(1), // normal (non-contract) transactions cost 1 gas\n  gasPrice: new BN(units.toQa(gasPriceInZil * 1000000, units.Units.Li)), // the minimum gas price is 1,000 li\n  toAddr: toAddress,\n  pubKey: fromPublicKey, // this determines which account is used to send the tx\n});\n')),Object(r.b)("h2",{id:"signing-the-transaction"},"Signing the Transaction"),Object(r.b)("p",null,"Again, there are a few ways you can sign your transaction. Under the hood,\nsigning is done with the elliptic curve ",Object(r.b)("inlineCode",{parentName:"p"},"secp256k1"),". The easiest way to do\nthis is by using a wallet. Extending our example above:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"zilliqa.wallet.addByPrivateKey(fromPrivateKey);\n// signWith uses the specified address to perform the signing of the transaction.\n// note that we provided the nonce to use when constructing the transaction.\n// if the nonce is not provided, zilliqa-js will automatically try to determine the correct nonce to use.\n// however, if there is no network connection, zilliqa-js will not be able to\n// do that, and signing will fail.\nconst signedTx = await zilliqa.wallet.signWith(rawTx, fromAddress);\n")),Object(r.b)("p",null,"Note that we provided the nonce to use when constructing the transaction. If the nonce is not provided, zilliqa-js will automatically try to determine the correct nonce to use.\nHowever, if there is no network connection, zilliqa-js will not be able to do that, and signing will fail."),Object(r.b)("p",null,"If the ",Object(r.b)("inlineCode",{parentName:"p"},"Transaction")," is successfully signed, you will be able to access the\n",Object(r.b)("inlineCode",{parentName:"p"},"signature")," property on ",Object(r.b)("inlineCode",{parentName:"p"},"txParams"),"."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"console.log(signedTx.txParams.signature) // 128-bit signature\n")),Object(r.b)("p",null,"At this stage, you'll be able to broadcast your newly-signed transaction to\nthe network through a seed node."),Object(r.b)("h2",{id:"sending-the-transaction"},"Sending the Transaction"),Object(r.b)("p",null,"Broadcasting a signed transaction is trivial, but involves some subtleties\nthat can trip you up if you do not have a deep understanding of Zilliqa's\narchitecture."),Object(r.b)("p",null,"We demonstrate a lower-level way to broadcast a transaction using the built-in\n",Object(r.b)("inlineCode",{parentName:"p"},"HTTPProvider"),", as follows:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'const res = await zilliqa.provider.send("CreateTransaction", signedTx.txParams)\n')),Object(r.b)("p",null,"This returns a ",Object(r.b)("inlineCode",{parentName:"p"},"Promise")," that, if successful, will contain your transaction\nhash:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"console.log(res.result && res.result.TranID) // 32-byte transaction hash\n")),Object(r.b)("p",null,"However, note that ",Object(r.b)("inlineCode",{parentName:"p"},"result")," will not exist on the response if there is an\nerror in processing the transaction. Instead, the response will contain an\n",Object(r.b)("inlineCode",{parentName:"p"},"error")," key, which is an object that complies with JSON-RPC 2.0."),Object(r.b)("p",null,"If you receive a ",Object(r.b)("inlineCode",{parentName:"p"},"TranID"),", that means your transaction was accepted by the\nseed node, and is now pending. ",Object(r.b)("inlineCode",{parentName:"p"},"zilliqa-js")," provides a way to automatically\npoll the lookup for confirmation:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"// returns a Promise<Transaction>\n// in this case, we try polling the node 33 times, increasing the interval\n// between attempts by 1000ms each time. this works out roughly to the block\n// time on the Zilliqa main net.\nconst tx = await signedTx.confirm(res.result.TranID, 33, 1000)\n")),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"confirm")," method returns a Promise the status of which signifies the\nconfirmation status of the transaction. If the transaction was confirmed:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"assert(signedTx.isConfirmed() === true);\n")))}u.isMDXComponent=!0},254:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return g}));var a=t(0),i=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=i.a.createContext({}),u=function(e){var n=i.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=u(e.components);return i.a.createElement(l.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},p=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=u(t),p=a,g=d["".concat(o,".").concat(p)]||d[p]||b[p]||r;return t?i.a.createElement(g,s(s({ref:n},l),{},{components:t})):i.a.createElement(g,s({ref:n},l))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,o=new Array(r);o[0]=p;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<r;l++)o[l]=t[l];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"}}]);