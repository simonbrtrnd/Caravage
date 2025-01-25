
import Result from "./result.js";

export default class ScanResult
{
    constructor(options)
    {
        this.parent = options.parent;
        this.id = options.id;
        this.instantiate();
        this.setActive(false);
    }

    instantiate()
    {
        //element
        this.element = document.createElement("div");
        this.element.id = this.id;
        this.element.classList.add("scan-result");
        this.element.addEventListener("click", (event) =>
        {
            event.stopPropagation();
            this.onClickHandler(event);
        });
        this.parent.appendChild(this.element);
        //label
        this.label = document.createElement("div");
        this.label.classList.add("type", "type--small");
        this.element.appendChild(this.label);
        //result
        let container = document.createElement("div");
        this.element.appendChild(container);
        this.result = new Result({parent: container})
    }

    setResult(options)
    {
        this.result.setText(options.text);
        this.result.setPassState(options.state);
    }

    setParent(element)
    {
        if(this.parent != element)
        {
            this.parent = element;
            this.parent.appendChild(this.element);
        }
    }

    setActive(bool)
    {
        this.element.classList[bool ? "add" : "remove"]("active");
    }

    setLabel(text)
    {
        this.label.innerHTML = text;
    }

    setOnClickHandler = (newHandler) => this.onClickHandler = newHandler;
    onClickHandler(event){};

    destroy = () => this.element.remove();
}


