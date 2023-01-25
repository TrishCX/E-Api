export default function xTitsGetVideo(query: string): Promise<{
    title: string;
    thumbnail: string;
    uri: string;
    duration: string;
}[]>;
