


//#region VARIABLES
//css
import './reset.css';
import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
import './ui.css';
//library
import { APCAcontrast, sRGBtoY, displayP3toY, colorParsley } from 'apca-w3';
import * as helpers from "./helpers.js";
import RgbQuant from "rgbquant";
//components
import Swatch from "./components/swatch.js";
import Result from "./components/result.js";
import ScanResult from "./components/scan-result.js";
import ScanResultList from "./components/scan-result-list.js";

const VERSION = "1.0";

let swatches = [];
let scanResultArray = [];
let colorCount = 5;
let lastApca;
let activeTab;
let scanTime = 80;

//element
//selection
let selectionElement = document.getElementById("selection");
//preview
let swapColorsElement = document.getElementById("swap-colors");
let previewTextElement = document.getElementById("preview-text");
let previewBackgroundElement = document.getElementById("preview-background");
let contrastModalElement = document.getElementById("contrast-modal");
let fontSizeElement = document.getElementById("font-size") as HTMLInputElement;
let fontWeightElement = document.getElementById("font-weight") as HTMLInputElement;
let textPaletteElement = document.getElementById("text-palette");
let backgroundPaletteElement = document.getElementById("background-palette");
let apcaElement = document.getElementById("apca");
let usageElement = document.getElementById("usage");
let resultElement = document.getElementById("result");
let openContrastModalButton = document.getElementById("open-contrast-modal") as HTMLButtonElement;
let closeContrastModalButton = document.getElementById("close-contrast-modal") as HTMLButtonElement;
//scan
let scanElement = document.getElementById("scan");
let scanResultsElement = document.getElementById("scan-results");
let scanResultsListAvoid = new ScanResultList({parent:scanResultsElement, title:"Avoid"});
let scanResultsListError = new ScanResultList({parent:scanResultsElement, title:"Error"});
let scanResultsListPass = new ScanResultList({parent:scanResultsElement, title:"Pass"});
let scanEmptyStateElement = document.getElementById("scan-empty-state");
let scanTextsElement = document.getElementById("scan-texts");
let scanTimeElement = document.getElementById("scan-time");
let startScanButton = document.getElementById("start-scan");

//loader
let scanLoaderElement = document.getElementById("scan-loader");
let scanLoaderPreviewElement = document.getElementById("scan-loader-preview");
let scanLoaderProgressElement = document.getElementById("scan-loader-progress");

//tabs
let tabsElement = document.getElementById("tabs");
let tabButtons = document.getElementsByClassName("tab-button");
let scanTabButton = document.getElementById("scan-tab-button");
let tabContentsElement = document.getElementsByClassName("tab-content");
for (let tabButton of tabButtons) tabButton.addEventListener("click", function(){ return openPage(tabButton)});

//result
let result = new Result({parent : resultElement});

