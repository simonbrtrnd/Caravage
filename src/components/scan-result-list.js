
import ScanResultListHeader from "./scan-result-list-header.js";

export default class ScanResultList
{
    constructor(options)
    {
        this.parent = options.parent;
        this.title = options.title;
        this.instantiate();
        this.updateTotal();
        this.setActive(true);
    }

    instantiate()
    {
        //element
        this.element = document.createElement("div");
        this.element.classList.add("scan-results-container");
        this.parent.appendChild(this.element);
        //header
        this.header = new ScanResultListHeader({parent:this.element, title:this.title});
        this.header.setOnClickHandler(this.onClick.bind(this));
        //list
        this.list = document.createElement("div");
        this.list.classList.add("scan-results-list");
        this.element.appendChild(this.list);
    }

    onClick()
    {
        this.toggle();
    }

    updateTotal()
    {
        this.header.setTotal(this.list.children.length);
    }

    toggle()
    {
        this.element.classList.toggle("active");
    }

    setActive(bool)
    {
        this.element.classList[bool ? "add" : "remove"]("active");
    }


    destroy = () => this.element.remove();
}


