const request = require('request');

function wikiSearch(msg, keyword)
{
    console.log(keyword);
    url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${keyword}&format=json`;
    console.log("calling a request to " + url);

    let parsedPage = JSON.parse(' [ "something" , "failed" , "try again"] ');
    let names = JSON.parse(' [ "something" , "failed" , "try again"] ');
    let links = JSON.parse(' [ "something" , "failed" , "try again"] ');
    
    request(url, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        parsedPage = JSON.parse(body);
        names = parsedPage[1];
        links = parsedPage[3];
        console.log(names);
        console.log(links);
      });
}

module.exports.wikiSearch = wikiSearch;