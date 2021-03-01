import { useRouter } from 'next/router'
import {sendToMobile} from '../../../../lib/ably'
import Image from "next/image";

export default function Scenario3Intro() {

  const router = useRouter()


  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  const start = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/m/s3/${id}`});
    router.push(`../${id}`);
  }
  

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the third scenario</h2>
        </section>
        <div className="bg-gray-700  text-white p-4 rounded">
        <section>
            <p className="pt-4 pb-4">In the final scenario, we will use physical tokens to transfer the keys.  Because you are doing this online, we have created mock tokens and token reader.</p>
        </section>
        <section className="flex justify-center">
        {<Image
            src="/threeinfo.svg"
            width={800}
            height={400}
            priority
            alt="Scenario3 router and token overview"/>
        }
        </section>
        <section>
            <p className="pt-4 pb-4">We will ask you to drag and drop tokens to match a particular pattern (in the real world you'd physically place the tokens on the reader).  Once the pattern matches the configuration details will be written to a token which can then be touched on the mobile device to set up the tunnel.</p>
        </section>
        </div>
        <section className="pt-8 flex justify-center">
            <a className="uppercase font-bold" onClick={start}>start scenario three</a>
        </section>
      </div>
     
    </div>
  );
}