import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    "inline-block text-sm rounded-3xl bg-yellow-500  font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + ` px-4 py-2 sm:px-6`,
    secondary:
      base +
      ` px-4 py-1.5 sm:px-6 border-2 border-stone-400  hover:!bg-stone-300 focus:!ring-stone-500 !bg-stone-100 !text-stone-500`,
    small: base + ` px-2 py-1 md:py-2 md:px-4 !text-xs`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
