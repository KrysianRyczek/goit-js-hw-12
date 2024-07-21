var h=Object.defineProperty;var y=(e,t,a)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var m=(e,t,a)=>(y(e,typeof t!="symbol"?t+"":t,a),a);import{S as b,i as d,a as f}from"./vendor-f144e563.js";const s=document.querySelector("#search-image-form");class x{constructor(t){m(this,"param",{q:"",key:"44950793-df63a62bcd1fce85415b89ba5",image_type:"photo",orientation:"horizontal",safesearch:!0,url:"https://pixabay.com/api/",pageindex:1,limit:40,totalHits:0});this.param.q=t}set pageNumber(t){this.param.pageindex=t}set maxHits(t){this.param.totalHits=t}get hits(){return this.param.totalHits}get limit(){return this.param.limit}get addres(){return this.param.url+"?key="+this.param.key+"&q="+this.param.q+"&image_type="+this.param.image_type+"&orientation="+this.param.orientation+"&safesearch="+this.param.safesearch+"&page="+this.param.pageindex+"&per_page="+this.param.limit}}const q=({webformatURL:e,largeImageURL:t,tags:a,likes:o,views:u,comments:g,downloads:p,...C})=>{const n=document.createElement("li");return n.classList.add("gallery-item"),n.innerHTML=`<a class="gallery-link" href="${t}">
            <img 
                class="gallery-image" 
                src="${e}" 
                alt="${a}"
                titel="oooo" 
            />
            <div class="box">
                <div class="box-item">
                    <h3>Likes</h3>
                    <p id="likes">${o}</p>
                </div>
                <div class="box-item">
                    <h3>Views</h3>
                    <p id="views">${u}</p>
                </div>
                <div class="box-item">
                    <h3>Comments</h3>
                    <p id="comments">${g}</p>
                </div>
                <div class="box-item">
                    <h3>Downloads</h3>
                    <p id="downloads">${p}</p>
                </div>
            </div>
        </a>`,n},S=e=>{const t=e.map(q),a=document.createDocumentFragment();return a.append(...t),a},v=(e,t)=>{document.querySelector(e).appendChild(S(t))},w=e=>{document.querySelector(e).insertAdjacentHTML("afterend",`<div class="btnBox">
                                                <button id="btnNext" class="btnNext"><< Loade Next Image >></button>
                                                </div>`)},N=async e=>(await f.get(e.addres)).data,L=new b("ul.gallery>li>a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlay:!0});let i,r,l,c;window.addEventListener("click",e=>{if(e.target.id==="submit"||e.target.id==="btnNext"){if(e.preventDefault(),e.target.id==="submit"&s.querySelector("#img").value.trim()===""){document.querySelector("#mesage")===null&&s.insertAdjacentHTML("afterend",'<p id="mesage" class="message">Form field must be filled in!</p>');return}if(e.target.id==="submit"&&(i=1,r=new x(s.querySelector("#img").value.trim(),i)),document.querySelector("#mesage")!==null&&document.querySelector("#mesage").remove(),e.target.id==="btnNext"&&(i=i+1,r.pageNumber=i,document.querySelectorAll("#gallery>li").length+r.limit>r.hits))return d.warning({close:!1,position:"topCenter",progressBar:!1,backgroundColor:"lightblue",messageColor:"white",timeout:5e3,message:"Sorry, there are no images matching your search query. Please try again!",transitionOut:"fadeOutUp"});e.target.id==="submit"&document.querySelector("#gallery").hasChildNodes()&&(document.querySelectorAll("#gallery > li").forEach(o=>o.remove()),document.querySelector("#btnNext").remove());const t=document.querySelector("#loader");t.classList.add("loader"),e.target.id==="btnNext"&&(l=document.querySelector("#btnNext"),c=l.getBoundingClientRect().y-40),N(r).then(a=>{if(t.classList.remove("loader"),a.total===0)return d.error({close:!1,position:"topCenter",progressBar:!1,backgroundColor:"red",messageColor:"white",timeout:5e3,message:"Sorry, there are no images matching your search query. Please try again!",transitionOut:"fadeOutUp"});v("ul.gallery",a.hits),L.refresh(),document.querySelector("#btnNext")==null&&w("ul.gallery"),e.target.id==="submit"&&(s.reset(),r.maxHits=a.totalHits,l=document.querySelector("#gallery"),c=l.getBoundingClientRect().y-20),window.scrollBy({top:c,behavior:"smooth"})}).catch(a=>{t.classList.remove("loader"),console.log(a)})}});
//# sourceMappingURL=search-image-2edc44e3.js.map
