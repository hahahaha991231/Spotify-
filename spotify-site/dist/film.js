(()=>{
const film=document.getElementById('desktop-film');let visible=false;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function sync(){if(reduced()||!visible||document.hidden)film.pause();else film.play().catch(()=>{})}
film.addEventListener('timeupdate',()=>{film.dataset.time=film.currentTime.toFixed(2);film.dataset.paused=String(film.paused);film.dataset.muted=String(film.muted)});
film.addEventListener('loadedmetadata',()=>{film.dataset.duration=film.duration.toFixed(2);film.dataset.dimensions=film.videoWidth+'x'+film.videoHeight});
film.addEventListener('error',()=>{document.getElementById('film-fallback').hidden=false});
new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync()},{threshold:.05}).observe(film);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
})();
