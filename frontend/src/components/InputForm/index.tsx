import React, { useState } from "react";

export interface IInputForm {
    onSearch: (urls: string[]) => Promise<void>;
}

const InputForm: React.FC<IInputForm> = ({ onSearch }): React.JSX.Element => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const urls = inputValue.split(";").map(item => item.trim()).filter(item=> item);
        onSearch(urls);
        setInputValue("");
    }

    return (
        <form
            className="mx-auto max-w-md"
            onSubmit={handleSubmit}
        >
            <div className="flex gap-2 mb-2">
                <textarea
                    id="chat"
                    rows={1}
                    className="block max-h-32 min-h-12 w-full rounded-lg border border-blue-300 bg-gray-50 p-4 ps-5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500"
                    placeholder="Enter a website link"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                >
                </textarea>
                <button
                    type="submit"
                    className="text-nowrap rounded-lg bg-blue-700 px-4 py-4 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Try it Out
                </button>
            </div>
            <div className=" text-gray-500 text-sm mt-1">
                ⓘ Use ';' to separate urls.
            </div>
        </form>
    )
}

export default InputForm;