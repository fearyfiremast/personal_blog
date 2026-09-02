/**
 * 'Above the Fold' component that highlights who I am and what I am about on the homepage
 * @returns 
 */
const ATFHome = () => {

  return (
    <section className="h-110 py-10 flex group">
      <div className=" w-[50%] h-full object-cover  bg-gray-600">
        <img className="w-full h-full transition duration-300 group-hover:-translate-y-4 group-hover:translate-x-2" src="https://placehold.co/500x320" />
      </div>
      <div className="px-4 py-2 flex flex-col group-hover:translate-x-3 transition duration-300">
        <h1 className="text-6xl mb-5">Inspired to CREATE</h1>
        <ul className="flex flex-col justify-around list-disc text-4xl pl-15 gap-2 mb-5">
          <li>Full Stack</li>
          <li>AI Assisted</li>
          <li>Deeply Curious</li>
        </ul>
        <p className="grow">
          I am a student in SFU's computer science program working towards my bachelors of science.
        </p>
      </div>
    </section>
  )
}

export default ATFHome