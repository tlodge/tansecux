import { useRouter } from 'next/router'
import {sendToMobile} from '../../../../lib/ably'

export default function Scenario3Feedback() {

  const router = useRouter()
  const { id } = router.query
  const understandrow = [1,2,3,4,5].map(i=>{
        return (<div className="pr-8">
            <label className="inline-flex items-center">
                <input type="radio" name="understand2" value={i}/>
                <span className="ml-2">{i}</span>
            </label>
        </div>);
  });

  const transferrow = [1,2,3,4,5].map(i=>{
    return (<div className="pr-8">
        <label className="inline-flex items-center">
            <input type="radio" name="transfer2" value={i}/>
            <span className="ml-2">{i}</span>
        </label>
    </div>);
 });
 
 const sendMessageToMobile = (message)=>{
    const { id } = router.query
    sendToMobile(id, message);
}

 const feedback = ()=>{
    sendMessageToMobile({type:"path", path:`${process.env.ROOT}/mobile/scenario3/intro/${id}`});
    router.push(`/router/scenario3/intro/${id}`);
 }
  return (
    <div>
      <div>
        <section>
          <h2 className="mb-3 text-xl font-bold">How did it go?  Feedback on scenario two.</h2>
        </section>
        <section className="mb-8">
            Thank you, only one more to go!  We'd really appreciate it if provide feedback on the second scenario.
        </section>
       
            <section className="bg-gray-300 p-4 w-3/4 pt-12 pl-8">
                
                <div className="font-semibold"> How easy/difficult was the process to understand?</div>
                <div className="flex flex-row  pt-6">
                    <div className="pr-8">very easy</div>
                    {understandrow}
                    <div>very difficult</div> 
                </div>
                
                <div className="pt-12 font-semibold"> How easy/difficult was it to transfer data between devices?</div>
                <div className="flex flex-row pt-6 ">
                    <div className="pr-8">very easy</div>
                    {transferrow}
                    <div>very difficult</div> 
                </div>
                
                <div className="pt-12 font-semibold"> Please briefly describe how you transferred data between the devices</div>
                <div className="pt-6 flex "><input type="textarea" rows="3" className="w-3/4 h-24"></input></div>

                <div className="pt-12 font-semibold"> Please provide any other feedback that you feel might be useful/relevant</div>
                <div className="pt-6"><input type="textarea" rows="3" className="w-3/4 h-24"></input></div>

                <div className="flex justify-center pt-12 pb-4">
                    <a className="font-bold uppercase" onClick={feedback}>submit feedback</a>
                </div>
            </section>
      
      </div>
      
    </div>
  );
}