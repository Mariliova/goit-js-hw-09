!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var r=o("h6c0i");function i(e,n){var t=Math.random()>.3;return new Promise((function(o,r){setTimeout((function(){t?o({position:e,delay:n}):r({position:e,delay:n})}),n)}))}function u(e){var n=e.position,t=e.delay;r.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(t,"ms"),{useIcon:!1})}function a(e){var n=e.position,t=e.delay;r.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(t,"ms"),{useIcon:!1})}r.Notify.init({}),{form:document.querySelector(".form")}.form.addEventListener("submit",(function(e){e.preventDefault();for(var n=function(e){return{firstDelay:Number(e.currentTarget.elements.delay.value),step:Number(e.currentTarget.elements.step.value),amount:Number(e.currentTarget.elements.amount.value)}}(e),t=n.firstDelay,o=n.step,r=n.amount,c=t,f=1;f<=r;f+=1)i(f,c).then((function(e){return u(e)})).catch((function(e){return a(e)})),c+=o}))}();
//# sourceMappingURL=03-promises.879c4b99.js.map
