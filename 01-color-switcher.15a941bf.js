const t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.body};let e=null;t.stop.setAttribute("disabled","true"),t.start.addEventListener("click",(function(){e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.start.setAttribute("disabled","true"),t.stop.removeAttribute("disabled")})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.removeAttribute("disabled"),t.stop.setAttribute("disabled","true")}));
//# sourceMappingURL=01-color-switcher.15a941bf.js.map
