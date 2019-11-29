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
        // img.width = 256;
        // img.height = 256;s
        img.src = article.url_to_image;
        a.appendChild(img);

        // a.appendChild(imageCanvas(article.url_to_image));

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

    function imageCanvas(url) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        ctx.canvas.width = 196;
        ctx.canvas.height = 196;

        const img = new Image();
        img.onload = (event) => {
            let imgSize = Math.min(img.width, img.height);
            // The following two lines yield a central based cropping.
            // They can both be amended to be 0, if you wish it to be
            // a left based cropped image.
            let left = (img.width - imgSize) / 2;
            let top = (img.height - imgSize) / 2;
            //var left = 0; // If you wish left based cropping instead.
            //var top = 0; // If you wish left based cropping instead.
            ctx.drawImage(event.target, left, top, imgSize, imgSize, 0, 0, ctx.canvas.width, ctx.canvas.height);
        };

        img.src = url;

        return ctx.canvas
    }


    // var rootEl = document.documentElement;
    // var $modals = getAll('.modal');
    // var $modalButtons = getAll('.modal-button');
    // var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

    // if ($modalButtons.length > 0) {
    //     console.log($modalButtons);
    //     $modalButtons.forEach(function ($el) {
    //         $el.addEventListener('click', function () {
    //             var target = $el.dataset.target;
    //             openModal(target);
    //         });
    //     });
    // }

    // if ($modalCloses.length > 0) {
    //     $modalCloses.forEach(function ($el) {
    //         $el.addEventListener('click', function () {
    //             closeModals();
    //         });
    //     });
    // }

    // function openModal(target) {
    //     var $target = document.getElementById(target);
    //     rootEl.classList.add('is-clipped');
    //     $target.classList.add('is-active');
    // }

    // function closeModals() {
    //     rootEl.classList.remove('is-clipped');
    //     $modals.forEach(function ($el) {
    //         $el.classList.remove('is-active');
    //     });
    // }
    // function getAll(selector) {
    //     return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    // }

    // document.addEventListener('keydown', function (event) {
    //     var e = event || window.event;
    //     if (e.keyCode === 27) {
    //         closeModals();
    //         closeDropdowns();
    //     }
    // });
});