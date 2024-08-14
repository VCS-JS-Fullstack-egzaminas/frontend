const Card = ({ children, ...props }) => {
  return (
    <div>
      <div
        className="w-fit p-6 rounded-md shadow-md border border-river-bed-50 bg-white"
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
