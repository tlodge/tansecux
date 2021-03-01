import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {subscribe} from '../../../../lib/ably'

export default function Scenario3Intro() {

  const router = useRouter()
  
  useEffect(() => {
   
    const { id } = router.query
    if (id){
       
        subscribe(id, ({data})=>{
            const {path} = data;
            router.push(path);
        });
    }
  }, [router.query.id]);


  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">About the third scenario</h2>
        </section>
        <section className="bg-gray-700  text-white p-4 rounded">
            <p className="pt-4 pb-4">In the following scenario, the router (your desktop/laptop) will need some information from the mobile phone (the mobile phone's public key) and the mobile phone will need some information from the router (tunnel configuration parameters and router public key).  We will ask you to manually enter the information on each screen. </p>
            
        </section>
        <div className="font-bold text-lg text-center mt-4">WAITING AND READY TO START</div>
      </div>
    </div>
  );
}