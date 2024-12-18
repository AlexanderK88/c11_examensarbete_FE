import GenreDropdown from "../modals/GenreModal";
import TypeDropdown from "../modals/TypeModal";

interface Props {
  sort: string;
  sortDirection: string;
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  dropdown2: string;
  onDropdown2Change: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedTypes: string[];
  onToggleTypeDropdown: () => void;
  onApplyTypes: (types: string[]) => void;
  isTypeDropdownOpen: boolean;
  onToggleGenreDropdown: () => void;
  onApplyGenre: (genre: string) => void;
  isGenreDropdownOpen: boolean;
}

const SortAndFilterControls = ({
  sort,
  onSortChange,
  dropdown2,
  onDropdown2Change,
  onToggleTypeDropdown,
  onApplyTypes,
  isTypeDropdownOpen,
  onToggleGenreDropdown,
  onApplyGenre,
  isGenreDropdownOpen,
}: Props) => {
  return (
    <div className="w-full sm:w-10/12 mx-auto lg:mx-0 flex justify-end flex-col lg:flex-row gap-2 sm:gap-4 md:gap-6">
      <div className="flex gap-2 sm:gap-4 md:gap-6">
        <div className="relative w-full sm:w-2/4 lg:w-24">
          <button
            onClick={() => onToggleGenreDropdown()}
            className="font-semibold w-full px-4 py-2 border-2 border-dashed border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            Genre
          </button>
          <GenreDropdown
            isOpen={isGenreDropdownOpen}
            onApply={onApplyGenre}
            onClose={() => onToggleGenreDropdown()}
          />
        </div>
        <div className="relative w-full sm:w-2/4 lg:w-24">
          <button
            onClick={() => onToggleTypeDropdown()}
            className=" font-semibold w-full px-4 py-2 border-2 border-dashed border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            Type
          </button>
          <TypeDropdown
            isOpen={isTypeDropdownOpen}
            onClose={() => onToggleTypeDropdown()}
            onApply={onApplyTypes}
          />
        </div>
      </div>
      <div className="flex gap-2 sm:gap-4 md:gap-6">
        <select
          value={sort}
          onChange={onSortChange}
          className="w-2/4 p-2 border lg:max-w-48 border-gray-300 rounded-md"
        >
          <option value="popularity">Popularity</option>
          <option value="chapters">Chapters released</option>
          <option value="publishedFrom">Newest</option>
          <option value="score">Highest rated</option>
        </select>
        <select
          value={dropdown2}
          onChange={onDropdown2Change}
          className="w-2/4 lg:max-w-48 p-2 border border-gray-300 rounded-md "
        >
          <option value="">Release period</option>
          <option value="option1">This month</option>
          <option value="option2">This year</option>
          <option value="option3">All time</option>
        </select>
      </div>
    </div>
  );
};

export default SortAndFilterControls;
