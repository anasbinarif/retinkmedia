import React from 'react';

interface CaptionSectionProps {
    caption: string | null;
    setCaption: (val: string) => void;
}

const CaptionSection: React.FC<CaptionSectionProps> = ({ caption, setCaption }) => {
    if (!caption) return null;

    return (
        <div className="bg-white rounded-lg border max-w-md w-full overflow-hidden shadow-md mt-2 p-4">
            <label className="block mb-2 font-semibold">Caption</label>
            <textarea
                className="w-full border rounded-lg p-2"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />
        </div>
    );
};

export default CaptionSection;
