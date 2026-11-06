/* ---------------- snapshots ---------------- */
var snaps=store('grains.snaps.v1')||[null,null,null,null];
var snapBox=$('#snaps');
function snapLabel(b,i){b.innerHTML='<i></i>SNAP '+(i+1)+'<small>'+(snaps[i]?'STORED':'EMPTY')+'</small>'}
[0,1,2,3].forEach(function(i){
  var b=document.createElement('button');b.type='button';b.className='snap';snapLabel(b,i);
  var t=0,did=false;
  b.addEventListener('pointerdown',function(e){
    did=false;var bar=$('i',b);bar.style.transition='width .55s linear';bar.style.width='100%';
    t=setTimeout(function(){
      did=true;var o={};DEFS.forEach(function(d){if(!d.sys)o[d.k]=P[d.k]});snaps[i]=o;store('grains.snaps.v1',snaps);
      snapLabel(b,i);toast('Stored snap '+(i+1))
    },550);
  });
  var end=function(){
    clearTimeout(t);var bar=$('i',b);if(bar){bar.style.transition='none';bar.style.width='0'}
    if(!did&&snaps[i]){pushUndo(true);Object.keys(snaps[i]).forEach(function(k){if(D[k])setParam(k,snaps[i][k],true)});readout('SNAP '+(i+1),'')}
  };
  b.addEventListener('pointerup',end);b.addEventListener('pointercancel',function(){clearTimeout(t);var bar=$('i',b);if(bar){bar.style.transition='none';bar.style.width='0'}});
  snapBox.appendChild(b);
});

