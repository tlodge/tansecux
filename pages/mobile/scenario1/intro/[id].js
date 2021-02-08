import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Ably from "ably";

var ably = new Ably.Realtime('HjnoqA.Jy57GA:iYNBLTlfpk5O62Wp');
var channel = ably.channels.get('tansecux');

export default function Scenario1Intro() {

  const router = useRouter()
  
  useEffect(() => {
   
    const { id } = router.query
    if (id){
      channel.subscribe(id, function(message) {
        console.log("seen message!!"); 
        router.push('../');
      });
    }
  }, [router.query.id]);


  return (
    <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Some info on scenario one and everything that goes with it!  This will move to next screen when gets a message!</h2>
        </section>
      </div>
    </div>
  );
}