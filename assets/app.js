(function(){var cur=document.querySelector('.nav a[aria-current]');if(cur&&cur.scrollIntoView&&cur.parentNode.scrollWidth>cur.parentNode.clientWidth){cur.parentNode.scrollLeft=Math.max(0,cur.offsetLeft-60)}})();
(function(){
  var q=document.getElementById('q'); if(!q) return;
  var count=document.querySelector('.search-count');
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var terms=function(v){return v.toLowerCase().trim().split(/\s+/).filter(Boolean)};
  if(q.dataset.target==='home'){
    var idx=window.TM_INDEX||[],res=document.getElementById('results'),g=document.getElementById('results-grid'),empty=res.querySelector('.empty');
    var hide=[document.getElementById('new'),document.getElementById('collections'),document.getElementById('about')];
    q.addEventListener('input',function(){
      var t=terms(q.value);
      if(!t.length){res.hidden=true;hide.forEach(function(e){e.hidden=false});count.textContent='';return}
      var m=idx.filter(function(d){return t.every(function(w){return d[5].indexOf(w)>-1})});
      res.hidden=false;hide.forEach(function(e){e.hidden=true});
      count.textContent=m.length+' design'+(m.length===1?'':'s')+' found';empty.hidden=m.length>0;
      g.innerHTML=m.slice(0,120).map(function(d){var main=d[2]||d[3];return '<article class="card"><a class="card-img" href="'+esc(main)+'" target="_blank" rel="noopener"><img src="'+esc(d[1])+'" width="600" height="600" loading="lazy" alt="'+esc(d[0])+' t-shirt design by True Motion Apparel"></a><div class="card-body"><p class="card-col">'+esc(d[4])+'</p><h3 class="card-title">'+esc(d[0])+'</h3><div class="card-btns">'+(d[2]?'<a class="btn btn-rb" href="'+esc(d[2])+'" target="_blank" rel="noopener">Buy on Redbubble</a>':'')+(d[3]?'<a class="btn btn-tp" href="'+esc(d[3])+'" target="_blank" rel="noopener">Buy on TeePublic</a>':'')+'</div></div></article>'}).join('');
    });
    return;
  }
  var cards=[].slice.call(document.querySelectorAll('.grid .card')),empty=document.querySelector('main .empty'),filt='';
  function apply(){var t=terms(q.value),n=0;cards.forEach(function(c){var ok=t.every(function(w){return c.dataset.k.indexOf(w)>-1})&&(!filt||(' '+c.dataset.c+' ').indexOf(' '+filt+' ')>-1);c.hidden=!ok;if(ok)n++});
    count.textContent=(t.length||filt)?n+' design'+(n===1?'':'s'):'';if(empty)empty.hidden=n>0;
    [].forEach.call(document.querySelectorAll('.hol'),function(s){var any=s.querySelector('.card:not([hidden])');s.hidden=!!(t.length&&!any)})}
  q.addEventListener('input',apply);
  [].forEach.call(document.querySelectorAll('.chip'),function(b){b.addEventListener('click',function(){
    [].forEach.call(document.querySelectorAll('.chip'),function(x){x.classList.remove('on')});b.classList.add('on');filt=b.dataset.f;apply()})});
})();
