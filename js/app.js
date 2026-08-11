const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));

document.querySelector('#back-to-top').addEventListener('click',event=>{
  event.preventDefault();
  window.scrollTo({top:0,left:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});

document.querySelectorAll('[role="tablist"]').forEach(tablist=>{
  const tabs=[...tablist.querySelectorAll('[role="tab"]')];
  const activate=tab=>{
    tabs.forEach(item=>{const selected=item===tab;item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!selected});
  };
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(tab));
    tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%tabs.length;else next=(index-1+tabs.length)%tabs.length;activate(tabs[next]);tabs[next].focus()});
  });
});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
