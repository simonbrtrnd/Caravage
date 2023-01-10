
export default class Result
{
    constructor(options)
    {
        this.parent = options.parent;
        this.instantiate();
        this.setPassState(false);
        this.display(false);
        this.state = true;
        this.text = "";
    }

    instantiate()
    {
        this.element = document.createElement("div");
        this.element.classList.add("result","type", "type--bold", "type--small");
        this.parent.appendChild(this.element);
    }

    getText = () => {return this.text}
    setText(text)
    {
        this.text = text;
        this.element.innerHTML = text;
        let bool = text == "" ? false : true;
        this.display(bool);
    }

    getPassState = () => {return this.state}
    setPassState(bool)
    {
        this.state = bool;
        this.element.classList[bool ? "add" : "remove"]("pass");
        this.element.classList[bool ? "remove" : "add"]("fail");
    }
    
    display = (bool) => this.element.classList[bool ? "remove" : "add"]("hide");
    destroy = () => this.element.remove();
}


