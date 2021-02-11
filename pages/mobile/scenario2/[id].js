import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import {useCamera} from '../../../lib/useCamera'
import { useEffect, createRef, useRef } from 'react'
import jsQR from 'jsqr';

export default function Scenario2() {

  const router = useRouter()
  const videoRef = createRef();
  const canvasRef = createRef();
  const requestRef = useRef()

  const [video, isCameraInitialised, running, setPlaying, error] = useCamera(videoRef);
  let canvas;


  const drawLine = (begin, end, color)=>{
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  const checkforQR = ()=>{

    const canvasElement = canvasRef.current;
  
    if (canvasElement){
     
      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      try{
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code){
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        }
      }catch(err){
        //ignore...
      }
    }
    requestAnimationFrame(checkforQR);
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
          {renderCamera()}
          <canvas ref={canvasRef}></canvas>
        </section>
      </div>
     
    </div>
  );
}