import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {subscribe} from '../../../../lib/ably'

export default function Scenario3Feedback() {

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
            <section>
            <h2 className="mb-3 text-xl font-bold">Feedback on scenario three.</h2>
            </section>
            <section>
                Thanks - we'd appreciate it if you could provide feedback on scenario three on your laptop/desktop. 
            </section>
        </div>    
    </div>
  );
}