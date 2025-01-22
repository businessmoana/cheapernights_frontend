import { useState } from "react";
import Bg from "./assets/images/bg.webp";
import axios from "axios";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/search`,
        {
          searchText: searchText,
        }
      );
      console.log(response);
      setResult(response.data); // Store the results in state
      console.log('response.data=>',response.data)
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("There was an error making the request"); // Set error message
      console.error("There was an error making the request:", error);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="h-screen w-screen relative flex justify-center">
      <img
        src={Bg}
        alt=""
        className="h-screen w-screen absolute top-0 left-0 -z-10"
      />
      <div className="h-full w-full flex flex-col gap-5 items-center">
        <div className="w-4/5 lg:w-1/2 p-7 h-fit rounded-md mt-10 bg-gradient-to-b from-custom-blue-1 to-custom-blue-2">
          <div className="text-3xl font-bold text-[#333]">Search With URL</div>
          <div className="w-full flex justify-between items-center mt-3">
            <div className="w-[80%]">
              <input
                id="url"
                name="url"
                type="text"
                value={searchText}
                onChange={handleSearchTextChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="w-[15%] flex justify-center items-center">
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full p-5 gap-5 overflow-y-auto">
          <div className="columns-2 md:columns-3 xl:columns-4 gap-7 mx-10 lg:mx-60">
            {result?.google_lens_search_result?.length > 0 &&
              result?.google_lens_search_result?.map((item,index) => (
                <div className="break-inside-avoid mb-8 bg-white rounded-[10px] font-mono" key={index}>
                  <img
                    className="h-auto w-full rounded-lg"
                    src={item.thumbnail}
                    alt=""
                  />
                  <a href={item.link} target="_blink">
                    <div className="flex gap-1 justify-start items-center mt-2 pl-2">
                      <img src={item.source_icon} alt="" className="w-5 h-5" />
                      <span className="text-[#474646]">{item.source}</span>
                    </div>
                    <div className="text-[12px] p-2">{item.title}</div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
