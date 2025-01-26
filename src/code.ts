//#region VARIABLES
import * as helpers from "./helpers.js";
//other
let allNode;

let scanMode = false;
let isScanning = false;

let index = 0;

figma.skipInvisibleInstanceChildren = true;

//#endregion

start();
async function start()
{
    await figma.loadAllPagesAsync();

    //#region FIGMA UI
    figma.showUI(__html__,  {  themeColors: true, width: helpers.UI.width, height: helpers.UI.height });

    function resizeUI(width, height)
    {
        figma.ui.resize(width, height);
    }
    //#endregion

    //#region RELAUNCH
    figma.root.setRelaunchData({ relaunch: '' });
    //#endregion

    //#region MESSAGES
    figma.ui.onmessage = async msg =>
    {
        if (msg.type === "notification") figma.notify(msg.notification);
        if (msg.type === "resize-ui") resizeUI(msg.width, msg.height);
        if (msg.type === "select-node") await selectNode(msg.id);
        if (msg.type === "get-total-texts") figma.ui.postMessage({type:"set-total-texts" ,total: getTotalTexts()}); 
        if (msg.type == "check") check(allNode.textArray,true);
        if (msg.type === "scan")
        {
            index = 0;
            scanMode = true;
            isScanning = true;
            scan();
        }
        if (msg.type === "set-can-scan") scanMode = msg.scanMode;
        if (msg.type === "set-is-scanning") isScanning = msg.isScanning;
    }
    //#endregion

    //#region ON PAGE CHANGE
    figma.on("currentpagechange", async  () =>
    { 
        figma.ui.postMessage({type:"set-total-texts" ,total: getTotalTexts()});
        figma.ui.postMessage({type:"reset-scan"}); 
        scanMode = false;
    });
    //#endregion

    //#region ON DOCUMENT CHANGE
    figma.on("documentchange", async  (event) =>
    { 
        for(let change of event.documentChanges)
        {
            if(change.type == "PROPERTY_CHANGE" && change.node.type == "TEXT" && !change.properties.includes("exportSettings") && !(change.properties.length == 2 && change.properties.includes("opacity") && change.properties.includes("exportSettings")))
            {
                setTotalAndCheck();
            }
        }
    });
    //#endregion

    //#region ON SELECTION CHANGE
    figma.on("selectionchange", async  () => setTotalAndCheck());
    //#endregion

    //#region GET NODE
    function getAllNode(nodesArray, textArray = [], nodeArray = [])
    {
        for (let node of nodesArray)
        {
            nodeArray.push(node);
            if(node.children != undefined && node.visible) getAllNode(node.children, textArray, nodeArray); // inception search
            if(node.type == "TEXT" && node.visible) textArray.push(node);
        }
        return {textArray, nodeArray};
    }

    //#endregion


    //#region SCAN
    async function scan()
    {
        allNode = getAllNode(figma.currentPage.selection);
        keepOnly(allNode.textArray);
        await check(allNode.textArray, true);
    }

    //#endregion

    //#region CHECK

    async function check (nodes = [], scanMode = false) // also call by ui.ts via plugin message
    { 
        let data;
        let node = nodes[index];

        if(index < nodes.length)
        {
            data = await getDataFromNode(node);
            index++;
        }
        else
        {
            if(allNode != undefined && scanMode)
            {
                if(allNode.textArray.includes(figma.currentPage.selection[0]))
                {
                    data = await getDataFromNode(figma.currentPage.selection[0]);
                }
                else
                {
                    for(let node of figma.currentPage.selection)
                    {
                        if(!allNode.nodeArray.includes(node))
                        {
                            figma.ui.postMessage({type:"reset-scan"}); 
                            break;
                        }
                    }
                }
            }
            else
            {
                data = await getDataFromNode(figma.currentPage.selection[0]);
            }
        
            index = 0;
        }

        if(data != undefined)
        {
            figma.ui.postMessage({type:"check", index:index, total:nodes.length,  data:data, scanMode:scanMode});
        }

    }
    //#endregion

    //#region DATA
    async function getDataFromNode(node)
    {
        let data;
        if(node != undefined && node.type == "TEXT")
        {
            if(node.characters.length > 0 && node.width > 0)
            {
                let textBytes = await getTextBytes(node);
                let backgroundBytes  = await getBackgroundBytes(node);
                data =
                {
                    textBytes: textBytes,
                    backgroundBytes: backgroundBytes,
                    name: node.characters,
                    id: node.id,
                    font: getFontData(node)
                }
            }
            else
            {
                data =
                {
                    textBytes: undefined,
                    backgroundBytes: undefined,
                    name: undefined,
                    id: node.id,
                    font: getFontData(node)
                }
            }
        }
        return data;
    }

    function keepOnly(nodes)
    {
        let allTextNodeId = [];
        for(let node of nodes) if(node != undefined && node.type == "TEXT" ) allTextNodeId.push(node.id);
        figma.ui.postMessage({type:"keep-only", allTextId:allTextNodeId });
    }
    //#endregion

    //#region IMAGE

    function getAncestorsOpacity(node, array = [])
    {
        if(node.opacity != undefined) array.push(node.opacity);
        if(node.parent.type != "PAGE" && node.type != "PAGE" && node.parent != null && node.parent != undefined) getAncestorsOpacity(node.parent, array);
        return array;
    }

    async function getBytesFromNode(node)
    {
        const exportedNode = await node.exportAsync({format:"PNG", constraint:{ type: "SCALE", value: 1 }});
        const bytes = await figma.createImage(exportedNode).getBytesAsync();
        return bytes;
    }

    async function getTextBytes(node)
    {
        if (node.fills !== figma.mixed)
        {
            //rectangle
            const rectangle = figma.createRectangle();
            rectangle.x = node.absoluteTransform[0][2];
            rectangle.y = node.absoluteTransform[1][2];
            rectangle.resize(node.width,node.height);
            rectangle.fills = node.fills;
            rectangle.opacity = getAncestorsOpacity(node).reduce((a, b)=> a*b, 1);
            //slice
            const slice = figma.createSlice();
            if(node.width > 3 && node.height > 3)
            {
                slice.x = node.absoluteTransform[0][2] + 1;
                slice.y = node.absoluteTransform[1][2] + 1;
                slice.resize(node.width - 2, node.height - 2);
            }
            else
            {
                slice.x = node.absoluteTransform[0][2];
                slice.y = node.absoluteTransform[1][2];
                slice.resize(node.width, node.height);
            }
            let opacity = node.opacity;
            node.opacity = 0;
            //quick and dirty way to know when a change is made by the user vs the plugin
            let exportSettings = JSON.parse(JSON.stringify(node.exportSettings));
            node.exportSettings = [{
                constraint: {type: 'SCALE', value: 0.123456789},
                contentsOnly: true,
                format: "PNG",
                suffix: "caravage",
                useAbsoluteBounds: false,
            }];
            const bytes = await getBytesFromNode(slice);
            node.exportSettings = exportSettings;
            node.opacity = opacity;
            rectangle.remove();
            slice.remove();
            return bytes;
        }
        else
        {
            const bytes = await getBytesFromNode(node);
            return bytes;
        }
    }

    async function getBackgroundBytes(node)
    {
        const slice = figma.createSlice();
        if(node.width > 3 && node.height > 3)
        {
            slice.x = node.absoluteTransform[0][2] + 1;
            slice.y = node.absoluteTransform[1][2] + 1;
            slice.resize(node.width - 2, node.height - 2);
        }
        else
        {
            slice.x = node.absoluteTransform[0][2];
            slice.y = node.absoluteTransform[1][2];
            slice.resize(node.width, node.height);
        }
        let opacity = node.opacity;
        node.opacity = 0;
        const bytes = await getBytesFromNode(slice);
        node.opacity = opacity;
        slice.remove();
        return bytes;
    }
    //#endregion

    //#region FONT

    function getFontData(node)
    {
        let styleArray = node.getStyledTextSegments(['fontName', 'fontSize']);
        let style = styleArray[0];
        let  data =
        {
            size : style != undefined ? style.fontSize : undefined,
            weight: style != undefined ? style.fontName["style"] : undefined,
        }
        return data;
    }
    //#endregion

    //#region SELECT

    async function selectNode(id: string) {
        let nodes = [];
        let node = await figma.getNodeByIdAsync(id); 
        if (node != undefined) {
            nodes.push(node);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
        }
    }

    //#endregion

    //#region OTHER
    function getTotalTexts()
    {
        return getAllNode(figma.currentPage.selection).textArray.length;
    }

    function setTotalAndCheck()
    {
        figma.ui.postMessage({type:"set-total-texts" ,total: getTotalTexts()});
        if(!isScanning) check([], scanMode);
    }
    setTotalAndCheck();
    //#endregion
}
