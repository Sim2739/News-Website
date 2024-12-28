const API_Key= "0e5f457bacbf4207a3cc065a8a98c826";
const url= "https://newsapi.org/v2/everything?q=";

window.addEventListener( 'load', () => fetchNews("India"));

async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCard = document.getElementById('news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardClone = newsCard.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    } );
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })



}