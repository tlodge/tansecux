import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {subscribe} from '../../../lib/ably'

export default function Scenario1Intro() {

  const router = useRouter()
  
  useEffect(() => {
   
    const { id } = router.query
    if (id){
       
        subscribe(id, ({data})=>{
            console.log("ok seen path come in", data);
            const {path}= data;
            router.push(path);
        });
    }
  }, [router.query.id]);


  return (
    <div>
      <section className="mb-4">
          <h2 className="mb-3 text-xl font-bold">About the first scenario</h2>
      </section>
      <div className="bg-gray-200 rounded p-6">  
        <section>
            <p className="pt-4 pb-4">In the following scenario, the router (your desktop/laptop) will need some information from the mobile phone (the mobile phone's public key) and the mobile phone will need some information from the router (tunnel configuration parameters and router public key).  We will ask you to enter the information on each screen. </p>
            <div className="mt-4 text-center font-bold text-lg">WAITING AND READY TO START</div>
        </section>
      </div>
    </div>
  );
}