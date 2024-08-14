const Input = ({ ...props }) => {
  return (
    <input
      className="border border-river-bed-50 rounded-md shadow-sm p-2 outline-none active:outline-1 focus:outline-1"
      {...props}
    />
  );
};

export default Input;
