import got from "got";
import cheeiro from "cheerio";
import ms from "ms";
import moment from "moment";
export default async function findVideosSpankBank(name) {
    const baseURI = "https://spankbang.com";
    const body = await (await got(`https://spankbang.com/s/${name.toString()}/?o=all`)).body;
    const $ = cheeiro.load(body);
    const arrayOfURI = [];
    $("#container")
        .find(".search_page")
        .find(".main_results")
        .find(".results_search")
        .find(".video-list")
        .find(".video-item")
        .map((index, element) => {
        const $_ = $(element);
        const time = $_.find("a").find("p.t").find("span.l").html();
        if (time === null)
            return;
        const formattedTimings = ms(time);
        if (formattedTimings <= 600000)
            return;
        const hours = moment
            .utc(moment.duration(formattedTimings, "milliseconds").asMilliseconds())
            .format("HH");
        const mins = moment
            .utc(moment.duration(formattedTimings, "milliseconds").asMilliseconds())
            .format("mm");
        const seconds = moment
            .utc(moment.duration(formattedTimings, "milliseconds").asMilliseconds())
            .format("ss");
        const timings = hours === "00" ? `${mins}:${seconds}` : `${hours}:${mins}:${seconds}`;
        for (const result of [
            {
                ms: formattedTimings,
                duration: timings,
                showTime: time,
            },
        ]) {
            const eachVideo = $(element).find("a").attr("href");
            const uris = `${baseURI}${eachVideo}`;
            arrayOfURI.push(uris);
        }
    });
    const sortedArray = arrayOfURI.sort(() => Math.random() - 0.5);
    const slicedArray = sortedArray.slice(0, 5);
    const arrayOfVideos = [];
    for (let uri of slicedArray) {
        const actualVideoURI = await fetchData(uri);
        arrayOfVideos.push({
            duration: actualVideoURI.videoDuration,
            title: actualVideoURI?._videoTitle,
            uri: actualVideoURI.videoActualURI,
        });
    }
    return arrayOfVideos;
}
async function fetchData(uri) {
    const body = (await (await got(uri)).body);
    const $ = cheeiro.load(body);
    const _videoTitle = $("main#container")
        .find("div#video")
        .find(".left")
        .find("h1")
        .html();
    const videoActualURI = $("main#container")
        .find("div#video")
        .find("#player_wrapper_outer")
        .find("#video_container")
        .find("video")
        .find("source")
        .attr("src");
    const videoDuration = $("main#container")
        .find("div#video")
        .find("#player_wrapper_outer")
        .find(".play_cover")
        .find("span.i-length")
        .html();
    return {
        videoActualURI,
        _videoTitle,
        videoDuration,
    };
}
