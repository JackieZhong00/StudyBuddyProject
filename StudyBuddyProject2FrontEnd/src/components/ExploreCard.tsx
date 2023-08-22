interface ExploreCardProps {
  username: string,
  locations: [string],
  dates: [Date],
  promptResponses: [string],
  pictureUpload: string
}

const ExploreCard = ({ username, locations, dates, promptResponses, pictureUpload }) => {
  return (
    <div>
      <div className=" border border-solid border-black w-3/5 h-4/5 rounded bg-slate-600 relative overflow-y-auto">
        <div className="absolute border border-solid border-black w-28 h-28 bg-pink-700 top-10 left-20 rounded-full"></div>

        {/* <div className="xl:w-7/12 h-36 border border-solid bg-pink-700 rounded-lg absolute top-8 left-64 lg:w-2/4 md:w-2/5 sm:w-1/3"></div> */}
        <div className="flex justify-between h-44 w-8/12 absolute top-8 left-1/4 ">
          <textarea
            rows={5}
            cols={10}
            className=" border border-solid border-black bg-orange-500 rounded-lg w-28 h-40 "
          />
          <textarea
            rows={5}
            cols={10}
            className=" border border-solid border-black bg-orange-500 rounded-lg w-28 h-40 "
          />
          <textarea
            rows={5}
            cols={10}
            className=" border border-solid border-black bg-orange-500 rounded-lg w-28 h-40 "
          />
          <textarea
            rows={5}
            cols={10}
            className="border border-solid border-black bg-orange-500 rounded-lg w-28 h-40 "
          />
          <textarea
            rows={5}
            cols={10}
            className="border border-solid border-black bg-orange-500 rounded-lg w-28 h-40 "
          />
        </div>
        <div>
          <div
            className="bg-white border 
            border-solid border-black 
            rounded-lg flex flex-col absolute top-52 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
          >
            <label htmlFor="career-prompt">
              What are your career aspirations?
            </label>
            {/* <input
                type="text"
                id="career-prompt"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
            <textarea
              rows={3}
              cols={45}
              id="career-prompt"
              className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
            />
          </div>
          <div
            className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-2/4 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
          >
            <label htmlFor="enviro-prompt">
              What is your ideal study environment?
            </label>
            {/* <input
                id="enviro-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
            <textarea
              rows={3}
              cols={45}
              id="enviro-prompt"
              className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
            />
          </div>
          <div
            className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-3/4 left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
          >
            <label htmlFor="traits-prompt">
              What are 3 traits you're looking for in a study buddy?
            </label>
            {/* <input
                id="traits-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
            <textarea
              rows={3}
              cols={45}
              id="traits-prompt"
              className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
            />
          </div>
          <div
            className="bg-white border
            border-solid border-black
            rounded-lg flex flex-col absolute top-[98%] left-20 lg:w-4/5 md:w-2/3 sm:w-2/4 
            h-28"
          >
            <label htmlFor="hobbies-prompt">
              Outside of studying/working, what do you like to do for fun?
            </label>
            {/* <input
                id="hobbies-prompt"
                type="text"
                className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
              /> */}
            <textarea
              rows={3}
              cols={45}
              id="hobbies-prompt"
              className="bg-white border border-solid border-black w-full h-full rounded-b-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ExploreCard
