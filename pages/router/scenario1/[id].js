import { useRouter } from 'next/router'
import {sendToMobile} from '../../../lib/ably'

export default function Scenario1() {

  const router = useRouter()

  const sendMessageToMobile = ()=>{
    const { id } = router.query
    sendToMobile(id, "hello mobile!");
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario One</h2>
        </section>
      </div>
      <button onClick={sendMessageToMobile}>CLICK ME!!</button>
    </div>
  );
}