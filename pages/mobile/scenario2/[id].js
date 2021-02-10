import { useRouter } from 'next/router'
import {subscribe} from '../../../lib/ably'
import {useCamera} from '../../../lib/useCamera'
import { useEffect, createRef } from 'react'
import jsQR from 'jsqr';

export default function Scenario2() {

  const router = useRouter()
  const videoRef = createRef();
  const [video, isCameraInitialised, running, setPlaying, error] = useCamera(videoRef);
  
  const renderCamera = ()=>{
    return <><video
    ref={videoRef}
    autoPlay={true}
    muted={true}
    controls
    width="auto"
    height={400}/>   
    </>
  }

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
          {renderCamera()}
        </section>
      </div>
     
    </div>
  );
}