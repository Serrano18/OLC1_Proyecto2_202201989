import graphviz from 'graphviz';

let graph:any = undefined;

export function crearGrafico() {
  graph = graphviz.digraph("G");

}

export function createNode( label: string) {
  if (!graph) {
    crearGrafico();
  }
  let node =  graph.addNode(`${Math.random()*10000}`, { "label": label});
  node.set("shape", "box")
  return node;

}

export function createNodeColor( label: string, color: any) {
  let node=  graph.addNode(`${Math.random()*10000}`, { "label": label, "color":color});
  node.set("style", "filled, bold")
  node.set("shape", "doubleoctagon")
  return node
}
export function createEdge( parent: any, child: any) {
  graph.addEdge(parent, child)
}

export function save(){
  
   graph.setGraphVizPath( "./" );
   // Generate a PNG output
   graph.output( "png", "graphviz.png" );

}