//other
let warning = 
{
    default: "",

    prohibited: "Usage is prohibited except for decorative purposes",
    avoid: "Weight 100 should be avoid",
    mincontrast: "Try to change color, font size or font weight to reach the minimum contrast",

    copyright:"Use only for placeholder, disabled state or copyright",
    body: "Qualified for body",
    notbody: "Do not use for body",

    lighter: "To be qualified for body try a lighter font weight",
    heavier:"To be qualified for body try a heavier font weight",
    smaller:"To be qualified for body try a smaller font size",
    taller:"To be qualified for body try a taller font size",

    toosmall: "Font size is too small",
    badcolor:"The color contrast is too low try to change color",
    contrasterror : "Unable to perform the contrast calculation with the selected text",
    
    plus15: "To be qualified for body try to increase the contrast by 15 more than the minimum contrast",
}
// Look up table base on May 27, 2022
let lookupTable =
[
    //10
    {
        size: 10,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            200:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            300:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            400:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            500:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            600:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            700:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            800:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
            900:
            {
                warning: [warning.prohibited, warning.toosmall],
                contrast: null
            },
        }
    },
    //12
    {
        size: 12,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            400:
            {
                warning: [warning.copyright , warning.taller],
                contrast: null
            },
            500:
            {
                warning: [warning.copyright , warning.taller],
                contrast: null
            },
            600:
            {
                warning: [warning.copyright , warning.taller],
                contrast: null
            },
            700:
            {
                warning: [warning.copyright , warning.taller],
                contrast: null
            },
            800:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
            900:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
        }
    },
    //14
    {
        size: 14,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            400:
            {
                warning: [warning.body],
                contrast: 100
            },
            500:
            {
                warning: [warning.body],
                contrast: 100
            },
            600:
            {
                warning: [warning.body],
                contrast: 90
            },
            700:
            {
                warning: [warning.body],
                contrast: 75
            },
            800:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
            900:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
        }
    },
    //15
    {
        size: 15,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            400:
            {
                warning: [warning.body],
                contrast: 100
            },
            500:
            {
                warning: [warning.body],
                contrast: 90
            },
            600:
            {
                warning: [warning.body],
                contrast: 75
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 70
            },
            800:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
            900:
            {
                warning: [warning.prohibited, warning.lighter],
                copyright: null
            },
        }
    },
    //16
    {
        size: 16,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            400:
            {
                warning: [warning.body],
                contrast: 90
            },
            500:
            {
                warning: [warning.body],
                contrast: 75
            },
            600:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 70
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 60
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 60
            },
            900:
            {
                warning: [warning.prohibited, warning.lighter],
                contrast: null
            },
        }
    },
    //18
    {
        size: 18,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.body],
                contrast: 100
            },
            400:
            {
                warning: [warning.body],
                contrast: 75
            },
            500:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 70
            },
            600:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 60
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 55
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 55
            },
            900:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 55
            },
        }
    },
    //21
    {
        size: 21,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.body],
                contrast: 90
            },
            400:
            {
                warning: [warning.body],
                contrast: 70
            },
            500:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 60
            },
            600:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 55
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 50
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 50
            },
            900:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 50
            },
        }
    },
    //24
    {
        size: 24,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.copyright, warning.heavier],
                contrast: null
            },
            300:
            {
                warning: [warning.body],
                contrast: 75
            },
            400:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 60
            },
            500:
            {
                warning:[warning.notbody, warning.lighter, warning.plus15],
                contrast: 55
            },
            600:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 50
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 45
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 45
            },
            900:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 45
            },
        }
    },
    //28
    {
        size: 28,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.notbody, warning.heavier],
                contrast: 100
            },
            300:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 70
            },
            400:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 55
            },
            500:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 50
            },
            600:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 45
            },
            700:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 43
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 43
            },
            900:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 43
            },
        }
    },
    //32
    {
        size: 32,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.notbody, warning.heavier],
                contrast: 90
            },
            300:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 65
            },
            400:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 50
            },
            500:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 45
            },
            600:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 43
            },
            700:
            {
                warning: [warning.notbody, warning.lighter, warning.plus15],
                contrast: 40
            },
            800:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 40
            },
            900:
            {
                warning: [warning.notbody, warning.lighter],
                contrast: 40
            },
        }
    },
    //36
    {
        size: 36,
        weight:
        {
            100:
            {
                warning: [warning.prohibited, warning.heavier],
                contrast: null
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 75
            },
            300:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 60
            },
            400:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 45
            },
            500:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 43
            },
            600:
            {
                warning:[warning.notbody, warning.smaller, warning.plus15],
                contrast: 40
            },
            700:
            {
                warning: [warning.notbody, warning.smaller, warning.plus15],
                contrast: 38
            },
            800:
            {
                warning: [warning.notbody, warning.smaller, warning.lighter],
                contrast: 38
            },
            900:
            {
                warning: [warning.notbody, warning.smaller, warning.lighter],
                contrast: 38
            },
        }
    },
    //42
    {
        size: 42,
        weight:
        {
            100:
            {
                warning: [warning.notbody, warning.avoid],
                contrast: 100
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 70
            },
            300:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 55
            },
            400:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 43
            },
            500:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 40
            },
            600:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 38
            },
            700:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
            800:
            {
                warning:[warning.notbody, warning.smaller],
                contrast: 35
            },
            900:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
        }
    },
    //48
    {
        size: 48,
        weight:
        {
            100:
            {
                warning: [warning.notbody, warning.avoid],
                contrast: 90
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 60
            },
            300:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 50
            },
            400:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 40
            },
            500:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 38
            },
            600:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
            700:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 33
            },
            800:
            {
                warning:[warning.notbody, warning.smaller],
                contrast: 33
            },
            900:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 33
            },
        }
    },
    //60
    {
        size: 60,
        weight:
        {
            100:
            {
                warning: [warning.notbody, warning.avoid],
                contrast: 75
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 55
            },
            300:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 45
            },
            400:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 38
            },
            500:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
            600:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 33
            },
            700:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            800:
            {
                warning:[warning.notbody, warning.smaller],
                contrast: 30
            },
            900:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
        }
    },
    //72
    {
        size: 72,
        weight:
        {
            100:
            {
                warning: [warning.notbody, warning.avoid],
                contrast: 60
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 50
            },
            300:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 40
            },
            400:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
            500:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 33
            },
            600:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            700:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            800:
            {
                warning:[warning.notbody, warning.smaller],
                contrast: 30
            },
            900:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
        }
    },
    //96
    {
        size: 96,
        weight:
        {
            100:
            {
                warning: [warning.notbody, warning.avoid],
                contrast: 50
            },
            200:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 45
            },
            300:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 35
            },
            400:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 33
            },
            500:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            600:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            700:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
            800:
            {
                warning:[warning.notbody, warning.smaller],
                contrast: 30
            },
            900:
            {
                warning: [warning.notbody, warning.smaller],
                contrast: 30
            },
        }
    },
];

