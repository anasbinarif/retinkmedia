export interface UserInputProps {
    prompt: string;
    setPrompt: (val: string) => void;
    width: number;
    setWidth: (val: number) => void;
    height: number;
    setHeight: (val: number) => void;
    loading: boolean;
    onGenerate: () => void;
}