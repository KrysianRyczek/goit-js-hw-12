// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast"; 
import axios from "axios"; 
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-image-form")

class URL {
    
    constructor(q) {
      this.param.q = q;
    }

    param = {
        q:"",
        key: "44950793-df63a62bcd1fce85415b89ba5",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        url: "https://pixabay.com/api/",
        pageindex: 1,
        limit: 40,
        totalHits:0,
    }
    set pageNumber(newPageIndex) {
        this.param.pageindex =newPageIndex
      }
      set maxHits(currenttotalHits) {
        this.param.totalHits =currenttotalHits
      }
    get hits(){
        return this.param.totalHits
    }
    get limit(){
        return this.param.limit
    }
    get addres() {
        return this.param.url+"?key="+this.param.key+"&q="+this.param.q+"&image_type="
                +this.param.image_type+"&orientation="+this.param.orientation
                +"&safesearch="+this.param.safesearch+"&page="+this.param.pageindex+"&per_page="+this.param.limit;
      }
}

const createImage = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, ...otherProps })=>{
    const li= document.createElement("li")
    li.classList.add("gallery-item")
    li.innerHTML=
        `<a class="gallery-link" href="${largeImageURL}">
            <img 
                class="gallery-image" 
                src="${webformatURL}" 
                alt="${tags}"
                titel="oooo" 
            />
            <div class="box">
                <div class="box-item">
                    <h3>Likes</h3>
                    <p id="likes">${likes}</p>
                </div>
                <div class="box-item">
                    <h3>Views</h3>
                    <p id="views">${views}</p>
                </div>
                <div class="box-item">
                    <h3>Comments</h3>
                    <p id="comments">${comments}</p>
                </div>
                <div class="box-item">
                    <h3>Downloads</h3>
                    <p id="downloads">${downloads}</p>
                </div>
            </div>
        </a>`
    return li
}
const initImages = (images) => {
    const imgs = images.map(createImage);
    const fragment = document.createDocumentFragment();
    fragment.append(...imgs)
    return fragment
}

const main = (root, images) =>{
    const galleryRoot = document.querySelector(root)
    galleryRoot.appendChild(initImages(images))                                                
}
const createBtnNext = (root) =>{
    const galleryRoot = document.querySelector(root)
    galleryRoot.insertAdjacentHTML("afterend", `<div class="btnBox">
                                                <button id="btnNext" class="btnNext"><< Loade Next Image >></button>
                                                </div>`
                                                )                                              
}

const galleryImage = async (url) => {
    const response = await axios.get(url.addres);
    return response.data;
};

const lightbox = new SimpleLightbox('ul.gallery>li>a', { 
    captions: true,
    captionType: "attr",
    captionsData:"alt",
    captionPosition: 'bottom',
    captionDelay: 250,
    overlay: true,
 });

//form.addEventListener("submit", event => {
    let newPageIndex;
    let url;
    let elem;
    let rect;

window.addEventListener("click", event => {
    if (event.target.id==="submit" || event.target.id==="btnNext"){
        event.preventDefault();

        if (event.target.id==="submit" & form.querySelector("#img").value.trim() === "") {
            if (document.querySelector("#mesage") === null) 
                form.insertAdjacentHTML("afterend", 
                                        `<p id="mesage" class="message">Form field must be filled in!</p>`);
            return
        }
        if (event.target.id==="submit") {
            newPageIndex=1
            url = new URL(form.querySelector("#img").value.trim(), newPageIndex)
        }
        if (document.querySelector("#mesage") !== null) 
            document.querySelector("#mesage").remove();

        if (event.target.id==="btnNext"){
            newPageIndex=newPageIndex+1
            url.pageNumber = newPageIndex
            
            if(document.querySelectorAll("#gallery>li").length + url.limit > url.hits) {
                return iziToast.warning({
                    close: false,
                    position:'topCenter',
                    progressBar: false,
                    backgroundColor: 'lightblue',
                    messageColor: 'white',
                    timeout: 5000,
                    message:"Sorry, there are no images matching your search query. Please try again!",
                    transitionOut:'fadeOutUp',
                    })
            }
        }
            
        if (event.target.id==="submit" & document.querySelector("#gallery").hasChildNodes()) {
            const childs = document.querySelectorAll("#gallery > li");
            childs.forEach(child => child.remove());
            document.querySelector("#btnNext").remove();
        }
        
        const loader = document.querySelector("#loader")
        loader.classList.add("loader")
        
        if (event.target.id==="btnNext"){
            elem = document.querySelector("#btnNext");
            rect = elem.getBoundingClientRect().y - 40;
        }   

       
        galleryImage(url)
                .then(
                    image => {
                            loader.classList.remove("loader")
                            if (image.total===0) return iziToast.error({
                                                                    close: false,
                                                                    position:'topCenter',
                                                                    progressBar: false,
                                                                    backgroundColor: 'red',
                                                                    messageColor: 'white',
                                                                    timeout: 5000,
                                                                    message:"Sorry, there are no images matching your search query. Please try again!",
                                                                    transitionOut:'fadeOutUp',
                                                                    })




                                                                    
                            main("ul.gallery",image.hits)
                            lightbox.refresh()
                            const btn=  document.querySelector("#btnNext") 
                            if (btn== null) createBtnNext("ul.gallery")
                            if (event.target.id==="submit"){
                                form.reset();
                                url.maxHits = image.totalHits
                                elem = document.querySelector("#gallery");
                                rect = elem.getBoundingClientRect().y -20;
                            } 

                            window.scrollBy({
                                top:rect,
                                behavior: "smooth",
                            });



                             
                })
            .catch(error => {
                                loader.classList.remove("loader")
                                console.log(error)
                            });   
    }


    // if (event.target.id==="btnNext"){
    //     newPageIndex=newPageIndex+1

    //     const url = new URL(imgTitle)
    //     url.pageNumber = newPageIndex
    //     console.log(url)
    //     galleryImage(url)
    //     .then(
    //         image => {
    //                 main("ul.gallery",image.hits)
                    
    //             //     const lightbox = new SimpleLightbox('ul.gallery>li>a', { 
    //             //      captions: true,
    //             //      captionType: "attr",
    //             //      captionsData:"alt",
    //             //      captionPosition: 'bottom',
    //             //      captionDelay: 250,
    //             //      overlay: true,
    //             //   });
    //               galleryImage.lightbox.refresh() 

    //     })
    //   .catch(error => {
    //                     console.log(error)
    //                   })}





    // })
    // window.addEventListener("hover", event => {

    

    // // if(event.target.id==="gallery"){
    // //                     console.log("dupa")
    // //                     const lightbox = new SimpleLightbox('ul.gallery>li>a', { 
    // //                         captions: true,
    // //                         captionType: "attr",
    // //                         captionsData:"alt",
    // //                         captionPosition: 'bottom',
    // //                         captionDelay: 250,
    // //                         overlay: true,
    // //                     });
    // //                     lightbox.refresh()
    // //                 }

    })