let score = 
[
    {   
        contrast :90,
        result : "Excellent",
    },
    {   
        contrast :75,
        result : "Good",
    },
    {   
        contrast :60,
        result : "Ok",
    },
    {   
        contrast :45,
        result : "Low",
    },
    {   
        contrast :30,
        result : "Very low",
    },
    {   
        contrast :15,
        result : "Avoid",
    }
]

//#endregion

//#region MESSAGE FROM PLUGIN
onmessage = async (event) =>
{
  let msg = event.data.pluginMessage;
  if(msg.type == "set-total-texts") setTotalTextsAndTime(msg.total);
  if(msg.type == "reset-scan") resetScanTab();
  if(msg.type =="check") await check(msg);
  if(msg.type =="keep-only") destroyScanResult(msg.allTextId);
}
//#endregion

//#region ON PAGE CHANGE
function resetScanTab()
{
    if(activeTab == "scan") openPage(scanTabButton);
}
//#endregion

//#region TABS
function openPage(tab)
{
    activeTab = tab.getAttribute("page-id");
    if(activeTab != "scan") parent.postMessage({pluginMessage: {type: "set-can-scan", scanMode: false}}, "*");
    parent.postMessage({pluginMessage: {type: "get-total-texts"}}, "*");
    
    //disable all
    for (let tabContent of tabContentsElement) displayElement(tabContent, false);
    for (let tabButton of tabButtons) tabButton.classList.remove("selected");
    //enable selected
    tab.classList.add("selected");
    displayElement(document.getElementById(activeTab), true);

    //scan tab
    displayElement(scanResultsElement, false);
    displayElement(scanEmptyStateElement, true);

    //resize UI
    resizeUI(helpers.UI.width, helpers.UI.height);
}
//#endregion


startScanButton.onclick = () => parent.postMessage({pluginMessage: {type: "scan"}}, "*");

fontSizeElement.onchange = async () =>
{
    lastApca.font = getFont();
    setUI(await getAPCA(lastApca));
}

fontWeightElement.onchange = async () =>
{
    lastApca.font = getFont();
    setUI(await getAPCA(lastApca));
}

openContrastModalButton.onclick  = () =>
{
    openModal(contrastModalElement);
} 
closeContrastModalButton.onclick  = () =>
{
    closeModal(contrastModalElement);
}

swapColorsElement.onclick = async () =>
{
    swapColorsPreview();
    let previousPalette =
    {
        text : lastApca.palette.text,
        background : lastApca.palette.background
    }
    lastApca.palette.text = previousPalette.background;
    lastApca.palette.background = previousPalette.text;
    setUI(await getAPCA(lastApca));
}
//#endregion


