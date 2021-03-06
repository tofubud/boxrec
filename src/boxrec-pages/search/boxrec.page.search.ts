import {BoxrecPageSearchRow} from "./boxrec.page.search.row";
import {BoxrecSearch} from "./boxrec.search.constants";

const cheerio: CheerioAPI = require("cheerio");
let $: CheerioStatic;

/**
 * parse a BoxRec Search Results page
 * <pre>ex. http://boxrec.com/en/search?pf%5Bfirst_name%5D=floyd&pf%5Blast_name%5D=mayweather+jr&pf%5Brole%5D=boxer&pf%5Bstatus%5D=&pf_go=&pf%5BorderBy%5D=&pf%5BorderDir%5D=ASC</pre>
 */
export class BoxrecPageSearch {

    private _searchResults: string[] = [];

    constructor(boxrecBodyString: string) {
        $ = cheerio.load(boxrecBodyString);
        this.parse();
    }

    get results(): BoxrecSearch[] {
        return this._searchResults.map(item => new BoxrecPageSearchRow(item));
    }

    private parse(): void {
        const tr: Cheerio = $("table#searchResults tbody tr");

        tr.each((i: number, elem: CheerioElement) => {
            const html: string = $(elem).html() || "";
            this._searchResults.push(html);
        });
    }

}
