baseURL = 'http://localhost:3000/articles/'
categoriesURL = 'http://localhost:3000/categories/'
window.addEventListener('DOMContentLoaded', function (e) {

    const modal = document.querySelector('#modal');
    const modalClose = document.querySelector('#modal-close');
    const modalBack = document.querySelector('.modal-background');

    const modalTitle = document.querySelector('#modal-title');
    const modalImage = document.querySelector('#modal-image');
    const modalDescription = document.querySelector('#modal-description');
    const modalSource = document.querySelector('#modal-source');
    const modalCategory = document.querySelector('#modal-category');
    const modalDate = document.querySelector('#modal-date');
    const photosDiv = document.querySelector('#images');
    const navbarDiv = document.querySelector('#categories');

    const thumbWidth = 227;
    const thumbHeight = 128;

    AOS.init(); //Appear on Scroll

    addListeners();

    fetchCategories();

    fetchArticles();

    function addListeners() {
        [modalClose, modalBack].forEach((element) => {
            element.addEventListener('click', function (e) {
                document.documentElement.classList.remove('is-clipped');
                modal.classList.remove('is-active');
            });
        })

        photosDiv.addEventListener('click', function (e) {
            if (e.target.className == 'article-image') {
                fetch(`${baseURL}${e.target.dataset.articleId}`)
                    .then(res => res.json())
                    .then(article => {
                        if (!article.url_to_image)
                            article.url_to_image = 'undefined.jpg';
                        updateModal(article);
                    })
            }
        })

        navbarDiv.addEventListener('click', function (e) {
            if (e.target.className.includes('category-button')) {
                fetchCategory(e.target.dataset.categoryId)
            }
        })
    }

    function fetchCategories() {
        fetch(categoriesURL)
            .then(res => res.json())
            .then(showNavbar)
    }

    function showNavbar(categories) {
        for (const category of categories) {
            navbarDiv.appendChild(makeCategoryButton(category));
        }
    }

    function fetchCategory(categoryId) {
        fetch(`${categoriesURL}${categoryId}`)
            .then(res => res.json())
            .then(category => {
                showArticles
            })
    }

    function makeCategoryButton(category) {
        const a = document.createElement('a');
        a.className = "navbar-item category-button";
        a.innerText = category.name
        a.setAttribute("data-category-id", category.id)
        return a
    }

    function fetchArticles() {
        fetch(baseURL)
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

        divCard.setAttribute("data-aos", "zoom-in")
        divCard.setAttribute("data-aos-mirror", "true")
        divCard.setAttribute("data-aos-offset", (thumbHeight * 2).toString())

        const divImage = document.createElement('div');
        divImage.className = "card-image";

        const figure = document.createElement('figure');
        figure.className = "image";
        // figure.style = ""

        const a = document.createElement('a');
        a.className = "modal-button";

        // a.addEventListener('click', function (e) {
        //     console.log('clicked');
        //     updateModal(article);
        // });
        img = document.createElement('img');
        img.setAttribute("data-article-id", article.id)
        img.className = "article-image"
        // img.style = ('object-fit:cover;width:256px;height: 256px;')
        img.setAttribute("style", `object-fit: cover; width: ${thumbWidth}px; height: ${thumbHeight}px; `)
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
        modalCategory.innerText = article.category.name;
        modalDate.innerText = article.published_at;
        modalTitle.innerText = article.title;
        modalTitle.href = article.url;
        document.documentElement.classList.add('is-clipped');
        modal.classList.add('is-active');
    }

});