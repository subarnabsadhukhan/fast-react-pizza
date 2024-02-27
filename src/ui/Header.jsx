import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className=" flex items-center justify-between border-b border-stone-300 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link className=" tracking-widest" to="/">
        <h1>Fast React Pizza Co.</h1>
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
