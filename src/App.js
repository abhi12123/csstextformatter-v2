import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import SideNavbar from "./components/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import CodeAndPreview from "./components/CodeAndPreview";

function App() {
  const [expandNavBar, setExpandNavBar] = useState(false);
  return (
    <div className="relative min-h-screen md:flex">
      <div className="bg-gray-800 text-gray-100 flex justify-between items-center md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
          Css Text Formatter
        </a>
        <FontAwesomeIcon
          icon={expandNavBar ? faTimes : faBars}
          className="text-xl m-4 focus:outline-none focus:bg-gray-700"
          onClick={() => setExpandNavBar(!expandNavBar)}
        />
      </div>
      <SideNavbar
        expandNavBar={expandNavBar}
      />
      <div className="flex-1 p-10 font-bold">
        <CodeAndPreview/>
      </div>
    </div>
  );
}

export default App;
