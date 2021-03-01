import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'

export default function Scenario1Intro() {

  const router = useRouter()
  
  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const start = ()=>{
    const { id } = router.query;
  
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/m/s1/start/${id}`});
    router.push(`/r/s1/start/${id}`);
  }
  
 

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the first scenario</h2>
        </section>
        <section className="bg-gray-200 rounded p-6">
            <p className="pt-4 pb-4">Thank you, welcome to the first scenario. You should see that the website on your mobile phone is also waiting and ready to start.  </p>
            <p className="pt-4 pb-4"> To complete this scenario you will need copy the configuration parameters on the desktop/laptop to your mobile phone and you will need to copy <strong>six</strong> configuration parameters on the mobile phone onto the form on your desktop/laptop, and <strong>configuration parameter from your mobile to your desktop/laptop</strong></p>
        </section>
        <section className="pt-8 flex justify-center">
            <a className="uppercase font-bold" onClick={start}>start scenario one</a>
        </section>
      </div>
     
    </div>
  );
}