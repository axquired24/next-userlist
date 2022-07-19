import SearchSvg from "@/components/icon/SearchSvg";

const SearchInput = ({label='Search', name='search', onSearch}) => {
    return (
        <div className="w-full">
            <div className="block mb-2">
                { label }
            </div>
            <div className="w-full flex">
                <input type="text" className="w-full border border-gray-400 rounded-bl-md rounded-tl-md py-2 px-4 focus:rounded-none" placeholder="Search..." />
                <button type="button" className="bg-blue-500 rounded-br-md rounded-tr-md hover:bg-blue-600 cursor-pointer px-6 py-2">
                    <SearchSvg cls="w-5 h-auto text-white" />
                </button>
            </div>
        </div>
    );
}

export default SearchInput;