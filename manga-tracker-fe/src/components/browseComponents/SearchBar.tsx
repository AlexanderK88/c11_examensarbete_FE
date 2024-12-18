const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="text"
    placeholder="Search series..."
    className="w-full sm:w-10/12 mx-auto md:mt-auto md:h-10 lg:mx-0 lg:w-56 p-1 pl-4 border border-gray-300 rounded-md"
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;
