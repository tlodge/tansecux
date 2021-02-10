import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'

export default function Scenario1() {

  const router = useRouter()

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const done = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario1/feedback/${id}`});
    router.push(`feedback/${id}`);
  }
  
  const fail = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario1/feedback/${id}`});
    router.push(`feedback/${id}`);
  }

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario One</h2>
        </section>
        <section>
            You will need to provide the <strong>Addresses</strong> and  <strong>Listen Port</strong> information (in the Interface section) and the <strong>Public Key, Allowed IPs</strong> and <strong>Endpoint</strong> information (in the Peer section) to the mobile phone.
        </section>
        <section className="flex flex-row justify-center p-8">
            <button className="p-4 uppercase font-bold" onClick={done}>Done!</button>
            <button className="p-4 uppercase font-bold" onClick={fail}>I couldn't do this</button>
        </section>
      </div>
     
    </div>
  );
}