//#region NOTIFICATION
const notify = (notification) => parent.postMessage({pluginMessage: {type: "notification", notification: notification}}, "*");
//#endregion

//#region RESIZE

function setScanTabHeight()
{
    scanElement.style.height = document.body.offsetHeight - tabsElement.offsetHeight + "px";
}

const resizeUI = (width, height) => 
{
    setScanTabHeight();
    parent.postMessage({pluginMessage: {type: "resize-ui", width, height}}, "*");
}
//#endregion

//#region IMAGE
async function getImageFromBytes(bytes)
{
    const url = URL.createObjectURL(new Blob([bytes]));
    const image = await new Promise((resolve, reject) =>
    {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject();
      img.crossOrigin = "Anonymous";
      img.src = url;
    }) as HTMLImageElement;
    return image;
}

function getURLFromBytes(bytes)
{
    const url = URL.createObjectURL(new Blob([bytes]));
    return url;
}
//#endregion

//#region FONT
function setFont(options)
{
    fontSizeElement.value = options.size;
    fontWeightElement.value = options.weight;
}
function getFont()
{
    let options =
    {
        size : fontSizeElement.value,
        weight : fontWeightElement.value
    }
    return options;
}
//#endregion

//#region PALETTE
function getPalette(image)
{
    var options = {
        colors: colorCount,      // desired palette size
        method: 1,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
        boxSize: [64,64],        // subregion dims (if method = 2)
        boxPxls: 2,              // min-population threshold (if method = 2)
        initColors: 1,        // # of top-occurring colors  to start with (if method = 1)
        minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
        dithKern: null,          // dithering kernel name, see available kernels in docs below
        dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
        dithSerp: false,         // enable serpentine pattern dithering
        palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
        reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
        useCache: false,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
        cacheFreq: 10,           // min color occurance count needed to qualify for caching
        colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"/"euclidean"
    };
    
    const rgbquant = new RgbQuant(options);
    rgbquant.sample(image);
    const  palette = rgbquant.palette(true);
    return palette;
}

async function setPalette(element, palette, onClickHandler, type)
{
    let index = 0;
    for await (let color of palette)
    {
        let swatch = new Swatch({color: color, parent:element, index:index});
        swatch.setOnClickHandler(async () =>
        {
            lastApca.palette[type].index = swatch.index;
            setUI(await getAPCA(lastApca));
            onClickHandler(color);
            textToClipboard(helpers.rgbToHex(color[0], color[1], color[2]));
        });
        swatches.push(swatch);
        index++;
    }
}

function resetPalette()
{
    for(let swatch of swatches) swatch.destroy();
    swatches = [];
}
//#endregion

//#region UI
function initUI()
{
    displayElement(fontWeightElement, true);
    displayElement(swapColorsElement, true);
    previewTextElement.innerHTML = "Aa";
}

function setUI(apca)
{
    //preview
    setPreviewTextFont(apca.font);
    apca.palette.text.colors != undefined ? setPreviewTextColor(apca.palette.text.colors[0]) : setPreviewTextColor([0,0,0]);
    apca.palette.background.colors != undefined ? setPreviewBackgroundColor(apca.palette.background.colors[0]) : setPreviewBackgroundColor([255,255,255]);
    //palette
    resetPalette();
    if(apca.palette.text.colors != undefined) setPalette(textPaletteElement, helpers.removeDuplicates(apca.palette.text.colors), setPreviewTextColor, "text");
    if(apca.palette.background.colors != undefined) setPalette(backgroundPaletteElement, helpers.removeDuplicates(apca.palette.background.colors), setPreviewBackgroundColor, "background");
    //font
    setFont(apca.font);
    //contrast
    setContrast(apca.contrast);
    //result
    setResult(apca.result);
    //usage
    setUsageElement(apca.usage);
}

function setPreviewTextFont(options)
{
    previewTextElement.style.fontWeight = options.weight;
    previewTextElement.style.fontSize = options.size;
}

function setPreviewTextColor(color)
{
    previewTextElement.style.color = helpers.colorToCSS(color);
}

function setPreviewBackgroundColor(color)
{
    previewBackgroundElement.style.background = helpers.colorToCSS(color);
}

