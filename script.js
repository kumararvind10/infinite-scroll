//load elements

let imageContainer = document.getElementById('image-container');
let loader = document.getElementById('loader');

let initialload = true;
//Unsplash api for getPhotos
let count = 5;
const apiKey = 'xjqVXBS8WecHN-u7NywipUrM3cCIN2uFjptJGM_o6E4'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//image loading
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
        initialload = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

function setAttributes(element, attributs) {
    for (const key in attributs) {
        element.setAttribute(key, attributs[key])
    }
}
//get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPhotos(data)
    }
    catch (error) {
        console.log('something went wrong', error);
    }
}

function displayPhotos(photosArray) {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('Total images', totalImages);
    for (let photo of photosArray) {

        //create <a> element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': "_blank"
        })
        //create img for photo
        const img = document.createElement('img')
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        })

        //load event 

        img.addEventListener('load', imageLoaded)
        //append img to <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    }

}

//load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = true;
    }
})

//load funtion
getPhotos();
