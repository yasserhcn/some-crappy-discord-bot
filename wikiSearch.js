const request = require('request');
const discord = require('discord.js');
function wikiSearch(msg, keyword)
{
    let searchIndex = 69;

    for (let index = 0; index < keyword.length; index++) {
      if ( keyword.charAt(index) <= '9' && keyword.charAt(index) >= '0' )
      {
        console.log("number detected at ", keyword.charAt(index))
        searchIndex = index;
      }
      
    }

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

        parseWiki(links[searchIndex], names[searchIndex]);
        
        msg.channel.send(message);
      });
}

function parseWiki(url, name)
{
  console.log(name)
}

module.exports.wikiSearch = wikiSearch;