import axios from 'axios';
import cheerio from 'cheerio';

const getCountryHistory = async (countryName) => {
    try {
        // Make the request to Britannica website
        const response = await axios.get(`https://www.britannica.com/topic/${countryName}`);
        const html = response.data;
        // Load the HTML into cheerio
        const $ = cheerio.load(html);
        // Find the historical information section
        const historySection = $('.topic-section-content p').text();
        // Return the history section content
        return historySection;
    } catch (error) {
        console.log(error);
        return error;
    }
}

console.log(getCountryHistory("India"));
