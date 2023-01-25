import cheerio from "cheerio";
import got from "got";
import pretty from "pretty";
import durationToMs from "../externals/durationToMs.js";
import getData from "./getData.js";
import getPages from "./getPages - (FapAxle).js";
import config from "../../configuration/config.conf.js";
export default async function findVideo(uri) {
    const pageToFetch = await getPages(uri);
    const page = pageToFetch[Math.floor(Math.random() * pageToFetch.length)];
    const FapXLBaseURI = config.fapXL;
    const rawBody = await await (await got(`${FapXLBaseURI}/${page}`)).body;
    const body = pretty(rawBody);
    const $ = cheerio.load(body);
    const allBigVideosArray = [];
    const videos = [];
    $(".wrap")
        .find(".row")
        .find("#contentwrap")
        .find(".row")
        .find(".col-md-12")
        .find(".row-cols-lg-4")
        .find(".video")
        .map(async (index, element) => {
        const filtration = $(element)
            .find(".card-body")
            .last()
            .find(".col-md-6")
            .first()
            .text()
            .trim();
        const milliseconds = durationToMs(filtration);
        for (let result of [{ duration: filtration, ms: milliseconds }]) {
            if (result?.ms <= 600000)
                return;
            const eachVideo = $(element)
                .find(`span:contains("${result.duration}")`)
                .parent()
                .parent()
                .parent()
                .find("span.vid")
                .find("a")
                .attr("href");
            const uris = `${FapXLBaseURI}/${eachVideo}`;
            return allBigVideosArray.push({
                duration: result.duration,
                uri: uris,
            });
        }
    });
    for (const v of allBigVideosArray) {
        const response = await getData(v.uri);
        videos.push({
            source: FapXLBaseURI,
            title: response.text,
            uri: response.videosURI,
            description: response.description,
            duration: v.duration,
        });
    }
    return videos;
}
