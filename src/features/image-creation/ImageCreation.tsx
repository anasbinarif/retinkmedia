import React from 'react';
import Image from 'next/image';
import {type ImageCreationProps} from "./ImageCreation.types";

const ImageCreation: React.FC<ImageCreationProps> = ({ image, width, height }) => {
    if (!image) {
        return (
            <div className="text-center text-gray-600 mt-12">
                <p>No image generated yet. Enter a prompt and click Generate.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border max-w-md w-full overflow-hidden shadow-md">
            <div className="relative w-full h-auto">
                <Image
                    src={image}
                    alt="Generated"
                    width={width}
                    height={height}
                    className="w-full object-cover"
                    priority
                />
            </div>
        </div>
    );
};

export default ImageCreation;
