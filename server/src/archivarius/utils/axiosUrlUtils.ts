import axios from 'axios';
import * as cheerio from 'cheerio';

export const axiosUrlUtils = async (urlProp: string) => {
    
    const url = encodeURI(urlProp);
    const getHTML = async (url: string) => {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    }
    const $ = await getHTML(url);
    return $;
}