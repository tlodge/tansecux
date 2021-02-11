import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'
import QRCode from 'qrcode';
import {createRef, useEffect} from 'react';

export default function Scenario2() {

  const router = useRouter()
  const canvasRef = createRef();
  
  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, 'sample text', function (error) {
      if (error) console.error(error)
      console.log('success!');
    });
  },[]);

  const done = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/mobile/scenario2/feedback/${id}`});
    router.push(`feedback/${id}`);
  }
  
  const fail = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/mobile/scenario2/feedback/${id}`});
    router.push(`feedback/${id}`);
  }

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Two</h2>
        </section>
        <section>
            <canvas id="canvas" ref={canvasRef}></canvas>
        </section>
        <section>
          You will need to hold your mobile phone up to this qrcode transfer the configurationto your phone.  You will then need to copy the <strong>public key</strong> from your mobile phone to the <strong>Public Key</strong> field in the Peer section.    </section>
        <section className="flex flex-row justify-center p-8">
            <button className="p-4 uppercase font-bold" onClick={done}>Done!</button>
            <button className="p-4 uppercase font-bold" onClick={fail}>I couldn't do this</button>
        </section>
      </div>
     
    </div>
  );
}