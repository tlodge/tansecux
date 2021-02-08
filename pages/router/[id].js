import { useEffect } from 'react'
import * as Ably from "ably";
import { useRouter } from 'next/router'
var ably = new Ably.Realtime('HjnoqA.Jy57GA:iYNBLTlfpk5O62Wp');
var channel = ably.channels.get('tansecux');

export default function MobilePage() {

  const router = useRouter()
  
  const sendMessageToMobile = ()=>{
    const { id } = router.query
    channel.publish(id, 'hello mobile!');
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">What is Tailwind?</h2>

          <p>
           Mobile site
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">What is Next.js?</h2>
          <p>
            Next.js is a minimalistic framework for creating server-rendered
            React applications.
          </p>
          <button onClick={sendMessageToMobile}>click me!</button>
        </section>
      </div>

    </div>
  );
}