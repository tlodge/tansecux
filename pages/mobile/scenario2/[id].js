import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import {useCamera} from '../../../lib/useCamera'
import { useEffect, createRef, useRef, useState } from 'react'
import jsQR from 'jsqr';

export default function Scenario2() {

  const [code, setCode] = useState();

  const router = useRouter()
  const videoRef = createRef();
  const canvasRef = createRef();
  const requestRef = useRef()

  const [video, isCameraInitialised, running, setPlaying, error] = useCamera(videoRef);
  let canvas;

  const checkforQR = ()=>{

    const canvasElement = canvasRef.current;
  
    if (canvasElement){
     
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      try{
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);

        if (!code){
          const _code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (_code){
              setCode(_code);
              video.pause();
          }
        }
      }catch(err){
        //ignore...
      }
    }
    requestAnimationFrame(checkforQR);
  }

  const renderConfig = ()=>{
    return (
      <section className="bg-gray-300 p-4 pt-8 pl-8 pb-12">

      <div className="font-semibold text-lg mb-8"> successfully read in router configuration from qrcode</div>

      <div className=" font-semibold"> Router Public Key</div>
      <div className="pt-2 flex "><input type="textfield" className="h-8 w-3/4 pl-4"></input></div>
      
      <div className="pt-8 font-semibold"> Router Public Key</div>
      <div className="pt-2 flex "><input type="textfield" className="h-8 w-3/4 pl-4"></input></div>

      </section>);

  }

  const renderCamera = ()=>{
    return <><video
    ref={videoRef}
    autoPlay={true}
    muted={true}
    controls
    width="auto"
    height={400}/>   
    </>
  }

  useEffect(() => {
    
    const canvasElement = canvasRef.current;
    if (canvasElement){
       canvas = canvasElement.getContext("2d");
    }
    requestRef.current = requestAnimationFrame(checkforQR);
    return () => cancelAnimationFrame(requestRef.current);
  },[isCameraInitialised]); 

  useEffect(() => {
   
    const { id } = router.query
    if (id){
      subscribe(id, ({data})=>{
        const {path} = data;
        router.push(path);
      });
    }
  }, [router.query.id]);

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Two (mobile)</h2>
        </section>
        <section>
          {!code && renderCamera()}
          {code && renderConfig()}
          <canvas className="hidden" ref={canvasRef}></canvas>
        </section>
      </div>
     
    </div>
  );
}