import PropTypes from "prop-types";

const Button = ({ children, color, className, ...props }) => {
  const baseClasses =
    "text-white px-8 py-3 font-semibold rounded-md transition duration-150 shadow-md";
  let colorClasses = "";

  switch (color) {
    case "secondary":
      colorClasses =
        "bg-river-bed-500 hover:bg-river-bed-600 active:bg-river-bed-700";
      break;
    case "disabled":
      colorClasses = "opacity-50 cursor-not-allowed bg-gray-500";
      break;
    case "danger":
      colorClasses = "bg-red-500 hover:bg-red-700 active:bg-red-800";
      break;
    case "create":
      colorClasses = "bg-green-500 hover:bg-green-700 active:bg-green-800";
      break;
    case "blue":
      colorClasses = "bg-blue-500 hover:bg-blue-700 active:bg-blue-800";
      break;
    case "gray":
      colorClasses = "bg-gray-200 hover:bg-gray-700 active:bg-gray-800";
      break;
    default:
      colorClasses =
        "bg-ecstasy-500 hover:bg-ecstasy-600 active:bg-ecstasy-700";
      break;
  }
  return (
    <button
      className={`${baseClasses} ${colorClasses} ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "disabled",
    "danger",
    "create",
    "blue",
    "gray"
  ]),
  className: PropTypes.string,
};

export default Button;
