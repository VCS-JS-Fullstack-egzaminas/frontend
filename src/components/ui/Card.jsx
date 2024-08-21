import PropTypes from "prop-types";

const Card = ({ children, className, ...props }) => {
  return (
    <>
      <div
        className={`w-fit p-6 rounded-md shadow-md border border-river-bed-50 bg-white ${
          className ? className : ""
        }`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
