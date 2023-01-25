import got from "got";
import cheerio from "cheerio";
import extractUrls from "extract-urls";
import msToDuration from "../externals/durationToMs.js";
export default async function xTitsGetVideo(query) {
    const baseURI = `https://www.xtits.com/search/${query}/`;
    const body = await (await got(baseURI)).body;
    const $ = cheerio.load(body);
    const videoInformation = [];
    $(".wrapper")
        .find(".wrapper-holder")
        .find(".container")
        .find(".main-content")
        .find("#list_videos_videos_list_search_result")
        .find(".thumbs-holder")
        .find(".thumb-item")
        .map(async (index, element) => {
        const title = $(element)
            .find(`a.js-open-popup`)
            .find(".info-holder")
            .find("p.title")
            .text()
            .trim();
        const _duration = $(element)
            .find(`a.js-open-popup`)
            .find(".img-holder")
            .find("span.time")
            .text()
            .trim();
        const milliseconds = msToDuration(_duration);
        for (const result of [{ duration: _duration, ms: milliseconds }]) {
            if (result?.ms <= 600000)
                return;
            const eachVideoThumbnail = $(`span:contains("${result.duration}")`)
                .parent()
                .parent()
                .parent()
                .find("a.js-open-popup")
                .find(".img-holder")
                .find("img")
                .attr("data-original");
            const eachVideoHREF = $(`span:contains("${result.duration}")`)
                .parent()
                .parent()
                .parent()
                .find("a.js-open-popup")
                .attr("href");
            return videoInformation.push({
                uri: eachVideoHREF,
                thumbnail: eachVideoThumbnail,
                title,
                duration: _duration,
            });
        }
    });
    const finalVideoLook = [];
    const sortedArray = videoInformation.sort(() => Math.random() - 0.5);
    const slicedArray = sortedArray.slice(0, 5);
    for (const data of slicedArray) {
        const response = await fetchVideo(data.uri);
        finalVideoLook.push({
            duration: data.duration,
            thumbnail: data.thumbnail,
            title: response.title,
            uri: response.uri[0],
        });
    }
    return finalVideoLook;
}
async function fetchVideo(_uri) {
    const body = (await got(_uri)).body;
    const $ = cheerio.load(body);
    const title = $(".wrapper")
        .find(".wrapper-holder")
        .find(".main-holder")
        .find(".container-holder")
        .find(".content-box")
        .find(".container")
        .find(".headline")
        .find(".title-holder")
        .find("h1.title")
        .text()
        .trim();
    const videoURI = $(".wrapper")
        .find(".wrapper-holder")
        .find(".main-holder")
        .find(".container-holder")
        .find(".content-box")
        .find(".container")
        .find(".block-content")
        .find(".content-holder")
        .find(".player-holder")
        .find("script")
        .last()
        .html();
    const cleanURI = videoURI?.slice(0, videoURI?.lastIndexOf("video_url") + 1);
    const uri = extractUrls(cleanURI);
    const filteredURI = uri.filter((u, i) => u.endsWith(".mp4/") || u.endsWith(".mp4"));
    return {
        uri: filteredURI,
        title,
    };
}
