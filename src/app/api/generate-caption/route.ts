import { NextResponse } from "next/server";

type RequestBody = {
    prompt: string;
    seed?: number;
    tags?: string[];
};

export async function POST(req: Request) {
    let body: RequestBody;

    try {
        body = (await req.json()) as RequestBody;
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { prompt, tags } = body;
    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const instagramPrompt = generateInstagramPrompt(prompt, tags);

    try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(instagramPrompt)}`);

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: 'Failed to fetch caption', details: errorText },
                { status: response.status }
            );
        }

        const caption = await response.text();
        return NextResponse.json({ caption });
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json(
                { error: `Internal server error: ${error.message}` },
                { status: 500 }
            );
    }
}

const generateInstagramPrompt = (prompt: string, tags?: string[]) => {
    const tagString = tags && tags.length > 0 ? `Tags: ${tags.join(', ')}` : '';
    return `
        Write an engaging and Instagram-ready caption about "${prompt}". 
        Use an appropriate tone based on the context, include relevant emojis, and add popular hashtags. 
        Keep the caption concise (under 100 words), and avoid starting the caption with emojis. 
        ${tagString}
    `;
};
