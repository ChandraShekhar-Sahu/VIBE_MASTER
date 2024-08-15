import React from "react";
import { useNavigate } from "react-router-dom"; 

function Header({ isHost }) {  // Accept isHost as a prop
  const navigate = useNavigate(); 

  const handleComingSoon = (event) => {
    event.preventDefault();
    alert('Coming soon...');
  };

  const navigateToEventList = () => {
    navigate(`./eventlist?isHost=${isHost}`);
  };

  return (
    <header className="bg-slate-800">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <a className="block text-teal-600">
            <img
              src="../../static/images/Designer2.png"
              alt="VM"
              width={100}
              height={100}
              className="rounded-full pt-2"
            />
          </a>
          <nav aria-label="Global" className="flex-1 flex justify-center">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-100 transition hover:text-gray-500/75" href="/info">
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-gray-100 transition hover:text-gray-500/75"
                  href="#"
                  onClick={navigateToEventList}
                >
                  Event List
                </a>
              </li>
              <li>
                <a
                  className="text-gray-100 transition hover:text-gray-500/75"
                  href="https://3f25-152-59-49-14.ngrok-free.app/templates/camera_temp/index.html"
                  
                >
                  Photo click
                </a>
              </li>
              <li>
                <a
                  className="text-gray-100 transition hover:text-gray-500/75"
                  href="https://3f25-152-59-49-14.ngrok-free.app/templates/weather/index.html"
                >
                  Weather
                </a>
              </li>
              <li>
                <a
                  className="text-gray-100 transition hover:text-gray-500/75"
                  href="https://3f25-152-59-49-14.ngrok-free.app/templates/normal_data/index.html"
                >
                  Scene
                </a>
              </li>
              <li>
                <a
                  className="text-gray-100 transition hover:text-gray-500/75"
                  href="#"
                  onClick={handleComingSoon}
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
