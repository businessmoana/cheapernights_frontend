import { useState } from "react";
import VrboUrl from "../assets/images/vrbo.png";
import ExpediaUrl from "../assets/images/expedia.png";
import AgodaUrl from "../assets/images/agoda.png";
import axios from "axios";
import { FaAirbnb } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import Spinner from "../Components/spinner";

const sourceSiteList = [
  "Airbnb",
  "Booking.com",
  "Vrbo",
  "Expedia.com",
  "Agoda.com",
];

function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (url) {
      setIsLoading(true);
      e.preventDefault();
      console.log("Submitted URL:", url);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/search`,
          {
            searchText: url,
          }
        );
        // console.log(response);
        // if (response.data.status == "success") {
        //   setResult(response.data); // Store the results in state
        //   setFlag(true);
        // } else {
        //   setResult(null); //
        //   setFlag(false);
        // }
        // setError(null); // Clear any previous errors
        setIsLoading(false);
      } catch (error) {
        setError("There was an error making the request"); // Set error message
        setIsLoading(false);
        console.error("There was an error making the request:", error);
      }
    }
  };

  console.log(result);
  return (
    <div className="w-screen h-screen relative">
      {isLoading && <Spinner />}
      <header className="flex justify-start gap-10 shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative">
        <div className="flex flex-wrap items-center justify-start gap-5">
          <a className="max-sm:hidden">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
          </a>
          <a className="hidden max-sm:block">
            <img
              src="https://readymadeui.com/readymadeui-short.svg"
              alt="logo"
              className="w-9"
            />
          </a>
        </div>
        {flag && (
          <div className="flex justify-start items-center flex-1 gap-10">
            <div className="flex justify-center items-center w-[40%]">
              <input
                id="url"
                name="url"
                type="text"
                value={url}
                onChange={handleInputChange}
                className="w-full p-5 border border-orange-300 rounded-full focus:outline-none focus:border-orange-500"
              />
            </div>
            <div
              className="cursor-pointer rounded-full w-[300px] border-none bg-orange-500 text-white text-[20px] h-[50px] flex justify-center items-center"
              onClick={handleSubmit}
            >
              <span>Search</span>
            </div>
          </div>
        )}
      </header>
      {!flag && (
        <div className="flex flex-col justify-between items-center flex-1">
          <div className="flex justify-center items-center gap-16 py-16">
            <div className="flex justify-center items-center gap-2">
              <FaAirbnb size={30} />
              <span className="text-lg">Airbnb</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <TbBrandBooking size={30} />
              <span className="text-lg">Booking.com</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={VrboUrl} width={30} height={30} />
              <span className="text-lg">Vrbo</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={ExpediaUrl} width={30} height={30} />
              <span className="text-lg">Expedia</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={AgodaUrl} width={40} height={40} className="mt-2" />
              <span className="text-lg">Agoda</span>
            </div>
          </div>
          <div className="flex justify-center items-center font-bold text-[50px]">
            <span className="text-orange-500 mr-4">Compare </span>
            <span className="text-gray-500">Vacation Rental Prices </span>
          </div>
          <div className="max-w-[700px] text-gray-500 text-[23px] text-center">
            Paste an Airbnb, Booking, or Vrbo listing web link (URL) and
            discover instantly where that property is listed for the best price.
          </div>
          <div className="flex justify-center items-center w-[40%] mt-10">
            <input
              id="url"
              name="url"
              type="text"
              value={url}
              onChange={handleInputChange}
              className="w-full p-5 border border-orange-300 rounded-full mb-4 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div
            className="mt-10 cursor-pointer rounded-full w-[300px] border-none bg-orange-500 text-white text-[20px] h-[50px] flex justify-center items-center"
            onClick={handleSubmit}
          >
            <span>Search</span>
          </div>
        </div>
      )}
      {flag && (
        <div className="px-20">
          <div className="flex justify-between items-center">
            <div className="py-10 text-[30px] font-bold">Search result</div>
            <div className="flex gap-10">
              <div className="flex justify-between gap-5 border border-gray-500 rounded-full py-1 px-5 w-[300px]">
                <div className="flex flex-col">
                  <span className="font-bold text-[15px]">Check In</span>
                  <span className="text-gray-500">
                    {result.filter_options.checkIn}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px]">Check Out</span>
                  <span className="text-gray-500">
                    {result.filter_options.checkOut}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between gap-5 border border-gray-500 rounded-full py-1 px-5 w-[150px]">
                  <div className="flex flex-col">
                    <span className="font-bold text-[15px]">Guests</span>
                    <span className="text-gray-500">
                      {Number(result.filter_options.adults) +
                        Number(result.filter_options.children)}
                      guests
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-16">
            <div className="flex flex-col gap-5">
              <div className="h-[500px] w-[600px] flex justify-center items-center">
                <img
                  src={
                    result.base_source.source == "Agoda.com"
                      ? result.base_source.image_urls
                      : result.base_source.image_urls[0]
                  }
                  className="w-full h-auto"
                />
              </div>
              <span className="text-gray-500 text-[20px]">
                {result.base_source.name}
              </span>
            </div>
            <div className="flex justify-start flex-col flex-1 gap-3">
              <h3 className="text-lg font-bold text-gray-500">
                Short Listed Site
              </h3>
              {sourceSiteList.map((source, index) => (
                <div
                  key={source}
                  className="flex justify-between items-center p-8 border border-gray-400 rounded-lg"
                >
                  {index == 0 && (
                    <div className="flex justify-center items-center gap-2">
                      <FaAirbnb size={28} />
                      <span className="text-lg">Airbnb</span>
                    </div>
                  )}
                  {index == 1 && (
                    <div className="flex justify-center items-center gap-2">
                      <TbBrandBooking size={28} />
                      <span className="text-lg">Booking.com</span>
                    </div>
                  )}
                  {index == 2 && (
                    <div className="flex justify-center items-center gap-2">
                      <img src={VrboUrl} width={30} height={30} />
                      <span className="text-lg">Vrbo</span>
                    </div>
                  )}
                  {index == 3 && (
                    <div className="flex justify-center items-center gap-2">
                      <img src={ExpediaUrl} width={30} height={30} />
                      <span className="text-lg">Expedia</span>
                    </div>
                  )}
                  {index == 4 && (
                    <div className="flex justify-center items-center gap-2">
                      <img
                        src={AgodaUrl}
                        width={30}
                        height={30}
                        className="mt-2"
                      />
                      <span className="text-lg">Agoda</span>
                    </div>
                  )}
                  {result.google_lens_search_result[source] &&
                  result.google_lens_search_result[source].length > 0 ? (
                    result.google_lens_search_result[source].map(
                      (result, index) => (
                        <div key={index} className="flex gap-3 items-center ">
                          <p>
                            {result.price && result.price.length > 0
                              ? result.price
                              : "Not available"}
                          </p>
                          <a
                            className="w-[200px] cursor-pointer bg-orange-700 text-white h-[40px] rounded-full flex justify-center items-center"
                            href={result.link}
                            target="_blank"
                          >
                            <span>Book on {source}</span>
                          </a>
                        </div>
                      )
                    )
                  ) : (
                    <p className="font-bold">Not listed</p>
                  )}
                </div>
              ))}
              <h3 className="text-lg font-bold text-gray-500">Direct</h3>
              {result.rest_data.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-5 justify-between items-center p-8 border border-gray-400 rounded-lg"
                >
                  <div className="flex justify-center items-center gap-2">
                    <img size={28} src={item.source_icon} />
                    <span className="text-lg font-bold">{item.source}</span>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <p className="flex-1">{item.title}</p>
                    <a
                      className="w-fit cursor-pointer bg-orange-700 text-white h-[40px] rounded-full flex justify-center items-center"
                      href={item.link}
                      target="_blank"
                    >
                      <span className="w-fit px-3">Go to Website</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
