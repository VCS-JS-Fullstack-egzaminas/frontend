import PropTypes from "prop-types";

const Label = ({ htmlFor, children, ...props }) => {
  return (
    <label
      className="font-light text-sm text-river-bed-800 ml-1"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Label;
