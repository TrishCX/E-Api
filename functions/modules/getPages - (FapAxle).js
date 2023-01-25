import cheerio from "cheerio";
import got from "got";
import config from "../../configuration/config.conf.js";
export default async function getPages(baseURI) {
    const uri = `${config.fapXL}/search?query=${baseURI}`;
    const body = await (await got(uri)).body;
    const $ = cheerio.load(body);
    const pages = [];
    const data = $(".wrap")
        .find(".row")
        .find("#contentwrap")
        .find(".row")
        .find(".col-md-12")
        .find(".justify-content-center")
        .find(".page-item")
        .each((index, element) => {
        const $_ = $(element).find("a").attr(`href`);
        pages.push($_);
    });
    const filteredArray = pages.filter((v, i) => v !== "#" && pages.indexOf(v) === i);
    return filteredArray;
}
