import { NextResponse } from "next/server";

type RequestBody = {
    prompt: string;
    width?: number;
    height?: number;
    tags?: string[];
};

export async function POST(req: Request) {
    let body: RequestBody;

    try {
        body = (await req.json()) as RequestBody;
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { prompt, width = 800, height = 600, tags } = body;

    if (!prompt) {
        return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const tagString = tags && tags.length > 0
        ? `Consider the following descriptive tags: ${tags.join(", ")}.`
        : "";

    const promptWithTags = `${prompt}. ${tagString}`.trim();

    const encodedPrompt = encodeURIComponent(promptWithTags);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}`;

    try {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: "Failed to fetch image", details: errorText },
                { status: response.status }
            );
        }

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(new Uint8Array(buffer)).toString("base64");
        const mimeType = blob.type;

        const imageUrl = `data:${mimeType};base64,${base64}`;
        const randomTemp = `hello world ${Math.floor(Math.random() * 100000)}`;

        return NextResponse.json({ url: imageUrl, temp: randomTemp });
    } catch (error) {
        console.error("Image generation failed:", error);
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
    }
}