function swapColorsPreview()
{
    let previous =
    {
        text : previewTextElement.style.color,
        background : previewBackgroundElement.style.background,
    }
    previewTextElement.style.color =  previous.background;
    previewBackgroundElement.style.background = previous.text;
}

function textToClipboard (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    notify(text + " added to clipboard 📋");
}

function setResult(options)
{
    result.setText(options.text);
    result.setPassState(options.state);
}

function setUsageElement(array = [])
{
    usageElement.innerHTML=""; // reset
    displayElement(usageElement, array.length != 0)
    for(let item of array)
    {
        let li = document.createElement("li");
        li.innerHTML = item;
        usageElement.appendChild(li);
    }
}

function setContrast(options)
{
    apcaElement.innerHTML = options.current + " / " + options.min;
}
//#endregion

//#region APCA

async function getAPCA(options)
{
    let apca =
    {
        id : options.id,
        name : options.name,
        usage: undefined,
        contrast : { min:undefined, current:undefined},
        result : { text:undefined, state:undefined},
        palette:
        { 
            text: 
            {
                colors : options.palette == undefined ? (options.textBytes != undefined ? getPalette(await getImageFromBytes(options.textBytes)) : undefined ) : options.palette.text.colors,
                index : options.palette == undefined ? 0 : options.palette.text.index,
            },
            background:
            {
                colors : options.palette == undefined ? (options.backgroundBytes != undefined ? getPalette(await getImageFromBytes(options.backgroundBytes)) : undefined ) : options.palette.background.colors,
                index : options.palette == undefined ? 0 : options.palette.background.index,
            } 
        },
        font :
        {
            size : options.font.size,
            weight : options.font.weight != undefined ? helpers.getWeight(options.font.weight).toString() : undefined,
        },
    };
    let contrast = apca.palette.text.colors != undefined && apca.palette.background.colors != undefined ? getContrast(apca.palette.text.colors[apca.palette.text.index],apca.palette.background.colors[apca.palette.background.index]) : null;
    let closestTable = getClosestTable(options.font.size);
    let closestScore = getClosestScore(contrast);
    let data = closestTable.weight[apca.font.weight];

    if(data != undefined && contrast != null)
    {
        if(data.contrast != null && contrast >= data.contrast)
        {
            apca.result.text = closestScore.result;
            apca.result.state = true;
            apca.usage = data.warning.includes(warning.plus15) && contrast >= data.contrast + 15 ? [warning.body] : data.warning;
        }
        else
        {
            apca.result.text = "Avoid";
            apca.result.state = false;
            apca.usage = data.contrast != null ? [warning.mincontrast] : data.warning;
            if(contrast < 30) apca.usage = [warning.badcolor];
        }
    }
    else
    {
        apca.result.text = "Error";
        apca.result.state = false;
        apca.usage = [warning.contrasterror]
    }

    apca.contrast.min = data != undefined && data.contrast != null ? data.contrast.toString() : "none";
    apca.contrast.current = contrast;

    return apca;
}

function getContrast(textColor, backgroundColor)
{
    let contrast = Math.abs(APCAcontrast(sRGBtoY(textColor), sRGBtoY(backgroundColor)));
    return contrast;
}

function getClosestTable(size)
{
    let t = lookupTable.reduce(function(previous, current)
    {
        return (Math.abs(current.size - size) < Math.abs(previous.size - size) ? current : previous);
    });
    return t;
}

function getClosestScore(contrast)
{
    let s = score.reduce(function(previous, current)
    {
        return previous.contrast < contrast || contrast < current.contrast ? previous : current;
    });
    return s;
}

//#endregion

