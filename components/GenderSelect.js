const GenderSelect = ({label='Gender', options=[], onChangeValue}) => {
    return (
        <div className="w-full">
            <div className="block mb-2">
                { label }
            </div>
            <div>
                <select type="text" 
                    onChange={(e) => onChangeValue(e.target.value)}
                    className="w-full cursor-pointer border border-gray-400 capitalize rounded-md py-2 px-4 focus:rounded-none" 
                    placeholder="Search...">
                    { options.map((option, index) =>
                        <option key={index} value={option}>{option}</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default GenderSelect;