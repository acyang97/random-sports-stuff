import { Link } from "react-router-dom";

// https://flowbite.com/docs/components/navbar/
const AppNavBar = () => {
  return (
    <header
      aria-label="Site Header"
      className="bg-white sticky top-0 z-30 w-full"
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          to="/"
        >
          <img
            src="/public/football.png"
            className="w-10 h-10"
            width={300}
            height={300}
            alt="random football image"
          />
          <span className="ml-3 text-md">Random Sports Stuff</span>
        </Link>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className=" md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 transition hover:text-gray-500/75"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/player-comparison"
                  className="text-gray-500 transition hover:text-gray-500/75"
                >
                  Player Comparison
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppNavBar;
