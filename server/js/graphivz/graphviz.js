"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.createEdge = exports.createNodeColor = exports.createNode = exports.crearGrafico = void 0;
const graphviz_1 = __importDefault(require("graphviz"));
let graph = undefined;
function crearGrafico() {
    graph = graphviz_1.default.digraph("G");
}
exports.crearGrafico = crearGrafico;
function createNode(label) {
    if (!graph) {
        crearGrafico();
    }
    let node = graph.addNode(`${Math.random() * 10000}`, { "label": label });
    node.set("shape", "box");
    return node;
}
exports.createNode = createNode;
function createNodeColor(label, color) {
    let node = graph.addNode(`${Math.random() * 10000}`, { "label": label, "color": color });
    node.set("style", "filled, bold");
    node.set("shape", "doubleoctagon");
    return node;
}
exports.createNodeColor = createNodeColor;
function createEdge(parent, child) {
    graph.addEdge(parent, child);
}
exports.createEdge = createEdge;
function save() {
    graph.setGraphVizPath("./");
    // Generate a PNG output
    graph.output("png", "graphviz.png");
}
exports.save = save;
