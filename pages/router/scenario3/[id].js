import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'
import * as React from "react";
import * as d3 from "d3";
const radius = 10;
const h = 500;
const w = 900;
let _selected = null;

const targets = [[115,259],[323,259],[236,393],[444,393]];

function drawChart(svgRef, setSelected) {
    
    const svg = d3.select(svgRef.current);

    const data = [{id:0, colour:"#C2384F"},{id:1, colour:"#D1CB6C"}, {id:2, colour:"#6cb2d1"},{id:3, colour:"#DE7682"},{id:4, colour:"#C56CD1"},{id:5, colour:"#16935B"}];
    
    var drag = d3.drag().on("drag", dragmove).on("start", dragstart).on("end", dragend)

    const delta = 20;
    function dragmove(event, d) {
    
        const x = event.x+90;
        const y = event.y-49;
        
        d3.select(this).raise().attr("transform", `translate(${x}, ${y})`);
        for (let [i, t] of targets.entries()) {
            const [tx,ty] = t;
            if (event.x >= tx-delta && event.x <= tx+delta  &&  event.y >= ty-delta && event.y <= ty+delta){
                _selected = {id: d.id, position:i}
                svg.select(`circle.t${i}`).style("fill","red");
                break;
            }
            else{
                _selected = {id: d.id, position:-1}
                svg.select(`circle.t${i}`).style("fill","#8b9eb5");
            } 
        }
    }
    
    function dragstart(d){
        console.log("drag start", d.subject);
        //d3.select(this).attr("stroke", "black");
    }

    function dragend(d){
        
        setSelected(_selected);
       //d3.select(this).attr("stroke", null);
    }

    
    
    const draggers = svg.selectAll("g.root")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "dragbox")
        .attr("transform", (d,i)=>`translate(${140*i},10)`)
    
    draggers.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width",100)
        .attr("height",100)
        .style("fill", "none")
    
       
    draggers.append("g")
        .attr("transform", d=> d.id >= 3 ? `rotate(180,-100,48)`: `rotate(0)`)
        .append("path")
        .attr("d", "M-100.518,38.894c-6.23,-3.592 -10.433,-10.317 -10.448,-18.021c-0.022,-11.498 9.295,-20.851 20.793,-20.873c11.499,-0.022 20.852,9.295 20.874,20.794c0.014,7.708 -4.168,14.452 -10.391,18.067l8.378,14.461c3.06,-1.777 6.613,-2.798 10.403,-2.806c11.498,-0.022 20.851,9.296 20.873,20.794c0.022,11.498 -9.295,20.851 -20.794,20.873c-11.498,0.022 -20.851,-9.295 -20.873,-20.793l-16.666,0.031c0.022,11.499 -9.296,20.852 -20.794,20.874c-11.498,0.022 -20.851,-9.296 -20.873,-20.794c-0.022,-11.498 9.295,-20.851 20.794,-20.873c3.781,-0.007 7.331,0.996 10.392,2.754l8.332,-14.488Zm39.633,24.122c4.599,-0.008 8.34,3.718 8.349,8.318c0.009,4.599 -3.718,8.34 -8.318,8.349c-4.599,0.009 -8.34,-3.718 -8.349,-8.317c-0.009,-4.6 3.718,-8.341 8.318,-8.35Zm-58.334,0.112c4.6,-0.009 8.341,3.718 8.35,8.317c0.008,4.6 -3.718,8.341 -8.318,8.35c-4.599,0.008 -8.34,-3.719 -8.349,-8.318c-0.009,-4.599 3.718,-8.34 8.317,-8.349Zm32.313,-18.165c-2.125,-0.733 -4.435,-0.728 -6.557,0.013c0.002,1.367 0.009,2.735 0.019,4.102c-1.812,1.112 -2.936,3.068 -2.985,5.193c-1.187,0.68 -2.372,1.363 -3.554,2.049c0.427,2.207 1.586,4.205 3.289,5.672c1.183,-0.686 2.364,-1.375 3.543,-2.067c1.87,1.013 4.125,1.008 5.99,-0.012c1.182,0.688 2.366,1.373 3.552,2.054c1.697,-1.474 2.848,-3.476 3.267,-5.685c-1.185,-0.681 -2.373,-1.36 -3.562,-2.035c-0.057,-2.125 -1.189,-4.076 -3.005,-5.181c0.005,-1.368 0.006,-2.735 0.003,-4.103Zm-3.243,-32.463c4.6,-0.009 8.341,3.718 8.35,8.317c0.008,4.6 -3.719,8.341 -8.318,8.35c-4.599,0.008 -8.34,-3.718 -8.349,-8.318c-0.009,-4.599 3.718,-8.34 8.317,-8.349Z")  
        .style("fill", d=>d.colour)

    svg
        .attr("width", w)
        .attr("height", h)
        .style("margin-top", 0)
        .style("margin-left", 0);

    
    svg.selectAll("g.dragbox").call(drag)

}


