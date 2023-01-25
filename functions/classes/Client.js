import searchStar from "../modules/searchPornStar.js";
import findVideo from "../modules/findVideo.js";
import findVideosSpankBank from "../modules/findVideosSpankBang.js";
import xTitsGetVideo from "../modules/xTitsFindVideos.js";
export default class ServerClient {
    async search(name) {
        const response = await searchStar(name);
        return response;
    }
    async findVideo(query) {
        const videosArray = [];
        const fapXl = await findVideo(query);
        const xTits = await xTitsGetVideo(query);
        const spankBang = await findVideosSpankBank(query);
        for (const data of fapXl) {
            videosArray.push({
                duration: data.duration,
                title: data.title,
                uri: data.uri,
                thumbnail: "",
            });
        }
        for (const response of xTits) {
            videosArray.push({
                duration: response.duration,
                title: response.title,
                uri: response.uri,
                thumbnail: response.thumbnail,
            });
            for (const items of spankBang) {
                videosArray.push({
                    duration: items.duration,
                    title: items.title,
                    uri: items.uri,
                    thumbnail: "",
                });
            }
        }
        return videosArray;
    }
}
