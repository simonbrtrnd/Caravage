/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI),
/* harmony export */   colorToCSS: () => (/* binding */ colorToCSS),
/* harmony export */   getCheckboxes: () => (/* binding */ getCheckboxes),
/* harmony export */   getWeight: () => (/* binding */ getWeight),
/* harmony export */   isNumeric: () => (/* binding */ isNumeric),
/* harmony export */   millisToMinutesAndSeconds: () => (/* binding */ millisToMinutesAndSeconds),
/* harmony export */   minMaxCheck: () => (/* binding */ minMaxCheck),
/* harmony export */   parseColor: () => (/* binding */ parseColor),
/* harmony export */   removeDuplicates: () => (/* binding */ removeDuplicates),
/* harmony export */   removeItemFromArray: () => (/* binding */ removeItemFromArray),
/* harmony export */   rgbToHex: () => (/* binding */ rgbToHex)
/* harmony export */ });
const UI =
{ 
    width : 240,
    height : 560,
}

function isNumeric (evt)
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

function minMaxCheck(input)
{
    let value = parseInt(input.value);
    if (value < input.min) input.value = input.min;
    if (value > input.max) input.value = input.max;
}

function removeItemFromArray(item, array)
{
    const index = array.indexOf(item);
    if (index > -1) array.splice(index, 1);
}

function getCheckboxes(array, isSelected)
{
  let newArray = [];
  for(let i = 0; i < array.length; i++) if(array[i].checked == isSelected) newArray.push(array[i]);
  return newArray;
}

function colorToCSS(color)
{
    return "rgb(" + color + ")";
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  

function parseColor(color)
{
    let string = color.replace("rgb(","").replace(")","");
    let array = string.split(",");
    return array;
}

function removeDuplicates(data)
{
    return Array.from(new Set(data.map(JSON.stringify)), JSON.parse)
}


function getWeight(style)
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

function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        minutes === 0 ? seconds + (seconds <= 1 ? " second" : " seconds") : minutes + (minutes <= 1 ? " minute" : " minute(s)")
    );
  }



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./src/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//#region VARIABLES

