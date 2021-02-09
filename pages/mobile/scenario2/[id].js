import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import { useEffect } from 'react'

export default function Scenario2() {

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
          <h2 className="mb-3 text-xl font-bold">Scenario Two (mobile)</h2>
        </section>
        <section>
          Take a QR picture please    
        </section>
      </div>
     
    </div>
  );
}