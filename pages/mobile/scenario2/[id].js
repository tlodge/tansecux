import { useRouter } from 'next/router'
import {subscribe, sendToRouter} from '../../../lib/ably'
import {useCamera} from '../../../lib/useCamera'
import { useEffect, createRef, useRef, useState } from 'react'
import jsQR from 'jsqr';

const expectedValues = {
  addresses: "192.168.2.34/32",
  listenPort: "51820",
  publicKey: "sTwsJLinpoUvGH7TwOkEE3Ph2V7hjutdAic/6RS7aHP=",
  endpointHost: "xor.freedns.org",
  endpointPort: "51825",
  allowedIPs: "192.168.94.2/32, 192.168.4.0/24",
}

export default function Scenario2() {

  const router = useRouter()
  const videoRef = createRef();
  const canvasRef = createRef();
  const requestRef = useRef();

  const [code, setCode] = useState();
  const [values, setValues] = useState({addresses:"",listenPort:"",publicKey:"",endpointHost:"", endpointPort:"", allowedIPs:""});
  const [valid, setValid]   = useState({addresses:false,listenPort:false,publicKey:false,endpointHost:false, endpointPort:false, allowedIPs:false});
  const [complete, setComplete] = useState(false);

  const handleChange = (field, value)=>{
    setValues({...values, [field]: value});
    setValid({...valid,   [field]: expectedValues[field]==value});  
  }

  const sendMessageToRouter = (message)=>{
    const { id } = router.query
    sendToRouter(id, message);
  }

  const [video, isCameraInitialised, running, setPlaying, error] = useCamera(videoRef);
  let canvas;

  const _setCode = (code)=>{
    setCode(code);
    setValues(expectedValues);
    setValid(Object.keys(expectedValues).reduce((acc, key)=>({...acc, [key]:true}),{}));
  }
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
              _setCode(_code);
              video.pause();
          }
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

  useEffect(() => {
    const _complete = Object.keys(expectedValues).reduce((acc,key)=>{
      return acc && valid[key];
    },true);
    if (_complete){
      sendMessageToRouter({type:"complete"});
    }
    setComplete(_complete);
  },[valid]);

  const renderComplete = ()=>{
    return <div className="p-4 bg-gray-500 text-white text-lg shadow rounded">Successfully configured on the mobile!  Thanks</div>
  }

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2  onClick={()=>_setCode("fake")} className="mb-3 text-xl font-bold">Scenario One (mobile)</h2>
          {complete && renderComplete()}
        </section>
        <section className="mb-4">
            This time, please hold the camera over the QRCode on the router.  Once it is recognised all of the configuration will be automatically filled in for you.
        </section>
        <section>
          {!code && renderCamera()}
          <canvas className="hidden" ref={canvasRef}></canvas>
        </section>
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">Interface</h2>
            <div className="font-semibold"> Private key </div>
            <div className="pt-6 flex "><input type="password" className="w-full h-12" value="my private key which you cannot see or copy"></input></div>  
            <div className="mt-6  font-semibold"> Public key </div>
            <div className="pt-6 flex "><input type="text" className="w-full h-12" value="wFwsYTinuuUvZZ5TwOkEE3Ph2V7rpqseA/cv6RS66HI="></input></div>       
            <div className="mt-6 font-semibold"> Addresses</div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input onChange={(e)=>handleChange("addresses", e.target.value)} type="text" className="w-full h-12 bg-indigo-300" value={values["addresses"]}></input>
                {valid["addresses"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>       
            <div className="font-semibold mt-4"> Listen Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input onChange={(e)=>handleChange("listenPort", e.target.value)} type="text" className="w-full h-12 bg-indigo-300" value={values["listenPort"]}></input>
                {valid["listenPort"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>      
        </section>
      
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">Peer</h2>
            <div className="font-semibold"> Public Key </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("publicKey", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["publicKey"]} ></input>
                 {valid["publicKey"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Endpoint Host</div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("endpointHost", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["endpointHost"]} ></input>
                 {valid["endpointHost"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Endpoint Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("endpointPort", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["endpointPort"]} ></input>
                 {valid["endpointPort"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Allowed IPs </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("allowedIPs", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["allowedIPs"]} ></input>
                 {valid["allowedIPs"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>    
        </section>
        <section className="mt-4">
        {complete && renderComplete()}
          </section>
      </div>
      
    </div>
    
  );
}