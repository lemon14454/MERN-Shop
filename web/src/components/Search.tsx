import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-200 px-3 flex-1 lg:w-[500px] rounded-full items-center flex"
    >
      <SearchIcon className="mr-2 h-5 w-5" />
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-800"
        placeholder="透過關鍵字搜尋"
      />
    </form>
  );
};

export default Search;
