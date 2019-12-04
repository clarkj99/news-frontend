class Article {
    constructor(article) {
        this.id = article.id;
        this.source_name = article.source_name;
        this.title = article.title;
        this.description = article.description;
        this.url = article.url;
        this.url_to_image = article.url_to_image;
        this.content = article.content;
    }

    renderImage() {
        const element = 'document'.createElement(div);
        element.className = "card is-inline-flex";
        element.dataset.aos = "zoom-in-up";

        const divImage = document.createElement('div');
        divImage.className = "card-image";

        const figure = document.createElement('figure');
        figure.className = "image";

        const a = document.createElement('a');
        a.className = "modal-button";

        const img = document.createElement('img');
        img.setAttribute("data-article-id", this.id)
        img.className = "article-image"
        img.setAttribute("style", `object-fit: cover; width: ${thumbWidth}px; height: ${thumbHeight}px; `)
        img.src = this.url_to_image;
        a.appendChild(img);

        figure.appendChild(a);
        divImage.appendChild(figure);
        element.appendChild(divImage);

        return element;
    }

}