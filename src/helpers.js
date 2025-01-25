export const UI =
{ 
    width : 240,
    height : 560,
}

export function isNumeric (evt)
{
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode (key);
    var regex = /[0-9]|\./;
    if ( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

export function minMaxCheck(input)
{
    let value = parseInt(input.value);
    if (value < input.min) input.value = input.min;
    if (value > input.max) input.value = input.max;
}

export function removeItemFromArray(item, array)
{
    const index = array.indexOf(item);
    if (index > -1) array.splice(index, 1);
}

export function getCheckboxes(array, isSelected)
{
  let newArray = [];
  for(let i = 0; i < array.length; i++) if(array[i].checked == isSelected) newArray.push(array[i]);
  return newArray;
}

export function colorToCSS(color)
{
    return "rgb(" + color + ")";
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  

export function parseColor(color)
{
    let string = color.replace("rgb(","").replace(")","");
    let array = string.split(",");
    return array;
}

export function removeDuplicates(data)
{
    return Array.from(new Set(data.map(JSON.stringify)), JSON.parse)
}


export function getWeight(style)
{
    if(style != undefined)
    {

        let s = style.toLowerCase();
        let specifics = [" ", "-","_", "italic", "display", "semicondensed", "extracondensed" , "condensed", "(", ")", "+", /[0-9]/g];
        for (let specific of specifics) s = s.replaceAll(specific, "");
        switch (s)
        {
            case "thin": return 100;
            case "hairline": return 100;
            case "extralight":return 200;
            case "ultralight":return 200;
            case "light": return 300;
            case "book": return 300;
            case "normal": return 400;
            case "regular" : return 400;
            case "medium": return 500;
            case "semibold": return 600;
            case "demibold": return 600;
            case "bold": return 700;
            case "extrabold": return 800;
            case "ultrabold": return 800;
            case "black": return 900;
            case "heavy": return 900;
            case "extrablack": return 900;
            case "ultrablack": return 900;
            default: return style;
        }
    }
    return style;
}

export function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        minutes === 0 ? seconds + (seconds <= 1 ? " second" : " seconds") : minutes + (minutes <= 1 ? " minute" : " minute(s)")
    );
  }

