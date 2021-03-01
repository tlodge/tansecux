import { useRouter } from 'next/router'
import {subscribe, sendToRouter} from '../../../../lib/ably'
import { useEffect, useState } from 'react'

const expectedValues = {
  addresses: "192.168.2.34/32",
  listenPort: "51820",
  publicKey: "sTwsJLinpoUvGH7TwOkEE3Ph2V7hjutdAic/6RS7aHP=",
  endpointHost: "xor.freedns.org",
  endpointPort: "51825",
  allowedIPs: "192.168.94.2/32,192.168.4.0/24",
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

  
  const [values, setValues] = useState({addresses:"",listenPort:"",publicKey:"",endpointHost:"", endpointPort:"", allowedIPs:""});
  const [valid, setValid]   = useState({addresses:false,listenPort:false,publicKey:false,endpointHost:false, endpointPort:false, allowedIPs:false});
  const [complete, setComplete] = useState(false);

  const handleChange = (field, value)=>{
    setValues({...values, [field]: value});
    setValid({...valid,   [field]: equivalent(field, expectedValues[field],value)});  
  }

  const sendMessageToRouter = (message)=>{
    const { id } = router.query
    sendToRouter(id, message);
  }


  useEffect(() => {
   
    const { id } = router.query
    if (id){
      subscribe(id, ({data})=>{
        const {path} = data;
        router.push(path);
      });
    }
  }, [router.query.id]);


  useEffect(() => {
    const _complete = Object.keys(expectedValues).reduce((acc,key)=>{
      return acc && valid[key];
    },true);
    if (_complete){
      sendMessageToRouter({type:"complete"});
    }
    setComplete(_complete);
  },[valid]);


  const renderComplete = ()=>{
    return <div className="p-4 bg-gray-500 text-white text-lg shadow rounded">Successfully configured on the mobile!  Thanks</div>
  }

  return (
    <div>
      <div>
       
          <section className="mb-6">
            <h2 className="mb-3 text-xl font-bold">Scenario One (mobile)</h2>
            {complete && renderComplete()}
          </section>
          <div className="bg-gray-700  text-white p-4 rounded">
          <section>
            <div className="mt-4">Please take the <strong>Public Key</strong> from this phone's <strong>Interface section </strong> and enter it onto the (purple) input area on your router (desktop/laptop).
            </div>
            
            <div className="mt-4 mb-4">From your router (desktop/laptop) please take the <strong>Addresses</strong> and <strong>Listen Port</strong> information (in the Interface section) and the <strong>Public Key, Allowed IPs</strong> and <strong>Endpoint</strong> information (in the Peer section) from this form, and enter them into the relevant purple sections on this mobile.
              </div>
          </section>
        </div>
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">Interface</h2>
            <div className="font-semibold"> Private key </div>
            <div className="pt-6 flex "><input type="password" className="w-full h-12" value="my private key which you cannot see or copy"></input></div>  
            <div className="mt-6  font-semibold"> Public key </div>
            <div className="pt-6 flex "><input type="text" className="w-full h-12" value="wFwsYTinuuUvZZ5TwOkEE3Ph2V7rpqseA/cv6RS66HI="></input></div>       
            <div className="mt-6 font-semibold"> Addresses</div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input onChange={(e)=>handleChange("addresses", e.target.value)} type="text" className="w-full h-12 bg-indigo-300" value={values["addresses"]}></input>
                {valid["addresses"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>       
            <div className="font-semibold mt-4"> Listen Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input onChange={(e)=>handleChange("listenPort", e.target.value)} type="text" className="w-full h-12 bg-indigo-300" value={values["listenPort"]}></input>
                {valid["listenPort"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>      
        </section>
      
        <section className="bg-gray-300 p-4 mt-8">
          <h2 className="uppercase font-bold mb-4">Peer</h2>
            <div className="font-semibold"> Public Key </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("publicKey", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["publicKey"]} ></input>
                 {valid["publicKey"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Endpoint Host</div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("endpointHost", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["endpointHost"]} ></input>
                 {valid["endpointHost"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Endpoint Port </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("endpointPort", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["endpointPort"]} ></input>
                 {valid["endpointPort"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>  
            <div className="font-semibold mt-4"> Allowed IPs </div>
            <div className="pt-6 flex flex-row items-center justify-center">
                <input type="text" onChange={(e)=>handleChange("allowedIPs", e.target.value)} className="flex w-full h-12 bg-indigo-300" value={values["allowedIPs"]} ></input>
                 {valid["allowedIPs"] && <div className="flex ml-4 h-8 w-9 rounded-full border-indigo-600 border-2 pl-1 pt-1 text-sm ring-4 ring-indigo-30 bg-white">✔</div>}
            </div>    
        </section>
        <section className="mt-4">
        {complete && renderComplete()}
          </section>
      </div>
      
    </div>
    
  );
}