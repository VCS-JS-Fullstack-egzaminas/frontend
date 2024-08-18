import PropTypes from "prop-types";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border border-river-bed-50 rounded-md shadow-sm p-2 outline-none active:outline-1 focus:outline-1 ${
        className ? className : ""
      }`}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
