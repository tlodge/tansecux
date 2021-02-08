import { useRouter } from 'next/router'

export default function Scenario1Intro() {

  const router = useRouter()
  const { id } = router.query
  
  return (
    <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
      <div>
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-bold">Some info on scenario one and everything that goes with it!</h2>
        </section>
      </div>
      <a href={`../${id}`}>try scenario one!</a>
    </div>
  );
}