import "./Search.css";

const Search = () => {
  return (
    <div className="search-main bg-black/20 bg-blend-darken flex justify-center">
      <div className="container px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div className="grid gap-2  max-w-[320px] sm:max-w-[420px] mt-8">
            <h1 className="leading-none text-left font-extrabold text-white text-4xl sm:text-5xl">
              Drive in Style, Rent with Smiles
            </h1>
            <p className="text-lg sm:text-xl text-white">
              Our mission is simple - to provide you with top-tier car rental
              services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
