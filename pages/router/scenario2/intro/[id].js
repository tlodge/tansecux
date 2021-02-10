import { useRouter } from 'next/router'
import {sendToMobile} from '../../../../lib/ably'

export default function Scenario2Intro() {

  const router = useRouter()
  const { id } = router.query

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const start = ()=>{
    const { id } = router.query;
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario2/${id}`});
    router.push(`../${id}`);
  }
  

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the second scenario</h2>
        </section>
        <section>
            <p className="pt-4 pb-4">In the next scenario, we will use a QR code and your mobile phone's camera to help move some of the information between the router and mobile phone.  You will still be required to get the public key from your mobile phone onto the router.  </p>
        </section>
        <section className="pt-8 flex justify-center">
            <a className="uppercase font-bold" onClick={start}>try scenario two</a>
        </section>
      </div>
     
    </div>
  );
}