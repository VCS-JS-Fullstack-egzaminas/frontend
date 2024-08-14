import PropTypes from "prop-types";

const Button = ({ children, color, ...props }) => {
  const baseClasses =
    "text-white px-8 py-3 font-semibold rounded-md transition duration-150 shadow-md";
  const colorClasses =
    color === "secondary"
      ? "bg-river-bed-500 hover:bg-river-bed-600 active:bg-river-bed-700"
      : "bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700";

  return (
    <button className={`${baseClasses} ${colorClasses}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;