import { useRouter } from 'next/router'
import {sendToMobile, subscribe} from '../../../../lib/ably'
import { useEffect, useState } from 'react'

const expectedValues = {
  publicKey: "wFwsYTinuuUvZZ5TwOkEE3Ph2V7rpqseA/cv6RS66HI=",
}

const equivalent = (field, v1, v2)=>{
  if (v1.replace(" ","").toLowerCase() == v2.replace(/\s/g, '').toLowerCase()){
    return true;
  }
  if (field == "allowedIPs"){
    const a = v1.split(",").map(i => i.replace(/\s/g, '').toLowerCase());
    const b = v2.split(",").map(i => i.replace(/\s/g, '').toLowerCase());
    if (a.length != b.length){
      return false;
    }
    return a.reduce((acc,item)=>{
      return acc && b.indexOf(item) != -1;
    }, true)
  }
  return false;
}

export default function Scenario1() {

  const router = useRouter()

  const [values, setValues] = useState({publicKey:""});
  const [valid, setValid]   = useState({publicKey:false});
  const [complete, setComplete] = useState(false);
  const [mobilecomplete, setMobileComplete] = useState(false);

  const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
  }

  useEffect(() => {
    const { id } = router.query
    if (id){
      subscribe(id, ({data})=>{
        console.log("seen data", data);
        const {type, from} = data;

        if (type === "complete" && from=="mobile"){
          setMobileComplete(true);
        }
      });
    }
  }, [router.query.id]);

  useEffect(()=>{
    if (complete && mobilecomplete){
      done();
    }
  }, [complete, mobilecomplete]);
  const done = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/m/s1/feedback/${id}`});
    router.push(`/r/s1/feedback/${id}`);
  }
  
  const fail = ()=>{
    const { id } = router.query;
    const home = window ? window.location.origin : '';
    sendMessageToMobile({type:"path", path:`${home}/m/s1/feedback/${id}`});
    router.push(`/r/s1/feedback/${id}`);
  }



  const handleChange = (field, value)=>{
    setValues({...values, [field]: value});
    setValid({...valid,   [field]: equivalent(field, expectedValues[field],value)});  
  }

  useEffect(() => {
      setComplete(Object.keys(expectedValues).reduce((acc,key)=>{
        return acc && valid[key];
      },true));
  },[valid]);

  const renderComplete = ()=>{
    if (complete || mobilecomplete){
      let message = "";
      if (mobilecomplete){
          message = "You have successfully configured the mobile.  Thanks!  Please copy the mobile public key to the public key text box in the Peer section";
      }else {
          message = "You have successfully configured the router!  Thanks!  Please finish configuring the mobile";
      }
      return <div className="mt-4 p-4 bg-gray-500 text-white text-lg shadow rounded">{message}</div>
    }
    return <></>
  }

  return (
    <div>
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Scenario One</h2>
        </section>
        <section className="mb-4">
        {renderComplete()}
        </section>
        <section className="bg-gray-700  text-white p-4 rounded">
            <div className="mt-4">Please take the <strong>Addresses</strong> and <strong>Listen Port</strong> information (in the Interface section) and the <strong>Public Key, Allowed IPs</strong> and <strong>Endpoint</strong> information (in the Peer section) from this form, and enter it into the form on the mobile phone (each purple input area expects configuration details).
            </div>
            <div className="mt-4 mb-4">Please also take the <strong>Public Key</strong> from the mobile phone's <strong>Interface section </strong> and enter it onto the (purple) input area.
            </div>
        </section>
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">General Setup</h2>
            <div className="font-semibold"> Private key </div>
            <div className="pt-6 flex "><input type="password" className="w-full h-12" value="my private key which you cannot see or copy"></input></div>  
            <div className="mt-6  font-semibold"> Public key </div>
            <div className="pt-6 flex "><input type="text" className="w-full h-12" value="sTwsJLinpoUvGH7TwOkEE3Ph2V7hjutdAic/6RS7aHP="></input></div>       
            <div className="font-semibold mt-4"> Listen Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input  type="text" className="w-full h-12" value="51820"></input>
            </div>      
            <div className="mt-6 font-semibold"> Addresses</div>
            <div className="pt-6 flex flex-row items-center justify-center">
              <input  type="text" className="w-full h-12" value="192.168.2.34/32"></input>
            </div>       
           
        </section>
      
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">Peer</h2>
            <div className="font-semibold"> Public Key </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("publicKey", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["publicKey"]} ></input>
                 {valid["publicKey"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
           
            <div className="font-semibold mt-4"> Allowed IPs </div>
            <div className="pt-6 flex flex-row items-center justify-center">
              <input  type="text" className="w-full h-12" value="192.168.94.2/32, 192.168.4.0/24"></input>  </div>    
            <div className="font-semibold mt-4"> Endpoint Host</div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input  type="text" className="w-full h-12" value="xor.freedns.org"></input>
            </div>  
            <div className="font-semibold mt-4"> Endpoint Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
              <input  type="text" className="w-full h-12" value="51825"></input>
            </div>  
        </section>
        <section className="mt-4">
        {renderComplete()}
        </section>
        <section className="flex flex-row justify-center p-8">
            {/*<button className="p-4 uppercase font-bold" onClick={done}>Done!</button>*/}
            <button className="p-4 uppercase font-bold" onClick={fail}>I couldn't do this</button>
        </section>
      </div>
     
    </div>
  );
}