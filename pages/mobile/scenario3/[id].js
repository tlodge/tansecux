import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import { useEffect } from 'react'

export default function Scenario3() {

  const router = useRouter()

  useEffect(() => {
   
    const { id } = router.query
    if (id){
      subscribe(id, ({data})=>{
        console.log("ok seen path come in", data);
        const {path} = data;
        router.push(path);
      });
    }
  }, [router.query.id]);

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Three (mobile)</h2>
        </section>
        <section>
          Tap the token when ready to be tapped!
         </section>
      </div>
     
    </div>
  );
}