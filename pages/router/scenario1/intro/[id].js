import { useRouter } from 'next/router'
import {sendToMobile} from '../../../../lib/ably'

export default function Scenario1Intro() {

  const router = useRouter()

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const start = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`../${id}`});
    router.push(`../${id}`);
  }
  

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the first scenario</h2>
        </section>
        <section>
            <p className="pt-4 pb-4">Thank you, looks like we're ready to start.  You should see that the website on your mobile phone is also waiting and ready to start.  </p>
            <p className="pt-4 pb-4">In the following scenario, the router (your desktop/laptop) will need some information from the mobile phone (the mobile phone's public key) and the mobile phone will need some information from the router (tunnel configuration parameters and router public key).  We will ask you to manually enter the information on each screen. </p>
        </section>
        <section className="pt-8 flex justify-center">
            <a className="uppercase font-bold" onClick={start}>try scenario one</a>
        </section>
      </div>
     
    </div>
  );
}