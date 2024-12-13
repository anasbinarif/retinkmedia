import { NextResponse } from "next/server";

type RequestBody = {
    prompt: string;
    seed?: number;
};

export async function POST(req: Request) {
    let body: RequestBody;

    try {
        body = (await req.json()) as RequestBody;
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { prompt } = body;
    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const instagramPrompt = `Create a short, catchy Instagram caption (with a friendly tone, emojis, and relevant hashtags) about: ${prompt}`;

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
