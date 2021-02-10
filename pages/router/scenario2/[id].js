import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'

export default function Scenario2() {

  const router = useRouter()

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const done = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario2/feedback/${id}`});
    router.push(`feedback/${id}`);
  }
  
  const fail = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario2/feedback/${id}`});
    router.push(`feedback/${id}`);
  }

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Two</h2>
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