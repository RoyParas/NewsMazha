const API_KEY="**********"; //Replace **** with API Key by generating from NewsAPI
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("World"));

const company= document.getElementById('company-logo');
company.addEventListener('click', ()=>{
    window.location.reload();
})

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer=document.getElementById('cards-container');
    const template=document.getElementById('template-news-card');

    cardsContainer.innerHTML="";
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=template.content.cloneNode(true);
        fillData(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article) {
    const newsImg= cardClone.querySelector('#news-img');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDesc= cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank")
    });
}

let curSelectedNav=null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchButton.addEventListener("click", ()=>{
    const query= searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});

searchText.addEventListener("keypress", (event)=>{
    const query= searchText.value;
    if (event.key==="Enter") {
        if(!query) {
            searchText.blur();
            return
        }
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
        searchText.blur();  //  Unselect (blur) the input field
    }
});
