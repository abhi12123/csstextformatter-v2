import "./App.css";
import { useState } from "react";
import SideNavbar from "./components/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import CodeAndPreview from "./components/CodeAndPreview";

function App() {
  const [expandNavBar, setExpandNavBar] = useState(false);
  const TopNavBar = () => {
    return (
      <div className="bg-gray-800 text-gray-100 flex justify-between items-center md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
          Css Text Formatter
        </a>
        {expandNavBar ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="text-xl m-4 focus:outline-none focus:bg-gray-700 z-20 cursor-pointer"
            onClick={() => setExpandNavBar(!expandNavBar)}
          />
        ) : (
          <button
            onClick={() => setExpandNavBar(!expandNavBar)}
            className="p-1 m-3 rounded bg-white font-bold text-gray-800"
          >
            View Styles
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="relative min-h-screen md:flex">
      <TopNavBar />
      <SideNavbar expandNavBar={expandNavBar} />
      <div className="flex-1 p-10 w-full md:w-3/5 lg:w-3/5 ">
        <CodeAndPreview />
      </div>
    </div>
  );
}

export default App;
