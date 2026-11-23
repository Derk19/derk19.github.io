/* GoatCounter — cookieless, no ads.
   Site code: truemotionapparel
   Dashboard: https://truemotionapparel.goatcounter.com/
   TeePublic clicks are counted as events at /out/<design-slug>.
   GoatCounter ignores localhost and 127.0.0.1, so local previews do not count. */
(function(){
  var ENDPOINT="https://truemotionapparel.goatcounter.com/count";
  if(!ENDPOINT||ENDPOINT.indexOf("YOUR_CODE")!==-1)return;
  var s=document.createElement("script");
  s.async=true;
  s.src="https://gc.zgo.at/count.js";
  s.dataset.goatcounter=ENDPOINT;
  document.head.appendChild(s);
  document.addEventListener("click",function(e){
    var a=e.target&&e.target.closest?e.target.closest("a[href]"):null;
    if(!a||a.href.indexOf("teepublic.com")===-1)return;
    if(!window.goatcounter||typeof goatcounter.count!=="function")return;
    var camp="teepublic";
    try{
      var u=new URL(a.href);
      camp=u.searchParams.get("utm_campaign")||u.pathname.replace(/^\//,"");
    }catch(err){}
    goatcounter.count({path:"/out/"+camp,title:"TeePublic click",event:true});
  });
})();
(function(){var cur=document.querySelector('.nav a[aria-current]');if(cur&&cur.scrollIntoView&&cur.parentNode.scrollWidth>cur.parentNode.clientWidth){cur.parentNode.scrollLeft=Math.max(0,cur.offsetLeft-60)}})();
(function(){
  function withUtm(url,img){
    if(!url)return "";
    if(url.indexOf("utm_source=")!==-1)return url;
    var slug="design",m=String(img||"").match(/\/([^\/.?#]+)\.[a-z0-9]+(?:$|[?#])/i);
    if(m)slug=m[1].replace(/-ig$/,"");
    var hash="",base=url,hi=url.indexOf("#");
    if(hi>=0){hash=url.slice(hi);base=url.slice(0,hi)}
    return base+(base.indexOf("?")>=0?"&":"?")+"utm_source=truemotionapparel&utm_medium=site&utm_campaign="+encodeURIComponent(slug)+hash;
  }
  var q=document.getElementById('q'); if(!q) return;
  var count=document.querySelector('.search-count');
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var terms=function(v){return v.toLowerCase().trim().split(/\s+/).filter(Boolean)};
  if(q.dataset.target==='home'){
    var idx=window.TM_INDEX||[],res=document.getElementById('results'),g=document.getElementById('results-grid'),empty=res.querySelector('.empty');
    var hide=[document.getElementById('new'),document.getElementById('worn'),document.getElementById('collections'),document.getElementById('about'),document.getElementById('newest-tees')].filter(Boolean);
    q.addEventListener('input',function(){
      var t=terms(q.value);
      if(!t.length){res.hidden=true;hide.forEach(function(e){e.hidden=false});count.textContent='';return}
      var m=idx.filter(function(d){return t.every(function(w){return d[4].indexOf(w)>-1})});
      res.hidden=false;hide.forEach(function(e){e.hidden=true});
      count.textContent=m.length+' design'+(m.length===1?'':'s')+' found';empty.hidden=m.length>0;
      g.innerHTML=m.slice(0,120).map(function(d){var tp=withUtm(d[2]||'',d[1]);var img='<img src="'+esc(d[1])+'" width="600" height="600" loading="lazy" alt="'+esc(d[0])+' t-shirt design by True Motion Apparel">';var pic=tp?'<a class="card-img" href="'+esc(tp)+'" target="_blank" rel="noopener">'+img+'</a>':'<span class="card-img">'+img+'</span>';var btn=tp?'<a class="btn btn-tp" href="'+esc(tp)+'" target="_blank" rel="noopener">Buy on TeePublic</a>':'';return '<article class="card">'+pic+'<div class="card-body"><p class="card-col">'+esc(d[3])+'</p><h3 class="card-title">'+esc(d[0])+'</h3><div class="card-btns">'+btn+'</div></div></article>'}).join('');
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
(function(){
  document.querySelectorAll("[data-count]").forEach(function(el){
    var sel=el.getAttribute("data-count");
    if(!sel)return;
    var n=document.querySelectorAll(sel).length;
    if(n)el.textContent=String(n);
  });
  var n=document.querySelectorAll("main article.card").length;
  if(!n)return;
  document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){
    try{
      var data=JSON.parse(s.textContent);
      if(data&&data["@type"]==="ItemList"&&typeof data.numberOfItems==="number"&&data.numberOfItems!==n){
        data.numberOfItems=n;
        s.textContent=JSON.stringify(data).replace(/</g,"\\u003c");
      }
    }catch(e){}
  });
})();

(function(){
  var vs=[].slice.call(document.querySelectorAll('.worn-media video'));if(!vs.length)return;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(rm){vs.forEach(function(v){v.removeAttribute('autoplay');v.pause()});return}
  if(!('IntersectionObserver' in window)){return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;
    if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else{v.pause()}})},{threshold:.35});
  vs.forEach(function(v){io.observe(v)});
})();
