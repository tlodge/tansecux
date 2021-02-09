import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {subscribe} from '../../../../lib/ably'

export default function Scenario1Intro() {

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
          <h2 className="mb-3 text-xl font-bold">About the second scenario</h2>
        </section>
        <section>
            <p className="pt-4 pb-4">In the following scenario, you'll use a QRCODE to configure your mobile. </p>
            <div>WAITING AND READY TO START</div>
        </section>
      </div>
    </div>
  );
}