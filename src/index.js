baseURL = 'http://localhost:3000/'
articlesURL = 'http://localhost:3000/articles/'
categoriesURL = 'http://localhost:3000/categories/'
countriesURL = 'http://localhost:3000/countries/'

window.addEventListener('DOMContentLoaded', function (e) {
    const pageHeading = document.querySelector('#heading');
    const animaStyle = {
        in: 'tada', out: 'fadeOut'
    }
    const thumbWidth = 180;
    const thumbHeight = 90;
    let currentCategory = 0;
    let currentCountry = 0;

    AOS.init({
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: thumbHeight * 2, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: true, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    }); //Appear on Scroll

    addListeners();
    fetchCategories();
    fetchCountries();
    fetchArticles();

    function addListeners() {

        const modal = document.querySelector('#modal');
        const modalClose = document.querySelector('#modal-close');
        const modalBack = document.querySelector('.modal-background');
        const brand = document.querySelector('#brand');
        brand.addEventListener('click', function (e) {
            setCurrentCategory(0);
            setCurrentCountry(0);
            fetchArticles();
        });

        [modalClose, modalBack].forEach(function (element) {
            element.addEventListener('click', function (e) {
                animateCSS('.modal-card', animaStyle['out'], () => {
                    const modal = document.querySelector('#modal');
                    document.documentElement.classList.remove('is-clipped');
                    modal.classList.remove('is-active');
                });

            });
        })
    }

    function startSpinner() {
        const spinner = document.querySelector('#spinner');
        spinner.classList.add('is-active')
    }

    function stopSpinner() {
        const spinner = document.querySelector('#spinner');
        spinner.classList.remove('is-active')
    }

    function fetchArticle(articleId) {
        fetch(`${articlesURL}${articleId}`)
            .then(res => res.json())
            .then(article => {
                if (!article.url_to_image)
                    article.url_to_image = 'img/undefined.jpg';
                updateModal(article);
            })
    }

    function fetchCategories() {
        fetch(categoriesURL)
            .then(res => res.json())
            .then(showCategories)
    }

    function showCategories(categories) {
        const categoryElement = document.querySelector('#categories');
        for (const category of categories) {
            categoryElement.appendChild(makeCategoryButton(category));
        }

        categoryElement.addEventListener('click', function (e) {
            if (e.target.className.includes('category-button')) {
                setCurrentCategory(e.target.dataset.categoryId);
                fetchArticles();
            }
        })
    }

    function setCurrentCategory(id) {
        if (currentCategory) {
            let a = document.querySelector(`[data-category-id="${currentCategory}"]`);
            a.classList.remove('is-active');
        }
        if (id) {
            a = document.querySelector(`[data-category-id="${id}"]`);
            a.classList.add('is-active');
        }
        currentCategory = id;

    }

    function setCurrentCountry(id) {
        if (currentCountry) {
            let a = document.querySelector(`[data-country-id="${currentCountry}"]`);
            a.classList.remove('is-active');
        }
        if (id) {
            a = document.querySelector(`[data-country-id="${id}"]`);
            a.classList.add('is-active');
        }
        currentCountry = id;
    }

    function fetchArticles() {
        startSpinner();
        let url = baseURL;
        let headingText = "";

        switch (true) {
            case (currentCountry > 0 && currentCategory > 0):
                url += `countries/${currentCountry}/categories/${currentCategory}/articles/`;
                headingText = document.querySelector(`[data-country-id="${currentCountry}"]`).innerText + " " + document.querySelector(`[data-category-id="${currentCategory}"]`).innerText;
                break;
            case (currentCountry > 0):
                url += `countries/${currentCountry}/articles`;
                headingText = document.querySelector(`[data-country-id="${currentCountry}"]`).innerText;
                break;
            case (currentCategory > 0):
                url += `categories/${currentCategory}/articles`;
                headingText = document.querySelector(`[data-category-id="${currentCategory}"]`).innerText;
                break;
            default:
                url += 'articles/';
                headingText = "all articles";
        }

        fetch(url)
            .then(res => res.json())
            .then(articles => {
                pageHeading.innerText = `${headingText} :${articles.length}`;
                showArticles(articles);
                stopSpinner();
            })
    }

    function makeCategoryButton(category) {
        const div = document.createElement('div');
        div.className = "level-item";
        const a = document.createElement('a');
        a.className = "button is-link category-button";
        a.innerText = category.name
        a.setAttribute("data-category-id", category.id)
        div.appendChild(a)
        return div
    }

    function fetchCountries() {
        fetch(countriesURL)
            .then(res => res.json())
            .then(showCountries)
    }

    function showCountries(countries) {
        const countryElement = document.querySelector('#countries');
        for (const country of countries) {

            countryElement.appendChild(makeCountryButton(country))
        }

        countryElement.addEventListener('click', function (e) {
            if (e.target.className.includes('country-button')) {
                setCurrentCountry(e.target.dataset.countryId);
                fetchArticles();
            }
        })
    }
    function makeCountryButton(country) {
        const div = document.createElement('div');
        div.className = "level-item"
        const a = document.createElement('a');
        a.className = "button is-info country-button";
        a.innerText = country.name
        a.dataset.countryId = country.id

        div.appendChild(a)
        return div
    }

    function showArticles(articles) {
        const photosDiv = document.querySelector('#images');
        // const div = document.querySelector('#images');
        const div = document.createElement('div');
        div.className = "has-text-centered";
        div.id = "images";
        photosDiv.parentNode.replaceChild(div, photosDiv);

        for (const article of articles) {
            div.appendChild(makeACard(article));
        }
        div.addEventListener('click', function (e) {
            if (e.target.className == 'article-image') {
                fetchArticle(e.target.dataset.articleId)
            }
        })
        window.scrollTo({ top: 00, behavior: 'auto' });
    }

    function makeACard(article) {
        if (!article.url_to_image)
            article.url_to_image = 'img/undefined.jpg';

        const divCard = document.createElement('div');
        divCard.className = "card is-inline-flex";
        divCard.setAttribute("data-aos", "zoom-in-up")
        // divCard.setAttribute("data-aos-mirror", "true")
        // divCard.setAttribute("data-aos-offset", (thumbHeight * .5).toString())

        const divImage = document.createElement('div');
        divImage.className = "card-image";

        const figure = document.createElement('figure');
        figure.className = "image";
        // figure.style = ""

        const a = document.createElement('a');
        a.className = "modal-button";

        const img = document.createElement('img');
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
        const modalTitle = document.querySelector('#modal-title');
        const modalImage = document.querySelector('#modal-image');
        const modalDescription = document.querySelector('#modal-description');
        const modalSource = document.querySelector('#modal-source');
        const modalCategory = document.querySelector('#modal-category');
        const modalCountry = document.querySelector('#modal-country');
        const modalDate = document.querySelector('#modal-date');

        modalImage.src = article.url_to_image;
        modalDescription.innerText = article.content ? article.content : article.description;
        modalSource.innerText = article.source_name;
        modalCategory.innerText = article.category.name;
        modalCountry.innerText = article.country.name;
        // modalDate.innerText = article.published_at;
        modalTitle.innerText = article.title;
        modalTitle.href = article.url;
        document.documentElement.classList.add('is-clipped');
        modal.classList.add('is-active');
        animateCSS('.modal-card', animaStyle['in']);
    }

    function animateCSS(element, animationName, callback) {
        const node = document.querySelector(element)
        node.classList.add('animated', animationName)

        function handleAnimationEnd() {
            node.classList.remove('animated', animationName)
            node.removeEventListener('animationend', handleAnimationEnd)

            if (typeof callback === 'function') callback()
        }

        node.addEventListener('animationend', handleAnimationEnd)
    }
});