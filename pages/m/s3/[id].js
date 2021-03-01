import { useRouter } from 'next/router'
import {sendToRouter, subscribe} from '../../../lib/ably'
import { useEffect, useState } from 'react'

export default function Scenario3() {

  const router = useRouter()
  const [complete, setComplete] = useState(false);

  const sendMessageToRouter = (message)=>{
    const { id } = router.query
    sendToRouter(id, message);
  }

  const handleClick = ()=>{
    if (complete){
      sendMessageToRouter({type:"complete"});
    }
  }
  
  useEffect(() => {
   
    const { id } = router.query
    if (id){
      subscribe(id, ({data})=>{
        console.log("seen some data!!", data);
        const {type} = data;

        if (type=="complete"){
            setComplete(true);
        }
        else if (type == "path"){
          const {path} = data;
          router.push(path);
        }
      });
    }
  }, [router.query.id]);

  const tokstyle = complete ? {fill:"#16935B",stroke:"black",strokeWidth:1} : {fill:"none",stroke:"#383840",strokeWidth:3,strokeDasharray:"3,9,0,0"};
  const instruction = complete ? "Nearly done. Please touch the token to transfer the data" : "Please move the tokens into the correct pattern on the router";
  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario Three (mobile)</h2>
        </section>
        <section>
          <svg width="100%" height="100%" viewBox="0 0 303 280" style={{fillRule:"evenodd",clipRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1.5}}>
            <path onClick={handleClick} d="M120.053,118.181c-18.689,-10.776 -31.299,-30.95 -31.343,-54.062c-0.066,-34.494 27.886,-62.553 62.38,-62.619c34.495,-0.066 62.554,27.886 62.62,62.381c0.044,23.125 -12.504,43.357 -31.172,54.201l25.133,43.385c9.181,-5.333 19.84,-8.396 31.209,-8.418c34.495,-0.066 62.554,27.886 62.62,62.381c0.066,34.494 -27.886,62.553 -62.381,62.619c-34.494,0.066 -62.553,-27.886 -62.619,-62.38l-50,0.095c0.066,34.495 -27.886,62.554 -62.381,62.62c-34.494,0.066 -62.553,-27.886 -62.619,-62.381c-0.066,-34.494 27.886,-62.553 62.381,-62.619c11.345,-0.022 21.994,2.987 31.178,8.262l24.994,-43.465Zm118.899,72.368c13.798,-0.026 25.021,11.154 25.048,24.952c0.026,13.798 -11.155,25.022 -24.953,25.048c-13.797,0.026 -25.021,-11.154 -25.047,-24.952c-0.027,-13.798 11.154,-25.021 24.952,-25.048Zm-175,0.335c13.798,-0.027 25.022,11.154 25.048,24.952c0.026,13.798 -11.154,25.021 -24.952,25.048c-13.798,0.026 -25.022,-11.155 -25.048,-24.953c-0.026,-13.797 11.154,-25.021 24.952,-25.047Zm96.938,-54.495c-6.375,-2.198 -13.304,-2.185 -19.67,0.038c0.006,4.102 0.025,8.205 0.055,12.307c-5.435,3.337 -8.807,9.203 -8.955,15.579c-3.56,2.039 -7.114,4.088 -10.662,6.147c1.283,6.62 4.759,12.614 9.867,17.016c3.55,-2.057 7.093,-4.124 10.631,-6.202c5.608,3.039 12.373,3.026 17.969,-0.034c3.546,2.064 7.097,4.117 10.655,6.161c5.091,-4.422 8.544,-10.429 9.802,-17.054c-3.556,-2.045 -7.118,-4.081 -10.686,-6.106c-0.172,-6.375 -3.566,-12.228 -9.014,-15.544c0.014,-4.103 0.017,-8.205 0.008,-12.308Zm-9.728,-97.389c13.798,-0.026 25.021,11.154 25.048,24.952c0.026,13.798 -11.155,25.022 -24.952,25.048c-13.798,0.026 -25.022,-11.154 -25.048,-24.952c-0.027,-13.798 11.154,-25.022 24.952,-25.048Z" style={tokstyle}/>
          </svg>
        </section>
        <section>
          <div className="text-lg font-bold p-6 text-center">{instruction}</div>
        </section>
      </div>
     
    </div>
  );
}