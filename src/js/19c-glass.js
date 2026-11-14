/* glass highlight follows the finger / pointer over a display */
(function(){
  var gl=document.querySelectorAll('.glass');
  gl.forEach(function(g){
    function mv(e){
      var r=g.getBoundingClientRect();if(!r.width)return;
      g.style.setProperty('--gx',Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)).toFixed(0)+'%');
      g.style.setProperty('--gy',Math.max(-10,Math.min(60,(e.clientY-r.top)/r.height*60-10)).toFixed(0)+'%');
    }
    g.addEventListener('pointermove',mv,{passive:true});
    g.addEventListener('pointerdown',mv,{passive:true});
  });
})();
