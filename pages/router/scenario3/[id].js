import * as React from "react";
import * as d3 from "d3";
import * as Ably from "ably";

var ably = new Ably.Realtime('HjnoqA.Jy57GA:iYNBLTlfpk5O62Wp');
var channel = ably.channels.get('tansecux');

// Publish a message to the test channel


const radius = 10;
const h = 1000;
const w = 1000;
let _filled = false;

function drawChart(svgRef) {

  const data = [12, 5, 6, 6, 9, 10];
  
  
  var drag = d3.drag().on("drag", dragmove).on("start", dragstart).on("end", dragend)

function dragmove(event, d) {
  //d3.select(this).raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
 
  d3.select(this).raise().attr("transform", `translate(${event.x-95}, ${event.y-108})`);
  if (event.x >= (100-10) && event.x <= (100+10)  &&  event.y >= (100-10) && event.y <= (100+10)){
     d3.select("circle.target").style("fill", "green");
     _filled = true;
  }else{
    if (_filled){
      d3.select("circle.target").style("fill", "red");
      _filled= false;
    }
  }
}
 function dragstart(d){
  //d3.select(this).attr("stroke", "black");
 }

 function dragend(d){
  channel.publish('greeting', 'dragend');
  //d3.select(this).attr("stroke", null);

 }
  const svg = d3.select(svgRef.current);
  
  const circles = d3.range(3).map(i => ({
    x: Math.random() * (w - radius * 2) + radius,
    y: Math.random() * (h - radius * 2) + radius,
    index: i
  }));

  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

 
    svg.selectAll("g.dragbox")
      //.data(circles)
      //.join("circle")
      //  .attr("cx", d => d.x)
      //  .attr("cy", d => d.y)
      //  .attr("r", radius)
      //  .attr("fill", d => d3.schemeCategory10[d.index % 10])
        .call(drag)
        //.on("click", clicked);
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



const IndexPage = () => {
  const svg = React.useRef(null);

  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (

    In this project we are looking at how we can make it easy for any person to set up a VPN.A VPN allows a person to access all of the devices in their home from their mobile phone,no matter where they are.  VPNs can be tricky to set up, and they require information to beshared between a router and a mobile phone.  We are investigating ways that this can bemade easier.  
    <div id="chart">
    
      <svg ref={svg}  width={w} height={h} viewBox="0 0 500 500"  style={{fillRule:"evenodd",clipRule:"evenodd",StrokeLinecap:"round",strokeLinejoin:"round",StrokeMiterlimit:1.5}}>
      <g className="dragbox">
    		<rect x="0" y="0" width="191.643" height="191.7" style={{fill:"none"}}/>
				<g className="tokpic">
					<path d="M80.191,84.982c-9.334,-5.406 -15.62,-15.505 -15.62,-27.061c0,-17.248 14.003,-31.25 31.25,-31.25c17.248,-0 31.25,14.002 31.25,31.25c0,11.562 -6.293,21.667 -15.637,27.071l12.525,21.716c4.595,-2.658 9.928,-4.179 15.612,-4.179c17.248,0 31.25,14.003 31.25,31.25c0,17.248 -14.002,31.25 -31.25,31.25c-17.247,0 -31.25,-14.002 -31.25,-31.25l-25,0c0,17.248 -14.002,31.25 -31.25,31.25c-17.247,0 -31.25,-14.002 -31.25,-31.25c0,-17.247 14.003,-31.25 31.25,-31.25c5.673,0 10.995,1.515 15.582,4.161l12.538,-21.708Zm59.38,36.297c6.899,0 12.5,5.601 12.5,12.5c0,6.899 -5.601,12.5 -12.5,12.5c-6.899,0 -12.5,-5.601 -12.5,-12.5c0,-6.899 5.601,-12.5 12.5,-12.5Zm-87.5,0c6.899,0 12.5,5.601 12.5,12.5c0,6.899 -5.601,12.5 -12.5,12.5c-6.899,0 -12.5,-5.601 -12.5,-12.5c0,-6.899 5.601,-12.5 12.5,-12.5Zm48.521,-27.154c-3.185,-1.106 -6.65,-1.106 -9.835,-0c-0.001,2.051 0.005,4.102 0.016,6.153c-2.721,1.664 -4.412,4.593 -4.492,7.781c-1.782,1.016 -3.561,2.037 -5.338,3.064c0.636,3.311 2.368,6.311 4.918,8.517c1.777,-1.025 3.551,-2.055 5.321,-3.091c2.801,1.525 6.184,1.525 8.985,0c1.771,1.036 3.545,2.066 5.321,3.091c2.55,-2.206 4.282,-5.206 4.918,-8.517c-1.776,-1.027 -3.555,-2.048 -5.337,-3.064c-0.081,-3.188 -1.772,-6.117 -4.493,-7.781c0.012,-2.051 0.017,-4.102 0.016,-6.153Zm-4.771,-48.704c6.899,-0 12.5,5.601 12.5,12.5c0,6.899 -5.601,12.5 -12.5,12.5c-6.899,-0 -12.5,-5.601 -12.5,-12.5c0,-6.899 5.601,-12.5 12.5,-12.5Z" style={{fill:"red",stroke:"#fff",strokeWidth:2.29}}/>
				</g>
        </g>
        <circle className="target" cx={100} cy={100} r="10" style={{fill:"red"}}/>
			</svg>
    </div>
  );
};

export default IndexPage;