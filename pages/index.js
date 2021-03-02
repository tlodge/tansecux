
import QRCode from 'qrcode';
import {createRef, useEffect, useState} from 'react';

const IndexPage = ({id, home}) => {
  const canvasRef = createRef();
  

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, `${home}/m/s1/${id}`, {scale:5}, function (error) {
      if (error) console.error(error)
    });
  },[]);

  return (
    <div id="welcome">
      <div className="bg-gray-200 rounded p-6">
        <div className="mt-4">
          In this project we are investigating how we can improve the process of setting up <strong>VPN on a mobile phone.</strong>
        </div>
        <div className="mt-4">
          A VPN allows a person to access devices in their home, from their mobile phone, no matter where they are. VPNs can be fiddly to set up, and they require information to be shared between a router and a mobile phone. 
        </div>
        <div className="mt-4 mb-4">
            To take part in these experiments we need you to use two devices. One device should be a <strong>laptop or desktop</strong>, and the other a <strong>mobile phone</strong>. You will need to access a url on a browser on each device;  To get going please use the following two urls:
        </div>
        </div>
        <div className="flex flex-row mt-4">            
          <div className="flex flex-col p-6 flex-grow justify-top items-center">
            <div>Click the following url on your desktop:</div>
            <div className="m-4 font-bold"><a href={`/r/s1/${id}`} target="_blank">{`${home}/r/s1/${id}`}</a></div>
          </div> 
          <div className="flex flex-col p-6 flex-grow justify-center items-center">
            <div>Enter the following url on your mobile:</div>
            <div className="m-4 font-bold"><a href={`/m/s1/${id}`} target="_blank">{`${home}/m/s1/${id}`}</a></div>
            <section className="flex justify-center">
              <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
            </section>
          </div> 
        </div>
        <div className="mt-4 text-center">
            You will then be provided with instructions on how to proceed.
        </div>


    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {id: Math.round(Math.random()  * 500), home: process.env.ROOT}
  }
}

export default IndexPage;