//other
let allNode;
let scanMode = false;
let isScanning = false;
let index = 0;
figma.skipInvisibleInstanceChildren = true;
//#endregion
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield figma.loadAllPagesAsync();
        //#region FIGMA UI
        figma.showUI(__html__, { themeColors: true, width: _helpers_js__WEBPACK_IMPORTED_MODULE_0__.UI.width, height: _helpers_js__WEBPACK_IMPORTED_MODULE_0__.UI.height });
        function resizeUI(width, height) {
            figma.ui.resize(width, height);
        }
        //#endregion
        //#region RELAUNCH
        figma.root.setRelaunchData({ relaunch: '' });
        //#endregion
        //#region MESSAGES
        figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg.type === "notification")
                figma.notify(msg.notification);
            if (msg.type === "resize-ui")
                resizeUI(msg.width, msg.height);
            if (msg.type === "select-node")
                selectNode(msg.id);
            if (msg.type === "get-total-texts")
                figma.ui.postMessage({ type: "set-total-texts", total: getTotalTexts() });
            if (msg.type == "check")
                check(allNode.textArray, true);
            if (msg.type === "scan") {
                index = 0;
                scanMode = true;
                isScanning = true;
                scan();
            }
            if (msg.type === "set-can-scan")
                scanMode = msg.scanMode;
            if (msg.type === "set-is-scanning")
                isScanning = msg.isScanning;
        });
        //#endregion
        //#region ON PAGE CHANGE
        figma.on("currentpagechange", () => __awaiter(this, void 0, void 0, function* () {
            figma.ui.postMessage({ type: "set-total-texts", total: getTotalTexts() });
            figma.ui.postMessage({ type: "reset-scan" });
            scanMode = false;
        }));
        //#endregion
        //#region ON DOCUMENT CHANGE
        figma.on("documentchange", (event) => __awaiter(this, void 0, void 0, function* () {
            for (let change of event.documentChanges) {
                if (change.type == "PROPERTY_CHANGE" && change.node.type == "TEXT" && !change.properties.includes("exportSettings") && !(change.properties.length == 2 && change.properties.includes("opacity") && change.properties.includes("exportSettings"))) {
                    setTotalAndCheck();
                }
            }
        }));
        //#endregion
        //#region ON SELECTION CHANGE
        figma.on("selectionchange", () => __awaiter(this, void 0, void 0, function* () { return setTotalAndCheck(); }));
        //#endregion
        //#region GET NODE
        function getAllNode(nodesArray, textArray = [], nodeArray = []) {
            for (let node of nodesArray) {
                nodeArray.push(node);
                if (node.children != undefined && node.visible)
                    getAllNode(node.children, textArray, nodeArray); // inception search
                if (node.type == "TEXT" && node.visible)
                    textArray.push(node);
            }
            return { textArray, nodeArray };
        }
        //#endregion
        //#region SCAN
        function scan() {
            return __awaiter(this, void 0, void 0, function* () {
                allNode = getAllNode(figma.currentPage.selection);
                keepOnly(allNode.textArray);
                yield check(allNode.textArray, true);
            });
        }
        //#endregion
        //#region CHECK
        function check(nodes = [], scanMode = false) {
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                let node = nodes[index];
                if (index < nodes.length) {
                    data = yield getDataFromNode(node);
                    index++;
                }
                else {
                    if (allNode != undefined && scanMode) {
                        if (allNode.textArray.includes(figma.currentPage.selection[0])) {
                            data = yield getDataFromNode(figma.currentPage.selection[0]);
                        }
                        else {
                            for (let node of figma.currentPage.selection) {
                                if (!allNode.nodeArray.includes(node)) {
                                    figma.ui.postMessage({ type: "reset-scan" });
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        data = yield getDataFromNode(figma.currentPage.selection[0]);
                    }
                    index = 0;
                }
                if (data != undefined) {
                    figma.ui.postMessage({ type: "check", index: index, total: nodes.length, data: data, scanMode: scanMode });
                }
            });
        }
        //#endregion
        //#region DATA
        function getDataFromNode(node) {
            return __awaiter(this, void 0, void 0, function* () {
                let data;
                if (node != undefined && node.type == "TEXT") {
                    if (node.characters.length > 0 && node.width > 0) {
                        let textBytes = yield getTextBytes(node);
                        let backgroundBytes = yield getBackgroundBytes(node);
                        data =
                            {
                                textBytes: textBytes,
                                backgroundBytes: backgroundBytes,
                                name: node.characters,
                                id: node.id,
                                font: getFontData(node)
                            };
                    }
                    else {
                        data =
                            {
                                textBytes: undefined,
                                backgroundBytes: undefined,
                                name: undefined,
                                id: node.id,
                                font: getFontData(node)
                            };
                    }
                }
                return data;
            });
        }
        function keepOnly(nodes) {
            let allTextNodeId = [];
            for (let node of nodes)
                if (node != undefined && node.type == "TEXT")
                    allTextNodeId.push(node.id);
            figma.ui.postMessage({ type: "keep-only", allTextId: allTextNodeId });
        }
        //#endregion
        //#region IMAGE
        function getAncestorsOpacity(node, array = []) {
            if (node.opacity != undefined)
                array.push(node.opacity);
            if (node.parent.type != "PAGE" && node.type != "PAGE" && node.parent != null && node.parent != undefined)
                getAncestorsOpacity(node.parent, array);
            return array;
        }
        function getBytesFromNode(node) {
            return __awaiter(this, void 0, void 0, function* () {
                const exportedNode = yield node.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 1 } });
                const bytes = yield figma.createImage(exportedNode).getBytesAsync();
                return bytes;
            });
        }
        function getTextBytes(node) {
            return __awaiter(this, void 0, void 0, function* () {
                if (node.fills !== figma.mixed) {
                    //rectangle
                    const rectangle = figma.createRectangle();
                    rectangle.x = node.absoluteTransform[0][2];
                    rectangle.y = node.absoluteTransform[1][2];
                    rectangle.resize(node.width, node.height);
                    rectangle.fills = node.fills;
                    rectangle.opacity = getAncestorsOpacity(node).reduce((a, b) => a * b, 1);
                    //slice
                    const slice = figma.createSlice();
                    if (node.width > 3 && node.height > 3) {
                        slice.x = node.absoluteTransform[0][2] + 1;
                        slice.y = node.absoluteTransform[1][2] + 1;
                        slice.resize(node.width - 2, node.height - 2);
                    }
                    else {
                        slice.x = node.absoluteTransform[0][2];
                        slice.y = node.absoluteTransform[1][2];
                        slice.resize(node.width, node.height);
                    }
                    let opacity = node.opacity;
                    node.opacity = 0;
                    //quick and dirty way to know when a change is made by the user vs the plugin
                    let exportSettings = JSON.parse(JSON.stringify(node.exportSettings));
                    node.exportSettings = [{
                            constraint: { type: 'SCALE', value: 0.123456789 },
                            contentsOnly: true,
                            format: "PNG",
                            suffix: "caravage",
                            useAbsoluteBounds: false,
                        }];
                    const bytes = yield getBytesFromNode(slice);
                    node.exportSettings = exportSettings;
                    node.opacity = opacity;
                    rectangle.remove();
                    slice.remove();
                    return bytes;
                }
                else {
                    const bytes = yield getBytesFromNode(node);
                    return bytes;
                }
            });
        }
        function getBackgroundBytes(node) {
            return __awaiter(this, void 0, void 0, function* () {
                const slice = figma.createSlice();
                if (node.width > 3 && node.height > 3) {
                    slice.x = node.absoluteTransform[0][2] + 1;
                    slice.y = node.absoluteTransform[1][2] + 1;
                    slice.resize(node.width - 2, node.height - 2);
                }
                else {
                    slice.x = node.absoluteTransform[0][2];
                    slice.y = node.absoluteTransform[1][2];
                    slice.resize(node.width, node.height);
                }
                let opacity = node.opacity;
                node.opacity = 0;
                const bytes = yield getBytesFromNode(slice);
                node.opacity = opacity;
                slice.remove();
                return bytes;
            });
        }
        //#endregion
        //#region FONT
        function getFontData(node) {
            let styleArray = node.getStyledTextSegments(['fontName', 'fontSize']);
            let style = styleArray[0];
            let data = {
                size: style != undefined ? style.fontSize : undefined,
                weight: style != undefined ? style.fontName["style"] : undefined,
            };
            return data;
        }
        //#endregion
        //#region SELECT
        function selectNode(id) {
            let nodes = [];
            let node = figma.getNodeById(id);
            if (node != undefined) {
                nodes.push(figma.getNodeById(id));
                figma.currentPage.selection = nodes;
                figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
            }
        }
        //#endregion
        //#region OTHER
        function getTotalTexts() {
            return getAllNode(figma.currentPage.selection).textArray.length;
        }
        function setTotalAndCheck() {
            figma.ui.postMessage({ type: "set-total-texts", total: getTotalTexts() });
            if (!isScanning)
                check([], scanMode);
        }
        setTotalAndCheck();
        //#endregion
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vY2FyYXZhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FyYXZhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhcmF2YWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FyYXZhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYXJhdmFnZS8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBVSSA9XG57IFxuICAgIHdpZHRoIDogMjQwLFxuICAgIGhlaWdodCA6IDU2MCxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtZXJpYyAoZXZ0KVxue1xuICAgIHZhciB0aGVFdmVudCA9IGV2dCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgdmFyIGtleSA9IHRoZUV2ZW50LmtleUNvZGUgfHwgdGhlRXZlbnQud2hpY2g7XG4gICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSAoa2V5KTtcbiAgICB2YXIgcmVnZXggPSAvWzAtOV18XFwuLztcbiAgICBpZiAoICFyZWdleC50ZXN0KGtleSkgKSB7XG4gICAgICAgIHRoZUV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGlmKHRoZUV2ZW50LnByZXZlbnREZWZhdWx0KSB0aGVFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbk1heENoZWNrKGlucHV0KVxue1xuICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTtcbiAgICBpZiAodmFsdWUgPCBpbnB1dC5taW4pIGlucHV0LnZhbHVlID0gaW5wdXQubWluO1xuICAgIGlmICh2YWx1ZSA+IGlucHV0Lm1heCkgaW5wdXQudmFsdWUgPSBpbnB1dC5tYXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVJdGVtRnJvbUFycmF5KGl0ZW0sIGFycmF5KVxue1xuICAgIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoZWNrYm94ZXMoYXJyYXksIGlzU2VsZWN0ZWQpXG57XG4gIGxldCBuZXdBcnJheSA9IFtdO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIGlmKGFycmF5W2ldLmNoZWNrZWQgPT0gaXNTZWxlY3RlZCkgbmV3QXJyYXkucHVzaChhcnJheVtpXSk7XG4gIHJldHVybiBuZXdBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yVG9DU1MoY29sb3IpXG57XG4gICAgcmV0dXJuIFwicmdiKFwiICsgY29sb3IgKyBcIilcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICByZXR1cm4gXCIjXCIgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG59XG5cbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcbiAgICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xufVxuICBcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3IpXG57XG4gICAgbGV0IHN0cmluZyA9IGNvbG9yLnJlcGxhY2UoXCJyZ2IoXCIsXCJcIikucmVwbGFjZShcIilcIixcIlwiKTtcbiAgICBsZXQgYXJyYXkgPSBzdHJpbmcuc3BsaXQoXCIsXCIpO1xuICAgIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZXMoZGF0YSlcbntcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGRhdGEubWFwKEpTT04uc3RyaW5naWZ5KSksIEpTT04ucGFyc2UpXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlaWdodChzdHlsZSlcbntcbiAgICBpZihzdHlsZSAhPSB1bmRlZmluZWQpXG4gICAge1xuXG4gICAgICAgIGxldCBzID0gc3R5bGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHNwZWNpZmljcyA9IFtcIiBcIiwgXCItXCIsXCJfXCIsIFwiaXRhbGljXCIsIFwiZGlzcGxheVwiLCBcInNlbWljb25kZW5zZWRcIiwgXCJleHRyYWNvbmRlbnNlZFwiICwgXCJjb25kZW5zZWRcIiwgXCIoXCIsIFwiKVwiLCBcIitcIiwgL1swLTldL2ddO1xuICAgICAgICBmb3IgKGxldCBzcGVjaWZpYyBvZiBzcGVjaWZpY3MpIHMgPSBzLnJlcGxhY2VBbGwoc3BlY2lmaWMsIFwiXCIpO1xuICAgICAgICBzd2l0Y2ggKHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0aGluXCI6IHJldHVybiAxMDA7XG4gICAgICAgICAgICBjYXNlIFwiaGFpcmxpbmVcIjogcmV0dXJuIDEwMDtcbiAgICAgICAgICAgIGNhc2UgXCJleHRyYWxpZ2h0XCI6cmV0dXJuIDIwMDtcbiAgICAgICAgICAgIGNhc2UgXCJ1bHRyYWxpZ2h0XCI6cmV0dXJuIDIwMDtcbiAgICAgICAgICAgIGNhc2UgXCJsaWdodFwiOiByZXR1cm4gMzAwO1xuICAgICAgICAgICAgY2FzZSBcImJvb2tcIjogcmV0dXJuIDMwMDtcbiAgICAgICAgICAgIGNhc2UgXCJub3JtYWxcIjogcmV0dXJuIDQwMDtcbiAgICAgICAgICAgIGNhc2UgXCJyZWd1bGFyXCIgOiByZXR1cm4gNDAwO1xuICAgICAgICAgICAgY2FzZSBcIm1lZGl1bVwiOiByZXR1cm4gNTAwO1xuICAgICAgICAgICAgY2FzZSBcInNlbWlib2xkXCI6IHJldHVybiA2MDA7XG4gICAgICAgICAgICBjYXNlIFwiZGVtaWJvbGRcIjogcmV0dXJuIDYwMDtcbiAgICAgICAgICAgIGNhc2UgXCJib2xkXCI6IHJldHVybiA3MDA7XG4gICAgICAgICAgICBjYXNlIFwiZXh0cmFib2xkXCI6IHJldHVybiA4MDA7XG4gICAgICAgICAgICBjYXNlIFwidWx0cmFib2xkXCI6IHJldHVybiA4MDA7XG4gICAgICAgICAgICBjYXNlIFwiYmxhY2tcIjogcmV0dXJuIDkwMDtcbiAgICAgICAgICAgIGNhc2UgXCJoZWF2eVwiOiByZXR1cm4gOTAwO1xuICAgICAgICAgICAgY2FzZSBcImV4dHJhYmxhY2tcIjogcmV0dXJuIDkwMDtcbiAgICAgICAgICAgIGNhc2UgXCJ1bHRyYWJsYWNrXCI6IHJldHVybiA5MDA7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gc3R5bGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWlsbGlzVG9NaW51dGVzQW5kU2Vjb25kcyhtaWxsaXMpIHtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IobWlsbGlzIC8gNjAwMDApO1xuICAgIGxldCBzZWNvbmRzID0gKChtaWxsaXMgJSA2MDAwMCkgLyAxMDAwKS50b0ZpeGVkKDApO1xuICAgIHJldHVybiAoXG4gICAgICAgIG1pbnV0ZXMgPT09IDAgPyBzZWNvbmRzICsgKHNlY29uZHMgPD0gMSA/IFwiIHNlY29uZFwiIDogXCIgc2Vjb25kc1wiKSA6IG1pbnV0ZXMgKyAobWludXRlcyA8PSAxID8gXCIgbWludXRlXCIgOiBcIiBtaW51dGUocylcIilcbiAgICApO1xuICB9XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vLyNyZWdpb24gVkFSSUFCTEVTXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gXCIuL2hlbHBlcnMuanNcIjtcbi8vb3RoZXJcbmxldCBhbGxOb2RlO1xubGV0IHNjYW5Nb2RlID0gZmFsc2U7XG5sZXQgaXNTY2FubmluZyA9IGZhbHNlO1xubGV0IGluZGV4ID0gMDtcbmZpZ21hLnNraXBJbnZpc2libGVJbnN0YW5jZUNoaWxkcmVuID0gdHJ1ZTtcbi8vI2VuZHJlZ2lvblxuc3RhcnQoKTtcbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRBbGxQYWdlc0FzeW5jKCk7XG4gICAgICAgIC8vI3JlZ2lvbiBGSUdNQSBVSVxuICAgICAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHsgdGhlbWVDb2xvcnM6IHRydWUsIHdpZHRoOiBoZWxwZXJzLlVJLndpZHRoLCBoZWlnaHQ6IGhlbHBlcnMuVUkuaGVpZ2h0IH0pO1xuICAgICAgICBmdW5jdGlvbiByZXNpemVVSSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgICAgICBmaWdtYS51aS5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBSRUxBVU5DSFxuICAgICAgICBmaWdtYS5yb290LnNldFJlbGF1bmNoRGF0YSh7IHJlbGF1bmNoOiAnJyB9KTtcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBNRVNTQUdFU1xuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwibm90aWZpY2F0aW9uXCIpXG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KG1zZy5ub3RpZmljYXRpb24pO1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09PSBcInJlc2l6ZS11aVwiKVxuICAgICAgICAgICAgICAgIHJlc2l6ZVVJKG1zZy53aWR0aCwgbXNnLmhlaWdodCk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwic2VsZWN0LW5vZGVcIilcbiAgICAgICAgICAgICAgICBzZWxlY3ROb2RlKG1zZy5pZCk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwiZ2V0LXRvdGFsLXRleHRzXCIpXG4gICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldC10b3RhbC10ZXh0c1wiLCB0b3RhbDogZ2V0VG90YWxUZXh0cygpIH0pO1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlID09IFwiY2hlY2tcIilcbiAgICAgICAgICAgICAgICBjaGVjayhhbGxOb2RlLnRleHRBcnJheSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwic2NhblwiKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIHNjYW5Nb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc1NjYW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY2FuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwic2V0LWNhbi1zY2FuXCIpXG4gICAgICAgICAgICAgICAgc2Nhbk1vZGUgPSBtc2cuc2Nhbk1vZGU7XG4gICAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwic2V0LWlzLXNjYW5uaW5nXCIpXG4gICAgICAgICAgICAgICAgaXNTY2FubmluZyA9IG1zZy5pc1NjYW5uaW5nO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBPTiBQQUdFIENIQU5HRVxuICAgICAgICBmaWdtYS5vbihcImN1cnJlbnRwYWdlY2hhbmdlXCIsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXQtdG90YWwtdGV4dHNcIiwgdG90YWw6IGdldFRvdGFsVGV4dHMoKSB9KTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJyZXNldC1zY2FuXCIgfSk7XG4gICAgICAgICAgICBzY2FuTW9kZSA9IGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gT04gRE9DVU1FTlQgQ0hBTkdFXG4gICAgICAgIGZpZ21hLm9uKFwiZG9jdW1lbnRjaGFuZ2VcIiwgKGV2ZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjaGFuZ2Ugb2YgZXZlbnQuZG9jdW1lbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09IFwiUFJPUEVSVFlfQ0hBTkdFXCIgJiYgY2hhbmdlLm5vZGUudHlwZSA9PSBcIlRFWFRcIiAmJiAhY2hhbmdlLnByb3BlcnRpZXMuaW5jbHVkZXMoXCJleHBvcnRTZXR0aW5nc1wiKSAmJiAhKGNoYW5nZS5wcm9wZXJ0aWVzLmxlbmd0aCA9PSAyICYmIGNoYW5nZS5wcm9wZXJ0aWVzLmluY2x1ZGVzKFwib3BhY2l0eVwiKSAmJiBjaGFuZ2UucHJvcGVydGllcy5pbmNsdWRlcyhcImV4cG9ydFNldHRpbmdzXCIpKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUb3RhbEFuZENoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gT04gU0VMRUNUSU9OIENIQU5HRVxuICAgICAgICBmaWdtYS5vbihcInNlbGVjdGlvbmNoYW5nZVwiLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiBzZXRUb3RhbEFuZENoZWNrKCk7IH0pKTtcbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBHRVQgTk9ERVxuICAgICAgICBmdW5jdGlvbiBnZXRBbGxOb2RlKG5vZGVzQXJyYXksIHRleHRBcnJheSA9IFtdLCBub2RlQXJyYXkgPSBbXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgbm9kZUFycmF5LnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gIT0gdW5kZWZpbmVkICYmIG5vZGUudmlzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWxsTm9kZShub2RlLmNoaWxkcmVuLCB0ZXh0QXJyYXksIG5vZGVBcnJheSk7IC8vIGluY2VwdGlvbiBzZWFyY2hcbiAgICAgICAgICAgICAgICBpZiAobm9kZS50eXBlID09IFwiVEVYVFwiICYmIG5vZGUudmlzaWJsZSlcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFycmF5LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0ZXh0QXJyYXksIG5vZGVBcnJheSB9O1xuICAgICAgICB9XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gU0NBTlxuICAgICAgICBmdW5jdGlvbiBzY2FuKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBhbGxOb2RlID0gZ2V0QWxsTm9kZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGtlZXBPbmx5KGFsbE5vZGUudGV4dEFycmF5KTtcbiAgICAgICAgICAgICAgICB5aWVsZCBjaGVjayhhbGxOb2RlLnRleHRBcnJheSwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIENIRUNLXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrKG5vZGVzID0gW10sIHNjYW5Nb2RlID0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCBnZXREYXRhRnJvbU5vZGUobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsTm9kZSAhPSB1bmRlZmluZWQgJiYgc2Nhbk1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGxOb2RlLnRleHRBcnJheS5pbmNsdWRlcyhmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIGdldERhdGFGcm9tTm9kZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxOb2RlLm5vZGVBcnJheS5pbmNsdWRlcyhub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInJlc2V0LXNjYW5cIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIGdldERhdGFGcm9tTm9kZShmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjaGVja1wiLCBpbmRleDogaW5kZXgsIHRvdGFsOiBub2Rlcy5sZW5ndGgsIGRhdGE6IGRhdGEsIHNjYW5Nb2RlOiBzY2FuTW9kZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyNlbmRyZWdpb25cbiAgICAgICAgLy8jcmVnaW9uIERBVEFcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0YUZyb21Ob2RlKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gdW5kZWZpbmVkICYmIG5vZGUudHlwZSA9PSBcIlRFWFRcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGFyYWN0ZXJzLmxlbmd0aCA+IDAgJiYgbm9kZS53aWR0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0Qnl0ZXMgPSB5aWVsZCBnZXRUZXh0Qnl0ZXMobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFja2dyb3VuZEJ5dGVzID0geWllbGQgZ2V0QmFja2dyb3VuZEJ5dGVzKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Qnl0ZXM6IHRleHRCeXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEJ5dGVzOiBiYWNrZ3JvdW5kQnl0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5vZGUuY2hhcmFjdGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQ6IGdldEZvbnREYXRhKG5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEJ5dGVzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRCeXRlczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBub2RlLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250OiBnZXRGb250RGF0YShub2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBrZWVwT25seShub2Rlcykge1xuICAgICAgICAgICAgbGV0IGFsbFRleHROb2RlSWQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgIT0gdW5kZWZpbmVkICYmIG5vZGUudHlwZSA9PSBcIlRFWFRcIilcbiAgICAgICAgICAgICAgICAgICAgYWxsVGV4dE5vZGVJZC5wdXNoKG5vZGUuaWQpO1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImtlZXAtb25seVwiLCBhbGxUZXh0SWQ6IGFsbFRleHROb2RlSWQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBJTUFHRVxuICAgICAgICBmdW5jdGlvbiBnZXRBbmNlc3RvcnNPcGFjaXR5KG5vZGUsIGFycmF5ID0gW10pIHtcbiAgICAgICAgICAgIGlmIChub2RlLm9wYWNpdHkgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2gobm9kZS5vcGFjaXR5KTtcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudC50eXBlICE9IFwiUEFHRVwiICYmIG5vZGUudHlwZSAhPSBcIlBBR0VcIiAmJiBub2RlLnBhcmVudCAhPSBudWxsICYmIG5vZGUucGFyZW50ICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBnZXRBbmNlc3RvcnNPcGFjaXR5KG5vZGUucGFyZW50LCBhcnJheSk7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0Qnl0ZXNGcm9tTm9kZShub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4cG9ydGVkTm9kZSA9IHlpZWxkIG5vZGUuZXhwb3J0QXN5bmMoeyBmb3JtYXQ6IFwiUE5HXCIsIGNvbnN0cmFpbnQ6IHsgdHlwZTogXCJTQ0FMRVwiLCB2YWx1ZTogMSB9IH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVzID0geWllbGQgZmlnbWEuY3JlYXRlSW1hZ2UoZXhwb3J0ZWROb2RlKS5nZXRCeXRlc0FzeW5jKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGV4dEJ5dGVzKG5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuZmlsbHMgIT09IGZpZ21hLm1peGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVjdGFuZ2xlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY3RhbmdsZSA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgICAgICAgICByZWN0YW5nbGUueCA9IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMF1bMl07XG4gICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS55ID0gbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybVsxXVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcmVjdGFuZ2xlLnJlc2l6ZShub2RlLndpZHRoLCBub2RlLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS5maWxscyA9IG5vZGUuZmlsbHM7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS5vcGFjaXR5ID0gZ2V0QW5jZXN0b3JzT3BhY2l0eShub2RlKS5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgLy9zbGljZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZSA9IGZpZ21hLmNyZWF0ZVNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLndpZHRoID4gMyAmJiBub2RlLmhlaWdodCA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnggPSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzBdWzJdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnkgPSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzFdWzJdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnJlc2l6ZShub2RlLndpZHRoIC0gMiwgbm9kZS5oZWlnaHQgLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnggPSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzBdWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UueSA9IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5yZXNpemUobm9kZS53aWR0aCwgbm9kZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gbm9kZS5vcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAvL3F1aWNrIGFuZCBkaXJ0eSB3YXkgdG8ga25vdyB3aGVuIGEgY2hhbmdlIGlzIG1hZGUgYnkgdGhlIHVzZXIgdnMgdGhlIHBsdWdpblxuICAgICAgICAgICAgICAgICAgICBsZXQgZXhwb3J0U2V0dGluZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG5vZGUuZXhwb3J0U2V0dGluZ3MpKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5leHBvcnRTZXR0aW5ncyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludDogeyB0eXBlOiAnU0NBTEUnLCB2YWx1ZTogMC4xMjM0NTY3ODkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50c09ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIlBOR1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeDogXCJjYXJhdmFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUFic29sdXRlQm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGdldEJ5dGVzRnJvbU5vZGUoc2xpY2UpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmV4cG9ydFNldHRpbmdzID0gZXhwb3J0U2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RhbmdsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBieXRlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5dGVzID0geWllbGQgZ2V0Qnl0ZXNGcm9tTm9kZShub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEJhY2tncm91bmRCeXRlcyhub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlID0gZmlnbWEuY3JlYXRlU2xpY2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS53aWR0aCA+IDMgJiYgbm9kZS5oZWlnaHQgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLnggPSBub2RlLmFic29sdXRlVHJhbnNmb3JtWzBdWzJdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UueSA9IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl0gKyAxO1xuICAgICAgICAgICAgICAgICAgICBzbGljZS5yZXNpemUobm9kZS53aWR0aCAtIDIsIG5vZGUuaGVpZ2h0IC0gMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzbGljZS54ID0gbm9kZS5hYnNvbHV0ZVRyYW5zZm9ybVswXVsyXTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UueSA9IG5vZGUuYWJzb2x1dGVUcmFuc2Zvcm1bMV1bMl07XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLnJlc2l6ZShub2RlLndpZHRoLCBub2RlLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gbm9kZS5vcGFjaXR5O1xuICAgICAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgYnl0ZXMgPSB5aWVsZCBnZXRCeXRlc0Zyb21Ob2RlKHNsaWNlKTtcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICAgICAgICAgIHNsaWNlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBieXRlcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gRk9OVFxuICAgICAgICBmdW5jdGlvbiBnZXRGb250RGF0YShub2RlKSB7XG4gICAgICAgICAgICBsZXQgc3R5bGVBcnJheSA9IG5vZGUuZ2V0U3R5bGVkVGV4dFNlZ21lbnRzKFsnZm9udE5hbWUnLCAnZm9udFNpemUnXSk7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBzdHlsZUFycmF5WzBdO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgc2l6ZTogc3R5bGUgIT0gdW5kZWZpbmVkID8gc3R5bGUuZm9udFNpemUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiBzdHlsZSAhPSB1bmRlZmluZWQgPyBzdHlsZS5mb250TmFtZVtcInN0eWxlXCJdIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgICAgICAvLyNyZWdpb24gU0VMRUNUXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdE5vZGUoaWQpIHtcbiAgICAgICAgICAgIGxldCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChpZCk7XG4gICAgICAgICAgICBpZiAobm9kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKGZpZ21hLmdldE5vZGVCeUlkKGlkKSk7XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8jZW5kcmVnaW9uXG4gICAgICAgIC8vI3JlZ2lvbiBPVEhFUlxuICAgICAgICBmdW5jdGlvbiBnZXRUb3RhbFRleHRzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldEFsbE5vZGUoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKS50ZXh0QXJyYXkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNldFRvdGFsQW5kQ2hlY2soKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0LXRvdGFsLXRleHRzXCIsIHRvdGFsOiBnZXRUb3RhbFRleHRzKCkgfSk7XG4gICAgICAgICAgICBpZiAoIWlzU2Nhbm5pbmcpXG4gICAgICAgICAgICAgICAgY2hlY2soW10sIHNjYW5Nb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUb3RhbEFuZENoZWNrKCk7XG4gICAgICAgIC8vI2VuZHJlZ2lvblxuICAgIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9