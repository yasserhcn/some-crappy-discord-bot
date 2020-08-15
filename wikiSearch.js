const request = require('request');
const discord = require('discord.js');
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
        parsedPage = JSON.parse(body);
        names = parsedPage[1];
        links = parsedPage[3];
        
        let message = "found these results in wikipedia:\n\n";

        for (let i = 0; i < names.length; i++) {
          message += names[i] + " <" + links[i] + ">";
          message += "\n";
        }
        
        msg.channel.send(message);
      });
}

module.exports.wikiSearch = wikiSearch;