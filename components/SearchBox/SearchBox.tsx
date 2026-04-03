import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const updateSearch = (elem: React.ChangeEvent<HTMLInputElement>) => {
    onChange(elem.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={updateSearch}
    />
  );
};

export default SearchBox;