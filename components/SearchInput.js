import SearchSvg from "@/components/icon/SearchSvg";
import { useEffect, useState, useRef } from 'react';

const _debounce = require('lodash/debounce')

const SearchInput = ({label='Search', onSearch, queryText=null}) => {
    const [inputValue, setinputValue] = useState(null);
    const inputElm = useRef();
    const self = this;
    
    const triggerSearch = (str) => {
        if(str) {
            onSearch(str)
        } // endif
    }
    
    useEffect(() => {
        inputElm.current.value = queryText
        setinputValue(queryText)
    }, [queryText]);
    
    return (
        <div className="w-full">
            <div className="block mb-2">
                { label }
            </div>
            <div className="w-full flex">
                <input type="text" ref={inputElm} onKeyUp={_debounce((e) => {
                    triggerSearch(e.target.value)
                    setinputValue(e.target.value)
                }, 500)}
                    className="w-full border border-gray-400 rounded-bl-md rounded-tl-md py-2 px-4 focus:rounded-none" placeholder="Search..." />
                <button type="button" onClick={() => triggerSearch(inputValue)}
                    className="bg-blue-500 rounded-br-md rounded-tr-md hover:bg-blue-600 cursor-pointer px-6 py-2">
                    <SearchSvg cls="w-5 h-auto text-white" />
                </button>
            </div>
        </div>
    );
}

export default SearchInput;