import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import { useEffect } from 'react'

export default function Scenario1() {

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
          <h2 className="mb-3 text-xl font-bold">Scenario One (mobile)</h2>
        </section>
        <section>
            You will need to provide the <strong>Addresses</strong> and  <strong>Listen Port</strong> information (in the Interface section) and the <strong>Public Key, Allowed IPs</strong> and <strong>Endpoint</strong> information (in the Peer section) to the mobile phone.
        </section>
      </div>
     
    </div>
  );
}