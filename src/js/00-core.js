var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
function store(k,v){try{if(v===undefined){var s=localStorage.getItem(k);return s?JSON.parse(s):null}localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}

