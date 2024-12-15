import React from 'react';
import {type UserInputProps} from "./UserInput.types";
import TagSelector from "./components/tag-selector/TagSelector";
import {FiArrowUp} from "react-icons/fi";

const UserInput: React.FC<UserInputProps> = ({
    prompt,
    setPrompt,
    width,
    setWidth,
    height,
    setHeight,
    loading,
    onGenerate,
    selectedTags,
    setSelectedTags
}) => {
    return (
        <div className="w-full md:w-1/3 md:pr-8 md:sticky md:top-18 self-start h-[550px] flex flex-col relative">
            <div
                className="flex-grow overflow-y-auto space-y-6 bg-gray-100 p-4 md:p-6 rounded-lg border border-gray-300 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Image Generator</h1>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Prompt</label>
                    <textarea
                        placeholder="Enter your prompt..."
                        className="px-4 py-2 border rounded-lg w-full resize-none h-24"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-semibold">Tags</label>
                    <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                </div>

                <div className="flex flex-col space-y-2">
                    <span className="font-semibold">Dimensions</span>
                    <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
                        <button
                            className={`px-3 py-2 rounded-lg border ${width === 600 && height === 600 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => {
                                setWidth(600);
                                setHeight(600);
                            }}
                        >
                            1:1
                        </button>
                        <button
                            className={`px-3 py-2 rounded-lg border ${width === 800 && height === 600 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => {
                                setWidth(800);
                                setHeight(600);
                            }}
                        >
                            4:3
                        </button>
                        <button
                            className={`px-3 py-2 rounded-lg border ${width === 1080 && height === 1350 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => {
                                setWidth(1080);
                                setHeight(1350);
                            }}
                        >
                            4:5
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <span className="font-semibold">Custom Dimensions</span>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <input
                            type="number"
                            className="px-4 py-2 border rounded-lg w-full md:w-1/2"
                            placeholder="Width"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                        />
                        <input
                            type="number"
                            className="px-4 py-2 border rounded-lg w-full md:w-1/2"
                            placeholder="Height"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                    </div>
                </div>

                <button
                    className="w-12 h-12 bg-gray-50 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-200 absolute bottom-4 right-20"
                    onClick={onGenerate}
                    disabled={loading}
                >
                    <FiArrowUp className="h-6 w-6 text-black"/>
                </button>
            </div>
        </div>
    );
};

export default UserInput;
