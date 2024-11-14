// // import React, { useEffect, useState } from 'react';
// // //@ts-ignore
// // //import { Network, Node, Edge } from 'react-vis-network';
// // import { Options, Edge, Node } from "vis-network/standalone/esm/vis-network";
// // //import Graph from 'react-vis-network-graph';
// // import {useSelector} from "react-redux";
// // import {RootState} from "../../app/store";
// // import useVisNetwork from "./useVisNetwork";
// //
// // interface Message {
// //   id: string;
// //   text: string;
// // }
// //
// //
// // const nodes: Node[] = [
// //   {
// //     id: 1,
// //     label: "task 1",
// //     group: "start",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 2,
// //     label: "task 2",
// //     group: "2",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 3,
// //     label: "task 3",
// //     group: "3",
// //     image: "https://i.imgur.com/2GpcK19.jpeg"
// //   },
// //   {
// //     id: 4,
// //     label: "task 4",
// //     group: "2",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 5,
// //     label: "task 5",
// //     group: "3",
// //     image: "https://i.imgur.com/x9ZaLeT.jpeg"
// //   },
// //   {
// //     id: 6,
// //     label: "task 6",
// //     group: "start",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 7,
// //     label: "task 7",
// //     group: "2",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 8,
// //     label: "task 8",
// //     group: "3",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 9,
// //     label: "task 9",
// //     group: "4",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 10,
// //     label: "task 10",
// //     group: "5",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 11,
// //     label: "task 11",
// //     group: "6",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// //   {
// //     id: 12,
// //     label: "task 12",
// //     group: "7",
// //     image: "https://i.imgur.com/9K91Wz8.jpeg"
// //   },
// // ];
// //
// // const edges: Edge[] = [
// //   { from: 1, to: 2, id: 1, dashes: true },
// //   { from: 2, to: 3, id: 2, dashes: true },
// //   { from: 3, to: 4, id: 3, dashes: true },
// //   { from: 2, to: 5, id: 4, dashes: true },
// //   { from: 6, to: 7, id: 5, dashes: true },
// //   { from: 7, to: 8, id: 6, dashes: true },
// //   { from: 7, to: 5, id: 7, dashes: true },
// //   { from: 8, to: 9, id: 8, dashes: true },
// // ];
// //
// // const options: Options = {
// //   nodes: {
// //     shape: "image",
// //     size: 20,
// //     fixed: true
// //   },
// //   layout: {
// //     hierarchical: {
// //       direction: "DU",
// //       enabled: true
// //     }
// //   },
// //   edges: {
// //     color: '#645956',
// //     hoverWidth: 0,
// //     selectionWidth: 0,
// //   },
// //   interaction: {
// //     zoomView: false
// //   },
// //   physics: false,
// // };
// //
// // export const Home = () => {
// //   //const webSocket = useSelector((state: RootState) => state.websocketState?.webSocket);
// //
// //   const { ref, network } = useVisNetwork({
// //     options,
// //     edges,
// //     nodes
// //   });
// //
// //   const handleClick = () => {
// //     if (!network) return;
// //
// //     network.focus(5);
// //   };
// //
// //   useEffect(() => {
// //     if (!network) return;
// //
// //     network.once("beforeDrawing", () => {
// //       network.focus(5);
// //     });
// //     network.setSelection({
// //       edges: [1],
// //       nodes: [1]
// //     });
// //   }, [network]);
// //
// //   const handleClickNode = (event: any) => {
// //     const nodeId = event.nodes[0];
// //     //alert("Clicked to id:"+ nodeId);
// //   };
// //
// //   useEffect(() => {
// //     if (!network) return;
// //
// //     network.on("click", (params) => {
// //       if (params.nodes.length > 0) {
// //         handleClickNode(params);
// //       }
// //     });
// //   }, [network]);
// //
// //   return (
// //     <>
// //       <button onClick={handleClick}>Focus</button>
// //       <div style={{ background: '#d2c094', height: '100vh', overflow: 'auto'}} ref={ref} />
// //     </>
// //   );
// // };
// import React, { useEffect } from 'react';
// import { Options, Edge, Node, DataSet } from "vis-network/standalone/esm/vis-network";
// import useVisNetwork from "./useVisNetwork";
//
// const nodes: Node[] = [
//   { id: 1, label: "Start 1", group: "start", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 2, label: "Start 2", group: "start", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 3, label: "Start 3", group: "start", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 4, label: "Task 4", group: "6", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 5, label: "Task 5", group: "5", image: "https://i.imgur.com/2GpcK19.jpeg" },
//   { id: 6, label: "Task 6", group: "4", image: "https://i.imgur.com/x9ZaLeT.jpeg" },
//   { id: 7, label: "Task 7", group: "3", image: "https://i.imgur.com/9K91Wz8.jpeg", x: 1000, y: 10000 },
//   { id: 8, label: "Task 8", group: "2", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 9, label: "Task 9", group: "1", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 10, label: "Task 10", group: "3", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 11, label: "Task 11", group: "2", image: "https://i.imgur.com/9K91Wz8.jpeg" },
//   { id: 12, label: "Task 12", group: "1", image: "https://i.imgur.com/9K91Wz8.jpeg" },
// ];
//
// // const edges: Edge[] = [
// //   { from: 1, to: 4, id: 1, dashes: true },
// //   { from: 4, to: 5, id: 2, dashes: true },
// //   { from: 5, to: 6, id: 3, dashes: true },
// //   { from: 2, to: 7, id: 4, dashes: true },
// //   { from: 7, to: 8, id: 5, dashes: true },
// //   { from: 8, to: 6, id: 6, dashes: true },
// //   { from: 3, to: 9, id: 7, dashes: true },
// //   { from: 9, to: 10, id: 8, dashes: true },
// //   { from: 10, to: 11, id: 9, dashes: true },
// //   { from: 11, to: 12, id: 10, dashes: true },
// //   { from: 6, to: 12, id: 11, dashes: true },
// // ];
//
// const edges: Edge[] = [
//   { from: 1, to: 12, id: 1, dashes: true },
//   { from: 12, to: 8, id: 2, dashes: true },
//   { from: 8, to: 7, id: 3, dashes: true },
//   { from: 7, to: 4, id: 4, dashes: true },
//   { from: 2, to: 9, id: 5, dashes: true },
//   { from: 9, to: 11, id: 6, dashes: true },
//   { from: 11, to: 7, id: 7, dashes: true },
//   { from: 3, to: 6, id: 8, dashes: true },
//   { from: 6, to: 7, id: 9, dashes: true },
//   { from: 11, to: 4, id: 10, dashes: true },
//   // { from: 6, to: 12, id: 11, dashes: true },
// ];
// const options: Options = {
//   nodes: {
//     shape: "image",
//     size: 20,
//     fixed: {
//       x: true,
//       y: true,
//     }
//   },
//   layout: {
//     hierarchical: {
//       direction: "DU",
//       enabled: true,
//       sortMethod: "directed",
//       nodeSpacing: 150,
//     }
//   },
//   edges: {
//     color: '#645956',
//     hoverWidth: 0,
//     selectionWidth: 0,
//   },
//   interaction: {
//     zoomView: false
//   },
//   physics: {
//     enabled: false,
//   },
// };
//
// export const Map = () => {
//   const { ref, network } = useVisNetwork({
//     options,
//     edges,
//     nodes
//   });
//
//   const handleClick = () => {
//     if (!network) return;
//
//     network.focus(5);
//   };
//
//   useEffect(() => {
//     if (!network) return;
//
//     network.once("beforeDrawing", () => {
//       network.focus(5);
//     });
//     network.setSelection({
//       edges: [1],
//       nodes: [1]
//     });
//   }, [network]);
//
//   const handleClickNode = (event: any) => {
//     const nodeId = event.nodes[0];
//   };
//
//   useEffect(() => {
//     if (!network) return;
//
//     network.on("click", (params) => {
//       if (params.nodes.length > 0) {
//         handleClickNode(params);
//       }
//     });
//   }, [network]);
//
//   return (
//     <>
//       <button onClick={handleClick}>Focus</button>
//       <div style={{ background: '#d2c094', height: '200vh', overflow: 'auto' }} ref={ref} />
//     </>
//   );
// };
export {}
