import React from 'react';
import {type TagSelectorProps} from "./TagSelector.types";

const tags: string[] = ['Fun', 'Sad', 'Happy', 'Exciting', 'Relaxing', 'Motivational', 'Inspiring', 'Romantic', 'Adventurous', 'Creative'];

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, setSelectedTags }) => {

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <button
                    key={tag}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer ${
                        selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                    } hover:shadow-md`}
                    onClick={() => toggleTag(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagSelector;
