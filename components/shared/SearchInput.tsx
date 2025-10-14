"use client"

import { CiSearch } from "react-icons/ci";
const SearchInput = ({ handlesearch }: { handleSearch: (value: string) => void }) => {


  return (
    <div className="w-full max-w-sm min-w-[200px] mb-5">
      <div className="relative flex items-center">
        <div className="absolute left-5 text-slate-500">
          <CiSearch size={23} />
        </div>


        <input
          onChange={handlesearch}
          className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md pl-12 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
          placeholder="Search Something ..."
        />

        {/* <button
      className="rounded-md bg-slate-800 py-2 px-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
    >
      Search
    </button>  */}
      </div>
    </div>
  );
};

export default SearchInput;