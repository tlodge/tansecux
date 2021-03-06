import { useRouter } from 'next/router'
import {sendToMobile} from '../../../../lib/ably'

export default function Scenario2Intro() {

  const router = useRouter()
 

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const start = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/m/s2/${id}`});
    router.push(`../${id}`);
  }
  

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the second scenario</h2>
        </section>
        <section className="bg-gray-700  text-white p-4 rounded">
            <p className="pt-4 pb-4">In the next scenario, we will use a qrcode and your mobile phone's camera to help move some of the information between the router and mobile phone.  You will still need to get the public key from your mobile phone onto the router.  </p>
        </section>
        <section className="pt-8 flex justify-center">
            <a className="uppercase font-bold" onClick={start}>start scenario two</a>
        </section>
      </div>
     
    </div>
  );
}