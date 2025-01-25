
import * as helpers from "../helpers.js";

export default class Swatch
{
    constructor(options)
    {
        this.color = options.color;
        this.parent = options.parent;
        this.index = options.index;
        this.instantiate();
    }

    instantiate()
    {
        this.element = document.createElement("div");
        this.element.classList.add("swatch");
        this.element.style.background = helpers.colorToCSS(this.color);
        this.element.title = helpers.rgbToHex(this.color[0], this.color[1], this.color[2]);
        this.element.addEventListener("click", (event) =>
        {
            event.stopPropagation();
            this.onClickHandler(event);
        });
        this.parent.appendChild(this.element);
    }

    setOnClickHandler = (newHandler) => this.onClickHandler = newHandler;
    onClickHandler(event){};

    destroy = () => this.element.remove();
}


