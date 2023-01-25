import cheerio from "cheerio";
import got from "got";
import config from "../../configuration/config.conf.js";
export default async function getData(uri) {
    const FapXLBaseURI = config.fapXL;
    const fapXLContentBasedURI = "https:";
    const _body = await got(uri);
    const $_videos = cheerio.load(_body.body);
    const videosURI = $_videos(".wrap")
        .find(".row")
        .find("#contentwrap")
        .find(".row")
        .find(".col-md-12")
        .find(".col-md-8")
        .find(".col-md-12")
        .find("#playerwrap")
        .find("#player")
        .attr("data-file");
    const text = $_videos(".wrap")
        .find(".row")
        .find("#contentwrap")
        .find(".row")
        .find(".col-md-12")
        .find(".col-md-4")
        .find(".tab-content")
        .find("#info")
        .find(".card-body")
        .find("h3")
        .text();
    const description = $_videos(".wrap")
        .find(".row")
        .find("#contentwrap")
        .find(".row")
        .find(".col-md-12")
        .find(".col-md-4")
        .find(".tab-content")
        .find("#info")
        .find(".card-body")
        .find("p")
        .html()
        ?.trim();
    return {
        text,
        description,
        videosURI: `${fapXLContentBasedURI}${videosURI}`,
    };
}
