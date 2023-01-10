
export default class ScanResultListHeader
{
    constructor(options)
    {
        this.parent = options.parent;
        this.title = options.title;
        this.instantiate();
    }

    instantiate()
    {
        //element
        this.element = document.createElement("div");
        this.element.classList.add("scan-results-header", "type", "type--bold");
        this.element.addEventListener("click", (event) =>
        {
            event.stopPropagation();
            this.onClickHandler(event);
        });
        this.parent.appendChild(this.element);
        //title
        let title = document.createElement("span");
        title.innerHTML = this.title;
        this.element.appendChild(title);
        //total
        this.total = document.createElement("span");
        title.appendChild(this.total);
        //icon
        let icon = document.createElement("div");
        icon.classList.add("icon", "icon--forward", "icon-themed");
        this.element.appendChild(icon);
    }

    setTotal(total)
    {
        this.total.innerHTML = " ("+total+")";
    }
    
    setOnClickHandler = (newHandler) => this.onClickHandler = newHandler;
    onClickHandler(event){};

    destroy = () => this.element.remove();
}


