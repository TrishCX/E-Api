export default function getData(uri: string): Promise<{
    text: string;
    description: string | undefined;
    videosURI: string;
}>;
