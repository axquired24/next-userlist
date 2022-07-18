// options: {key: value}
const GenderSelect = ({label='Gender', options=[], onChangeValue}) => {
    return (
        <div>
            <div className="block mb-2">
                { label }
            </div>
            <div>
                <select type="text" 
                    onChange={(e) => onChangeValue(e.target.value)}
                    className="border border-gray-400 rounded-bl-md rounded-tl-md py-2 px-4 focus:rounded-none" 
                    placeholder="Search...">
                    { options.map((option, index) =>
                        <option key={index} value={index}>{option}</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default GenderSelect;