const clicked = (event, d) =>{
  console.log("am clicked!!!");
  if (event.defaultPrevented) return; // dragged
  d3.select("circle").transition()
  .attr("fill", "black")
  .attr("r", radius * 2)
   .transition()
  .attr("r", radius)
  .attr("fill", d3.schemeCategory10[d.index % 10]);
}



const PATTERN = {0: 0, 1: 1, 5: 3};

const theSame = (d1, d2)=>{
    if (Object.keys(d1).length != Object.keys(d2).length){
        return false;
    }
    return Object.keys(d1).reduce((acc, key)=>{
        return acc && d1[key] == d2[key];
    },true);
}
export default function Scenario3() {

  const router = useRouter()
  const svg = React.useRef(null);
  
  const [selected, setSelected] = React.useState({});
  const [complete, setComplete] = React.useState(false);

  console.log(selected);
  console.log(complete);

  React.useEffect(() => {
    let _state = {};
    
    drawChart(svg, (item)=>{
        console.log("currenfr srare us", selected);
        _state = {
            ..._state,
            [item.id] : item.position
        }

        const _filtered = Object.keys(_state).reduce((acc, key)=>{
            const item = _state[key];
            if (item != -1){
                return {...acc, [key]:item}
            }
            return acc;    
        },{});
        
    
       setSelected(_filtered);
       setComplete(theSame(_filtered, PATTERN));
    });
  }, [svg]);

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const done = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/mobile/scenario3/feedback/${id}`});
    router.push(`feedback/${id}`);
  }
  
  const fail = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/mobile/scenario3/feedback/${id}`});
    router.push(`feedback/${id}`);
  }

 const renderRouter = ()=>{ 
        return <g transform="translate(50,180)">
                <path d="M440,42.555c-0,-23.412 -19.008,-42.419 -42.42,-42.419l-355.16,-0c-23.412,-0 -42.42,19.007 -42.42,42.419l0,205.161c0,23.412 19.008,42.42 42.42,42.42l355.16,-0c23.412,-0 42.42,-19.008 42.42,-42.42l-0,-205.161Z" style={{fill:"#fff"}}/>
                    <path d="M275.695,71.908l-0.036,5.963c2.441,1.188 3.915,3.74 3.723,6.448l1.756,0.967l0.004,-0.007l3.545,2.083l-2.99,5.088l-3.226,-1.896l-0.006,0.004l-1.991,-1.203c-2.248,1.52 -5.196,1.52 -7.445,-0l-1.991,1.203l-0.005,-0.004l-3.226,1.896l-2.99,-5.088l3.544,-2.083l0.005,0.007l1.756,-0.967c-0.192,-2.708 1.281,-5.26 3.722,-6.448l-0.051,-5.963l5.902,-0Zm-2.943,8.659c1.811,0 3.281,1.471 3.281,3.281c-0,1.811 -1.47,3.281 -3.281,3.281c-1.811,0 -3.281,-1.47 -3.281,-3.281c-0,-1.81 1.47,-3.281 3.281,-3.281Z" style={{fill:"#951c53"}}/>
                    <path d="M377.082,217.893l-0.035,-5.964c2.441,-1.187 3.915,-3.74 3.723,-6.447l1.756,-0.968l0.004,0.008l3.545,-2.083l-2.991,-5.088l-3.225,1.896l-0.006,-0.005l-1.991,1.204c-2.249,-1.521 -5.196,-1.521 -7.445,-0l-1.991,-1.204l-0.005,0.005l-3.226,-1.896l-2.99,5.088l3.544,2.083l0.005,-0.008l1.756,0.968c-0.193,2.707 1.281,5.26 3.722,6.447l-0.051,5.964l5.901,-0Zm-2.942,-8.66c1.81,0 3.281,-1.47 3.281,-3.281c-0,-1.811 -1.471,-3.281 -3.281,-3.281c-1.811,0 -3.281,1.47 -3.281,3.281c-0,1.811 1.47,3.281 3.281,3.281Z" style={{fill:"#951c53"}}/>
                    <path d="M45.453,179.059c4.644,0.203 9.33,1.159 13.896,2.939c7.387,2.88 13.543,7.56 18.165,13.345l20.221,-16.194c-9.397,-11.743 -12.454,-28.043 -6.603,-43.052c8.726,-22.384 33.984,-33.472 56.368,-24.746c22.384,8.727 33.473,33.985 24.746,56.369c-5.845,14.993 -19.106,24.918 -33.955,27.215l3.907,25.61c7.309,-1.124 14.999,-0.4 22.377,2.476c22.384,8.726 33.472,33.984 24.746,56.368c-1.518,3.893 -3.535,7.444 -5.953,10.611l-69.198,-0c-8.893,-11.672 -11.68,-27.57 -5.963,-42.233l-24.112,-9.4c-6.455,16.555 -21.951,26.931 -38.642,27.682l0,24.628l-3.601,0c-23.099,0 -41.852,-18.753 -41.852,-41.851l0,-206.064c0,-23.601 19.161,-42.762 42.762,-42.762l2.691,0l0,179.059Z" style={{fill:"#931652"}}/>
               
                    
                    

                    <path d="M169.957,217.893l-0.035,-5.964c2.441,-1.187 3.915,-3.74 3.723,-6.447l1.756,-0.968l0.004,0.008l3.545,-2.083l-2.991,-5.088l-3.226,1.896l-0.005,-0.005l-1.991,1.204c-2.249,-1.521 -5.196,-1.521 -7.445,-0l-1.991,-1.204l-0.005,0.005l-3.226,-1.896l-2.99,5.088l3.544,2.083l0.005,-0.008l1.756,0.968c-0.193,2.707 1.281,5.26 3.722,6.447l-0.051,5.964l5.901,-0Zm-2.942,-8.66c1.81,0 3.28,-1.47 3.28,-3.281c0,-1.811 -1.47,-3.281 -3.28,-3.281c-1.811,0 -3.281,1.47 -3.281,3.281c-0,1.811 1.47,3.281 3.281,3.281Z" style={{fill:"#951c53"}}/>
                
                    <path d="M53.414,198.09c3.517,4.948 2.354,11.821 -2.594,15.338c-4.949,3.517 -11.822,2.355 -15.339,-2.594c-3.517,-4.948 -2.355,-11.821 2.594,-15.338c4.949,-3.517 11.822,-2.355 15.339,2.594Z" style={{fill:"#8b9eb5",stroke:"#951c53",strokeWidth:"2.69px"}}/>
                    <path d="M53.414,234.259c3.517,4.948 2.354,11.821 -2.594,15.338c-4.949,3.517 -11.822,2.355 -15.339,-2.594c-3.517,-4.948 -2.355,-11.821 2.594,-15.338c4.949,-3.517 11.822,-2.355 15.339,2.594Z" style={{fill:"#8b9eb5",stroke:"#951c53",strokeWidth:"2.69px"}}/>
                    <path d="M68.569,71.908l-0.035,5.963c2.441,1.188 3.915,3.74 3.723,6.448l1.756,0.967l0.004,-0.007l3.545,2.083l-2.991,5.088l-3.225,-1.896l-0.006,0.004l-1.991,-1.203c-2.249,1.52 -5.196,1.52 -7.445,-0l-1.991,1.203l-0.005,-0.004l-3.226,1.896l-2.99,-5.088l3.544,-2.083l0.005,0.007l1.756,-0.967c-0.192,-2.708 1.281,-5.26 3.722,-6.448l-0.051,-5.963l5.901,-0Zm-2.942,8.659c1.811,0 3.281,1.471 3.281,3.281c-0,1.811 -1.47,3.281 -3.281,3.281c-1.811,0 -3.281,-1.47 -3.281,-3.281c-0,-1.81 1.47,-3.281 3.281,-3.281Z" style={
                    {fill:"#951c53"}}/>
                     <circle className="t0" cx="65" cy="50" r="8" style={{fill:"#8b9eb5"}}/>
                     <circle className="t1" cx="273" cy="50" r="8" style={{fill:"#8b9eb5"}}/>
                    <circle className="t2" cx="166" cy="239" r="8" style={{fill:"#8b9eb5"}}/>
                    <circle className="t3" cx="373.5" cy="239" r="8" style={{fill:"#8b9eb5"}}/>
                    
                   
                    
        </g>
 }
  return (
    <div style={{maxWidth:1000}}>
      <div >
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Three</h2>
        </section>
        <section className="flex flex-row bg-gray-500">
            <div className="p-6 flex justify-center text-white">
                    Please drag and drop the tokens in the screen below to match the pattern on the right.
            </div>
            <div className="bg-gray-800">
        <svg width="500px" height="100%" viewBox="0 0 177 109" version="1.1" style={{background:"transparent" ,fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5}}>
            <rect x="0" y="0" width="176.381" height="108.674" style={{fill:"#3b445a"}}/>
         
            <path d="M37.748,64.558C39.12,64.618 40.504,64.9 41.853,65.426C44.036,66.277 45.855,67.66 47.22,69.369L53.195,64.584C50.418,61.115 49.515,56.299 51.244,51.864C53.822,45.251 61.285,41.975 67.898,44.553C74.512,47.131 77.788,54.594 75.209,61.207C73.482,65.637 69.564,68.57 65.177,69.248L66.332,76.815C68.491,76.483 70.763,76.697 72.943,77.546C79.556,80.125 82.832,87.587 80.254,94.201C79.806,95.351 79.21,96.4 78.496,97.336L58.051,97.336C55.423,93.887 54.6,89.19 56.289,84.858L49.165,82.08C47.258,86.972 42.679,90.037 37.748,90.259L37.748,97.536L36.684,97.536C29.859,97.536 24.318,91.995 24.318,85.17L24.318,24.288C24.318,17.315 29.98,11.654 36.953,11.654L37.748,11.654L37.748,64.558Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.84}}/>
            <path d="M40.1,70.18C41.139,71.642 40.796,73.673 39.333,74.712C37.871,75.751 35.841,75.408 34.802,73.946C33.762,72.484 34.106,70.453 35.568,69.414C37.03,68.375 39.061,68.718 40.1,70.18Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.84}}/>
            <path d="M45.631,24.332C46.306,25.282 46.083,26.602 45.133,27.278C44.182,27.953 42.862,27.73 42.187,26.78C41.512,25.829 41.735,24.509 42.685,23.834C43.636,23.158 44.955,23.382 45.631,24.332Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.52}}/>
            <path d="M106.894,24.332C107.57,25.282 107.346,26.602 106.396,27.278C105.446,27.953 104.126,27.73 103.45,26.78C102.775,25.829 102.998,24.509 103.948,23.834C104.899,23.158 106.219,23.382 106.894,24.332Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.52}}/>
            <path d="M40.1,80.867C41.139,82.329 40.796,84.359 39.333,85.398C37.871,86.438 35.841,86.094 34.802,84.632C33.762,83.17 34.106,81.139 35.568,80.1C37.03,79.061 39.061,79.404 40.1,80.867Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.84}}/>
            <path d="M138.471,77.426C140.513,78.562 141.914,80.726 141.958,83.229C142.023,86.966 139.043,90.052 135.307,90.118C131.571,90.184 128.484,87.204 128.418,83.467C128.374,80.962 129.699,78.749 131.703,77.543L128.907,72.886C127.921,73.48 126.772,73.83 125.54,73.851C121.804,73.917 118.717,70.937 118.652,67.2C118.586,63.464 121.566,60.377 125.302,60.312C129.039,60.246 132.125,63.226 132.191,66.962L137.607,66.867C137.541,63.131 140.521,60.044 144.258,59.978C147.994,59.913 151.081,62.893 151.147,66.629C151.212,70.366 148.232,73.452 144.496,73.518C143.267,73.54 142.108,73.232 141.104,72.676L138.471,77.426ZM125.469,69.789C123.974,69.816 122.74,68.623 122.713,67.129C122.687,65.634 123.879,64.4 125.374,64.373C126.868,64.347 128.103,65.539 128.129,67.034C128.156,68.528 126.963,69.763 125.469,69.789ZM144.424,69.456C142.93,69.482 141.695,68.29 141.669,66.796C141.643,65.301 142.835,64.067 144.329,64.04C145.824,64.014 147.058,65.206 147.085,66.701C147.111,68.195 145.919,69.43 144.424,69.456ZM134.017,75.523C134.711,75.751 135.461,75.738 136.147,75.486C136.139,75.042 136.13,74.597 136.12,74.153C136.703,73.782 137.059,73.141 137.064,72.45C137.446,72.223 137.828,71.995 138.208,71.766C138.058,71.051 137.671,70.408 137.111,69.94C136.73,70.169 136.349,70.399 135.97,70.63C135.357,70.31 134.624,70.323 134.023,70.664C133.636,70.446 133.247,70.23 132.859,70.015C132.315,70.502 131.951,71.159 131.826,71.879C132.214,72.094 132.604,72.309 132.994,72.522C133.023,73.212 133.401,73.84 133.996,74.19C134.002,74.635 134.009,75.079 134.017,75.523ZM135.235,86.056C133.741,86.082 132.506,84.89 132.48,83.396C132.454,81.901 133.646,80.667 135.14,80.64C136.635,80.614 137.87,81.806 137.896,83.301C137.922,84.795 136.73,86.03 135.235,86.056Z" style={{fill:"#16935b"}}/>
            <path d="M108.408,31.478C110.451,30.343 111.851,28.179 111.895,25.675C111.961,21.939 108.981,18.852 105.244,18.787C101.508,18.721 98.421,21.701 98.356,25.438C98.312,27.942 99.636,30.155 101.64,31.361L98.844,36.018C97.859,35.425 96.709,35.075 95.478,35.054C91.741,34.988 88.655,37.968 88.589,41.704C88.523,45.441 91.504,48.527 95.24,48.593C98.976,48.659 102.063,45.679 102.129,41.942L107.544,42.038C107.479,45.774 110.459,48.861 114.195,48.926C117.932,48.992 121.018,46.012 121.084,42.275C121.15,38.539 118.17,35.452 114.433,35.387C113.204,35.365 112.046,35.673 111.042,36.229L108.408,31.478ZM95.406,39.115C93.912,39.089 92.677,40.281 92.651,41.776C92.625,43.27 93.817,44.505 95.311,44.531C96.806,44.558 98.04,43.365 98.067,41.871C98.093,40.376 96.901,39.142 95.406,39.115ZM114.362,39.449C112.867,39.422 111.633,40.614 111.606,42.109C111.58,43.603 112.772,44.838 114.267,44.864C115.761,44.891 116.996,43.699 117.022,42.204C117.048,40.71 115.856,39.475 114.362,39.449ZM103.954,33.381C104.648,33.154 105.399,33.167 106.085,33.419C106.077,33.863 106.068,34.307 106.058,34.752C106.641,35.122 106.996,35.764 107.001,36.454C107.383,36.681 107.765,36.909 108.146,37.138C107.996,37.853 107.609,38.497 107.048,38.965C106.667,38.736 106.287,38.506 105.907,38.275C105.295,38.595 104.562,38.582 103.961,38.241C103.573,38.458 103.185,38.675 102.796,38.89C102.252,38.403 101.888,37.746 101.763,37.026C102.152,36.811 102.541,36.596 102.931,36.383C102.961,35.693 103.338,35.064 103.934,34.714C103.939,34.27 103.946,33.826 103.954,33.381ZM105.173,22.849C103.678,22.822 102.444,24.014 102.417,25.509C102.391,27.003 103.583,28.238 105.078,28.264C106.572,28.291 107.807,27.099 107.833,25.604C107.86,24.11 106.668,22.875 105.173,22.849Z" style={{fill:"#d1cb6c"}}/>
            <path d="M47.216,31.492C49.259,30.357 50.659,28.193 50.703,25.69C50.768,21.953 47.788,18.867 44.052,18.801C40.316,18.735 37.229,21.715 37.163,25.452C37.119,27.957 38.444,30.169 40.448,31.376L37.652,36.033C36.666,35.439 35.517,35.089 34.285,35.068C30.549,35.002 27.462,37.982 27.397,41.719C27.331,45.455 30.311,48.542 34.047,48.607C37.784,48.673 40.871,45.693 40.936,41.957L46.352,42.052C46.286,45.788 49.267,48.875 53.003,48.941C56.739,49.006 59.826,46.026 59.892,42.29C59.957,38.553 56.977,35.467 53.241,35.401C52.012,35.379 50.853,35.687 49.85,36.243L47.216,31.492ZM34.214,39.13C32.719,39.103 31.485,40.295 31.459,41.79C31.432,43.285 32.624,44.519 34.119,44.546C35.613,44.572 36.848,43.38 36.874,41.885C36.901,40.391 35.709,39.156 34.214,39.13ZM53.169,39.463C51.675,39.437 50.44,40.629 50.414,42.123C50.388,43.618 51.58,44.852 53.074,44.879C54.569,44.905 55.803,43.713 55.83,42.218C55.856,40.724 54.664,39.489 53.169,39.463ZM42.762,33.395C43.456,33.168 44.206,33.181 44.892,33.433C44.885,33.877 44.876,34.322 44.865,34.766C45.448,35.137 45.804,35.778 45.809,36.469C46.191,36.696 46.573,36.924 46.953,37.153C46.803,37.867 46.416,38.511 45.856,38.979C45.475,38.75 45.094,38.52 44.715,38.289C44.102,38.609 43.369,38.596 42.768,38.255C42.381,38.473 41.993,38.689 41.604,38.904C41.06,38.417 40.696,37.76 40.571,37.04C40.96,36.825 41.349,36.61 41.739,36.397C41.768,35.707 42.146,35.079 42.742,34.729C42.747,34.284 42.754,33.84 42.762,33.395ZM43.981,22.863C42.486,22.837 41.251,24.029 41.225,25.523C41.199,27.018 42.391,28.252 43.885,28.279C45.38,28.305 46.615,27.113 46.641,25.618C46.667,24.124 45.475,22.889 43.981,22.863Z" style={{fill:"#c2384f"}}/>
            <path d="M154.318,24.227C154.318,17.31 148.703,11.694 141.785,11.694L36.852,11.694C29.934,11.694 24.318,17.31 24.318,24.227L24.318,84.843C24.318,91.76 29.934,97.376 36.852,97.376L141.785,97.376C148.703,97.376 154.318,91.76 154.318,84.843L154.318,24.227Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.84}}/>
            <path d="M105.774,32.899L105.763,34.661C106.484,35.012 106.92,35.766 106.863,36.566L107.382,36.852L107.383,36.85L108.431,37.465L107.547,38.968L106.594,38.408L106.592,38.41L106.004,38.054C105.34,38.503 104.469,38.503 103.804,38.054L103.216,38.41L103.215,38.408L102.261,38.968L101.378,37.465L102.425,36.85L102.427,36.852L102.945,36.566C102.889,35.766 103.324,35.012 104.045,34.661L104.03,32.899L105.774,32.899ZM104.904,35.458C105.439,35.458 105.874,35.892 105.874,36.427C105.874,36.962 105.439,37.397 104.904,37.397C104.369,37.397 103.935,36.962 103.935,36.427C103.935,35.892 104.369,35.458 104.904,35.458Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.4}}/>
            <path d="M44.578,32.899L44.567,34.661C45.288,35.012 45.724,35.766 45.667,36.566L46.186,36.852L46.187,36.85L47.234,37.465L46.351,38.968L45.398,38.408L45.396,38.41L44.808,38.054C44.144,38.503 43.273,38.503 42.608,38.054L42.02,38.41L42.019,38.408L41.065,38.968L40.182,37.465L41.229,36.85L41.231,36.852L41.749,36.566C41.693,35.766 42.128,35.012 42.849,34.661L42.834,32.899L44.578,32.899ZM43.708,35.458C44.243,35.458 44.678,35.892 44.678,36.427C44.678,36.962 44.243,37.397 43.708,37.397C43.173,37.397 42.739,36.962 42.739,36.427C42.739,35.892 43.173,35.458 43.708,35.458Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.4}}/>
            <path d="M135.729,76.031L135.719,74.269C136.44,73.918 136.875,73.164 136.819,72.364L137.337,72.078L137.339,72.081L138.386,71.465L137.503,69.962L136.549,70.522L136.548,70.521L135.96,70.876C135.295,70.427 134.424,70.427 133.76,70.876L133.172,70.521L133.17,70.522L132.217,69.962L131.334,71.465L132.381,72.081L132.382,72.078L132.901,72.364C132.844,73.164 133.28,73.918 134.001,74.269L133.986,76.031L135.729,76.031ZM134.86,73.473C135.395,73.473 135.829,73.038 135.829,72.503C135.829,71.968 135.395,71.534 134.86,71.534C134.325,71.534 133.89,71.968 133.89,72.503C133.89,73.038 134.325,73.473 134.86,73.473Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.5}}/>
            <path d="M75.401,82.145C76.077,83.095 75.853,84.415 74.903,85.09C73.953,85.766 72.633,85.542 71.957,84.592C71.282,83.642 71.505,82.322 72.455,81.646C73.406,80.971 74.726,81.194 75.401,82.145Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.5}}/>
            <path d="M74.533,76.031L74.523,74.269C75.244,73.918 75.679,73.164 75.623,72.364L76.141,72.078L76.143,72.081L77.19,71.465L76.306,69.962L75.353,70.522L75.352,70.521L74.764,70.876C74.099,70.427 73.228,70.427 72.564,70.876L71.976,70.521L71.974,70.522L71.021,69.962L70.137,71.465L71.185,72.081L71.186,72.078L71.705,72.364C71.648,73.164 72.083,73.918 72.805,74.269L72.79,76.031L74.533,76.031ZM73.664,73.473C74.199,73.473 74.633,73.038 74.633,72.503C74.633,71.968 74.199,71.534 73.664,71.534C73.129,71.534 72.694,71.968 72.694,72.503C72.694,73.038 73.129,73.473 73.664,73.473Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.5}}/>
            <path d="M136.795,82.145C137.471,83.095 137.247,84.415 136.297,85.09C135.347,85.766 134.027,85.542 133.351,84.592C132.676,83.642 132.899,82.322 133.849,81.646C134.8,80.971 136.12,81.194 136.795,82.145Z" style={{fill:"none",stroke:"#fff",strokeWidth:0.5}}/>
        </svg>  
        </div>
</section>
        <div id="chart" className="p4 bg-gray-800">
            <svg ref={svg}  width={w} height={h} viewBox="0 0 500 500"  style={{fillRule:"evenodd",clipRule:"evenodd",StrokeLinecap:"round",strokeLinejoin:"round",StrokeMiterlimit:1.5}}>
                {renderRouter()}
			</svg>
        </div>
        <section className="flex flex-row justify-center p-8">
            <button className="p-4 uppercase font-bold" onClick={done}>Done!</button>
            <button className="p-4 uppercase font-bold" onClick={fail}>I couldn't do this</button>
        </section>
      </div>
     
    </div>
  );
}