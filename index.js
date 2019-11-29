baseURL = 'http://localhost:3000/articles'
window.addEventListener('DOMContentLoaded', function (e) {
    const modal = document.querySelector('#modal');
    const modalClose = document.querySelector('#modal-close');
    const modalBack = document.querySelector('.modal-background');

    const modalTitle = document.querySelector('#modal-title');
    const modalImage = document.querySelector('#modal-image');
    const modalDescription = document.querySelector('#modal-description');
    const modalSource = document.querySelector('#modal-source');
    const thumbSize = 64;

    [modalClose, modalBack].forEach((element) => {
        element.addEventListener('click', function (e) {
            document.documentElement.classList.remove('is-clipped');
            modal.classList.remove('is-active');
        });
    })
    fetchArticles();
    function fetchArticles() {
        fetch(baseURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(showArticles)
    }

    function showArticles(articles) {
        const div = document.querySelector('#images');
        for (const article of articles) {
            div.appendChild(makeACard(article));
        }
    }

    function makeACard(article) {
        if (!article.url_to_image)
            article.url_to_image = 'undefined.jpg';

        const divCard = document.createElement('div');
        divCard.className = "card is-inline-flex";

        const divImage = document.createElement('div');
        divImage.className = "card-image";

        const figure = document.createElement('figure');
        figure.className = "image";
        // figure.style = ""

        const a = document.createElement('a');
        a.className = "modal-button";
        a.setAttribute("data-target", "modal")
        a.addEventListener('click', function (e) {
            console.log('clicked');
            updateModal(article);
        });
        img = document.createElement('img');
        // img.style = ('object-fit:cover;width:256px;height: 256px;')
        img.style = (`object-fit:cover;width:${thumbSize}px;height: ${thumbSize}px;`)
        img.src = article.url_to_image;
        a.appendChild(img);



        figure.appendChild(a);
        divImage.appendChild(figure);
        divCard.appendChild(divImage);

        return divCard;
    }

    function updateModal(article) {
        modalImage.src = article.url_to_image;
        modalDescription.innerText = article.description;
        modalSource.innerText = article.source_name;
        modalTitle.innerText = article.title;
        modalTitle.href = article.url;
        document.documentElement.classList.add('is-clipped');
        modal.classList.add('is-active');
    }

});