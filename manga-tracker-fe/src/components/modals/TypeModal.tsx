import { useState } from "react";

interface TypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedTypes: string[]) => void;
}

export default function TypeDropdown({
  isOpen,
  onClose,
  onApply,
}: TypeModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-10 xl:left-3 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Select Type</h2>
        <div className="space-y-2">
          {["Manga", "Manhwa", "Manhua", "Other"].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(selectedTypes);
              onClose();
            }}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