//#region SCAN
async function check(msg)
{
    // console.log("CHECK", msg);
    let data = msg.data;
    lastApca = await getAPCA(data);
    
    if(msg.index < msg.total)
    {
        updateLoader(lastApca, msg.index, msg.total);
        parent.postMessage({pluginMessage: {type: "check"}}, "*"); // loop

        if(msg.scanMode)
        {
            displayElement(scanLoaderElement, true);
            instantiateScanResult(lastApca);
        } 
    }
    else
    { 
        //ui
        initUI(); // to improve later
        setUI(lastApca);
        if(msg.scanMode)
        {
            msg.total > 0 ? instantiateScanResult(lastApca) : updateScanResult(lastApca);
            parent.postMessage({pluginMessage: {type: "set-is-scanning", isScanning:false}}, "*");
            displayElement(scanLoaderElement, false);
            displayElement(scanEmptyStateElement, false);
            displayElement(selectionElement, true);
            displayElement(scanResultsElement, true);
        }
        //resize
        resizeUI(msg.scanMode ? helpers.UI.width * 2 : helpers.UI.width, helpers.UI.height);
    }
    //update total
    scanResultsListPass.updateTotal();
    scanResultsListError.updateTotal();
    scanResultsListAvoid.updateTotal();
}

function instantiateScanResult(apca)
{
    if(apca.id != undefined)
    {
        if (!scanResultArray.some(scanResult => apca.id == scanResult.id))
        {
            //init
            let scanResult = new ScanResult({parent: apca.result.state ? scanResultsListPass.list : (apca.result.text== "Error" ? scanResultsListError.list : scanResultsListAvoid.list), id:apca.id});
            scanResult.setResult(apca.result);
            scanResult.setLabel(apca.name);
            scanResult.setOnClickHandler(selectNode);
            //add to array
            scanResultArray.push(scanResult);
        }
    }
}

function updateScanResult(apca)
{
    if(apca.id != undefined)
    {
        let scanResult = scanResultArray.find(scanResult => apca.id == scanResult.id);
        if(scanResult != undefined)
        {
            scanResult.setResult(apca.result);
            scanResult.setParent(apca.result.state ? scanResultsListPass.list :  (apca.result.text== "Error" ? scanResultsListError.list : scanResultsListAvoid.list));
            scanResult.setLabel(apca.name);
            //open list
            apca.result.state ? scanResultsListPass.setActive(true) : (apca.result.text== "Error" ? scanResultsListError.setActive(true):scanResultsListAvoid.setActive(true));
            //scroll
            scrollTo(scanElement, scanResult.element.offsetTop - scanResult.element.offsetHeight);
            //desactive outline
            for(let scanResult of scanResultArray) scanResult.setActive(false);
            //active outline 
            scanResult.setActive(true);
        }
    }
}

function destroyScanResult(array = [])
{
    //destroy
    let scanResultToDestroy = scanResultArray.filter(scanResult => !array.includes(scanResult.id));
    for(let scanResult of scanResultToDestroy) scanResult.destroy();
    //keep
    scanResultArray = scanResultArray.filter(scanResult => array.includes(scanResult.id));
}

function selectNode()
{
    parent.postMessage({pluginMessage: {type: "select-node", id:this.id}}, "*");
}

function scrollTo(element, position)
{
    element.scroll({
        top:position,
        behavior: 'smooth'
    });
}

function setTotalTextsAndTime(total)
{
    scanTextsElement.innerHTML = total + (total <= 1 ? " text" : " texts");
    scanTimeElement.innerHTML = helpers.millisToMinutesAndSeconds(scanTime * total);
}

function updateLoader(apca, index, total)
{
    scanLoaderProgressElement.innerHTML =  Math.round(index / total * 100) + "%";
    scanLoaderPreviewElement.style.fontWeight = apca.font.weight;
    scanLoaderPreviewElement.style.fontSize = apca.font.size;
    scanLoaderPreviewElement.style.background = apca.palette.background.colors != undefined ? helpers.colorToCSS(apca.palette.background.colors[0]) : helpers.colorToCSS([255,255,255]);
    scanLoaderPreviewElement.style.color =  apca.palette.text.colors != undefined ? helpers.colorToCSS(apca.palette.text.colors[0]) :  helpers.colorToCSS([0,0,0]) ;
}

//#endregion

//#region MODALS
const openModal = (modal) => displayElement(modal, true);
const closeModal = (modal) =>  displayElement(modal, false);
//#endregion

//#region INIT
function init()
{
    setUsageElement();
    resizeUI(helpers.UI.width, helpers.UI.height);
}
init();
//#endregion

//#region DISPLAY
function displayElement(element, bool) { element.classList[bool ? "remove" : "add"]("hide") };
//#endregion
