var app={},counter=0;app.global={init:function(){console.log("load global functions"),app.global.logAnchorClicks(),app.global.modalAction(),app.global.animateOnLoad()},logAnchorClicks:function(){document.querySelectorAll("A").forEach((o=>{o.addEventListener("click",(o=>{o.preventDefault(),console.log(o.target)}))}))},modalAction:function(){const o=document.querySelector("#modal"),e=document.querySelector("#close"),l=document.querySelectorAll(".img");let n;l.forEach((e=>{e.addEventListener("click",(l=>{o.style.display="block";const t=e.id.slice(-1);n=document.querySelector(`#modal-img-${t}`),n.style.display="block"}))})),e.addEventListener("click",(e=>{o.style.display="none",n.style.display="none"}))},animateOnLoad:function(){const o=document.querySelectorAll("section")[1];document.addEventListener("scroll",(e=>{const l=window.scrollY,n=window.scrollY+window.innerHeight,t=o.offsetTop,c=o.offsetHeight;counter<1&&(n>t&&l-c<t?(o.classList.add("animate"),counter++):o.classList.remove("animate"))}),!1)}},app.global.init(),console.log("Load script.js");
//# sourceMappingURL=all.js.map