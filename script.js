const newSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
    <g id="stars">
        <g id="star-front">
            <path id="Star 1"
                d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                fill="#C4C4C4" stroke="black" stroke-width="1.5" />
        </g>
        <g id="star-back">
            <path id="Star 2"
                d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                fill="#C4C4C4" stroke="black" stroke-width="1.5" />
        </g>
    </g>
</svg>
`
const newSVGPattern = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <defs>
            <linearGradient id="grad-full" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#C31F97" />
                <stop offset="100%" stop-color="#5090E7" />
            </linearGradient>
            <linearGradient id="grad-specific" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#fff" stop-opacity="0"  />
                <stop offset="50%" stop-color="#fff" stop-opacity="0" />
                <stop offset="51%" stop-color="#fff" stop-opacity="1" />
            </linearGradient>
        </defs>
        <g xmlns="http://www.w3.org/2000/svg" id="stars">
            <g id="star-back">
                <path id="Star 1"
                    d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                    fill="url(#grad-full)"  />
            </g>
            <g id="star-front">
                <path id="Star 2"
                    d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                    fill="url(#grad-specific)" 
                    stroke="url(#grad-full)" 
                    stroke-width="2" />
            </g>
        </g>
    </svg>
`

class Star {
    constructor() { }
    _getSVG({ fillStrocke, fillFront, fillBack, percent }) {
        return (`
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 40 40">
            <defs>
                <linearGradient id="grad-full" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#C31F97" />
                    <stop offset="100%" stop-color="#5090E7" />
                </linearGradient>
                ${percent ? (`
                    <linearGradient id="grad-specific" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#fff" stop-opacity="0"  />
                        <stop offset="${percent}%" stop-color="#fff" stop-opacity="0" />
                        <stop offset="${percent + 1}%" stop-color="#fff" stop-opacity="1" />
                    </linearGradient>
                `) : ''}
            </defs>
            <g id="stars">
                <g id="star-back">
                    <path id="Star 1"
                        d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                        fill="${fillBack}"  />
                </g>
                <g id="star-front">
                    <path id="Star 2"
                        d="M20 2.54029L24.0048 15.5001L24.1681 16.0286H24.7214H37.7828L27.184 24.1254L26.7683 24.443L26.9228 24.9428L30.9513 37.9795L20.4553 29.9613L20 29.6135L19.5447 29.9613L9.04867 37.9795L13.0772 24.9428L13.2317 24.443L12.816 24.1254L2.21722 16.0286H15.2786H15.8319L15.9952 15.5001L20 2.54029Z"
                        fill="${fillFront}" 
                        stroke="${fillStrocke}" 
                        stroke-width="2" />
                </g>
            </g>
        </svg>
        `);
    }
    getEmptyStar() {
        return this._getSVG({
            fillStrocke: "#E0E0E0",
            fillFront: "#fff",
            fillBack: "none",
        });
    }
    getFullStar() {
        return this._getSVG({
            fillStrocke: "url(#grad-full)",
            fillFront: "none",
            fillBack: "url(#grad-full)",
        });
    }
    getSpecificStar(percent) {
        return this._getSVG({
            fillStrocke: "url(#grad-full)",
            fillFront: "url(#grad-specific)",
            fillBack: "url(#grad-full)",
            percent
        });
    }
}

class StarRating extends HTMLElement {
    constructor() {
        super();
        this._starSVG = new Star();
        this._stars = [];
        this._starContainer = null;
        this.initialize();
        this.draw(this.rating);
    };
    get count() { return this._count }
    get rating() { return this._rating }
    get editMode() { return this._editMode }
    get gap() { return this._gap }
    set count(value) { this._count = value }
    set rating(value) { this._rating = value }
    set editMode(value) {
        if (value === "true") {
            this._editMode = true;
        }
        else if (value === "false") {
            this._editMode = false;
        } else {
            throw new Error("Uknown value of HTML Element <star-rating> attribute 'edit-mode'. This attribute value should be either 'true' or 'false'");
        }
    }
    set gap(value) {
        this._gap = !!value && !!parseInt(value) ? value : "0";
    }
    initialize() {
        const stars = parseInt(this.getAttribute("stars"));
        const rating = parseFloat(this.getAttribute("rating"));
        const editMode = this.getAttribute("edit-mode");
        const gap = this.getAttribute("gap");
        this.count = stars ? stars : 5;
        this.rating = rating ? rating : 0;
        this.editMode = editMode;
        this.gap = gap;

        const starContainer = document.createElement("div");
        starContainer.classList.add("star-rating-container");
        this.style.padding = `${this._consts.PADDING_OUT}px`;
        this.append(starContainer);
        this._starContainer = starContainer;

        if (this.editMode) {
            this.rating = 0;
            this.addMouseListeners();
            this.classList.add("edit");
        };
    }
    fill(index) {
        this._stars = [];
        for (let i = 0; i < this.count; i++) {

            const integer = Math.trunc(index);
            const rest = (index - Math.trunc(index));
            const sin = Math.asin(2 * rest - 1) / Math.PI + 0.5;
            const percent = Math.round(sin * 100);

            const star = document.createElement('div');
            star.classList.add('star');
            star.style.paddingLeft = `${this.gap / 2}px`;
            star.style.paddingRight = `${this.gap / 2}px`;

            if (i < integer) {
                star.innerHTML = this._starSVG.getFullStar();
            }
            else if (i === integer) {
                if (index === integer) {
                    star.innerHTML = this._starSVG.getEmptyStar();
                } else {
                    star.innerHTML = this._starSVG.getSpecificStar(percent);
                }
            } else {
                star.innerHTML = this._starSVG.getEmptyStar();
            };
            this._stars.push(star);
        };
    }
    render() {
        if (this.count === 0) return this;
        this.clear();
        for (let i = 0; i < this._stars.length; i++) {
            this._starContainer.append(this._stars[i]);
        };
    }
    clear() { this._starContainer.innerHTML = '' }
    draw(index) {
        this.fill(index);
        this.render();
    }
    addMouseListeners() {
        this._starContainer.addEventListener('mousemove', this._handlers.handleMouseMove);
        this.addEventListener("mouseleave", this._handlers.handleMouseLeave);
    }
    removeMouseListeners() {
        this._starContainer.removeEventListener('mousemove', this._handlers.handleMouseMove);
        this._starContainer.removeEventListener("mouseleave", this._handlers.handleMouseLeave);
    }
    _handlers = {
        handleMouseMove: e => {
            const box = this._starContainer.getBoundingClientRect();
            const starIndex = Math.ceil((e.pageX - box.left - this._consts.KORRECTOR) / (box.width) * this._stars.length);
            this.draw(starIndex);
        },
        handleMouseLeave: () => this.draw(0),
    }
    _consts = {
        KORRECTOR: 5,
        PADDING_OUT: 10,
    }
};
window.customElements.define('star-rating', StarRating);


