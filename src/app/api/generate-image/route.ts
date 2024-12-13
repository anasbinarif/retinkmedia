import { NextResponse } from "next/server";

type RequestBody = {
    prompt: string;
    width?: number;
    height?: number;
    seed?: number;
};

export async function POST(req: Request) {
    let body: RequestBody;

    try {
        body = await req.json() as RequestBody;
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { prompt, width = 800, height = 600, seed = 42 } = body;

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const uniqueSeed = Math.floor(Math.random() * 100000); // Generate a random seed
    const response = await fetch('https://image.pollinations.ai/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({ prompt, width, height, seed: uniqueSeed }),
    });

    if (response.ok) {
        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const mimeType = blob.type;
        const imageUrl = `data:${mimeType};base64,${base64}`;
        return NextResponse.json({ url: imageUrl });
    }

    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
}
