import { Video } from "../../interfaces/exports/index.js";
export default class ServerClient {
    search(name: string): Promise<import("../../interfaces/declare/StarInformation.js").default>;
    findVideo(query: string): Promise<Video[]>;
}
