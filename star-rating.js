const defineStarRating = (function () {

    class Star {
        constructor({ size }) { 
            this.size = size
        }
        _getSVG({ fillStrocke, fillFront, fillBack, percent }) {
            return (`   

            <svg xmlns="http://www.w3.org/2000/svg" width="${this.size}" height="${this.size}" viewBox="0 0 80 80" fill="none">
                <defs>
                    <linearGradient id="grad-full" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#C31F97" />
                        <stop offset="100%" stop-color="#5090E7" />
                    </linearGradient>
                    ${percent !== undefined ? (`
                    <linearGradient id="grad-specific" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#fff" stop-opacity="0" />
                        <stop offset="${percent}%" stop-color="#fff" stop-opacity="0" />
                        <stop offset="${percent + 1}%" stop-color="#fff" stop-opacity="1" />
                    </linearGradient>
                    `) : ''}
                </defs>
                <g id="stars">
                    <g id="star_back">
                        <path id="Star 3"
                            d="M40 0L50.1099 26.0849L78.0423 27.6393L56.3582 45.3151L63.5114 72.3607L40 57.2L16.4886 72.3607L23.6418 45.3151L1.95774 27.6393L29.8901 26.0849L40 0Z"
                            fill="${fillBack}" />
                    </g>
                    <g id="star_front">
                        <path id="Star 4"
                            d="M40 2.76715L49.1775 26.4463L49.4105 27.0475L50.0543 27.0834L75.4105 28.4944L55.7263 44.54L55.2265 44.9474L55.3914 45.5708L61.8849 70.122L40.5419 56.3596L40 56.0101L39.4581 56.3596L18.1151 70.122L24.6086 45.5708L24.7735 44.9474L24.2737 44.54L4.58945 28.4944L29.9457 27.0834L30.5895 27.0475L30.8225 26.4463L40 2.76715Z"
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
        constructor(options) {
            super();
            this._options = options || {};
            this._starSVG = new Star({
                size: this._options.size
            });
            this._stars = [];
            this._starContainer = null;
            this.setAttribute("id", "custom-star-rating");
            this.initialize();
            this.draw();
        };
        get count() { return this._count }
        get rating() { return this._rating }
        get editMode() { return this._editMode }
        get gap() { return this._gap }
        set count(value) { this._count = value || 5 }
        set rating(value) { this._rating = value ? value > this.count ? this.count : value : 0 }
        set gap(value) { this._gap = !!value && !!parseInt(value) ? value : "0" }
        set editMode(value) {
            if (value === "true") {
                this._editMode = true;
            }
            else if (value === "false") {
                this._editMode = false;
            } else {
                throw new Error("Uknown provided option 'editMode'. It should be a srting and equal to either 'true' or 'false'");
            }
        }
        initialize() {
            const { stars: _stars, rating: _rating, gap: _gap, editMode: _editMode } = this._options;
            this.count = _stars;
            this.rating = _rating;
            this.gap = _gap;
            this.editMode = _editMode.toString();

            if (!this._starContainer) {
                const starContainer = document.createElement("div");
                starContainer.classList.add("star-rating-container");
                this.style.padding = `${this._consts.PADDING_OUT}px`;
                // this.append(starContainer);
                this._starContainer = starContainer;
            }
            if (this.editMode) {
                this.rating = 0;
                this.addMouseListeners();
                this.classList.add("edit");
            }
            if (!this.editMode) {
                this.removeMouseListeners()
                this.classList.remove("edit");
            }
        }
        fill() {
            this._stars = [];
            const rating = this.rating;
            for (let i = 0; i < this.count; i++) {

                const integer = Math.trunc(rating);
                const rest = (rating - Math.trunc(rating));
                const sin = rest;
                // const sin = (Math.asin(2 * rest - 1) / (0.5 * Math.PI) + 0.5);
                const percent = Math.round(sin * 100);

                const star = document.createElement('div');
                star.classList.add('star');
                star.style.marginLeft = `${this.gap / 2}px`;
                star.style.marginRight = `${this.gap / 2}px`;

                if (i < integer) {
                    star.innerHTML = this._starSVG.getFullStar();
                }
                else if (i === integer) {
                    if (rating === integer) {
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
            this.append(this._starContainer);
        }
        clear() { this._starContainer.innerHTML = '' }
        draw() {
            this.fill();
            this.render();
        }
        addMouseListeners() {
            this._starContainer.addEventListener("mousedown", this._handlers.handleMouseClick);
            this._starContainer.addEventListener('mousemove', this._handlers.handleMouseMove);
            this.addEventListener("mouseleave", this._handlers.handleMouseLeave);
        }
        removeMouseListeners() {
            this._starContainer.removeEventListener("mousedown", this._handlers.handleMouseClick);
            this._starContainer.removeEventListener('mousemove', this._handlers.handleMouseMove);
            this.removeEventListener("mouseleave", this._handlers.handleMouseLeave);
        }
        _handlers = {
            handleMouseMove: e => {
                const box = this._starContainer.getBoundingClientRect();
                const starIndex = (e.pageX - box.left) / (box.width) * this._stars.length;

                const starIndexInt = starIndex < this.count ? Math.trunc(starIndex) : this.count - 1;
                const svgBox = this._stars[starIndexInt].children[0].getBoundingClientRect();
                

                if (e.pageX >= svgBox.left && e.pageX <= svgBox.right) {
                    const rateingPerStar = (e.pageX - svgBox.left) / svgBox.width + starIndexInt;
                    const rounded = +(rateingPerStar.toFixed(3));
                    this.rating = rounded;
                    this.draw();
                    this.dispatchEvent(this._events.change);
                };
            },
            handleMouseLeave: () => {
                this.rating = 0;
                this.draw();
                this.dispatchEvent(this._events.change);
            },
            handleMouseClick: e => {
                const box = this._starContainer.getBoundingClientRect();
                const starIndex = (e.pageX - box.left) / (box.width) * this._stars.length;
                const rounded = +(starIndex.toFixed(3));
                this.rating = rounded;
                this._options = {
                    ...this._options,
                    rating: rounded,
                    editMode: false
                };
                this.initialize();
                this.draw();
                this.dispatchEvent(this._events.select);
            },
        }
        _events = {
            change: new Event("onChange",),
            select: new Event("onSelect"),
        }
        _consts = {
            PADDING_OUT: 10,
        }
    };
    customElements.define('star-rating', StarRating);

    return (options) => {
        const { ratingSelector, displaySelector } = options;
        if (!ratingSelector) throw new Error("Provided options do not contain option 'ratingSelector'");
        const wrapper = document.querySelector(ratingSelector);
        if (!wrapper) throw new Error("No HTML element was found with provided 'ratingSelector' option");
        const starRating = new StarRating(options);
        wrapper.innerHTML = "";
        wrapper.append(starRating);
        if (displaySelector) {
            const display = document.querySelector(displaySelector);
            if (!display) throw new Error("No HTML element was found with provided 'displaySelector' option");
            starRating.addEventListener("onChange", () => display.innerHTML = starRating.rating.toFixed(2));
            starRating.addEventListener("onSelect", () => display.innerHTML = starRating.rating.toFixed(2));
        }
        return {
            rating: starRating.rating,
            setEditMode: (value) => {
                starRating._options = {
                    ...starRating._options,
                    editMode: value.toString(),
                };
                starRating.initialize();
                starRating.draw();
                return starRating.editMode;
            },
            getEditMode: () => starRating.editMode,
        };
    }

})();