const request = require('request');
const discord = require('discord.js');
const { htmlParse, default: parse } = require("node-html-parser");
const { htmlToText } = require('html-to-text');

function wikiSearch(msg, keyword, searchIndex1)
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
        if(error) { console.error('error:', error) }; // Print the error if one occurred
        parsedPage = JSON.parse(body);
        names = parsedPage[1];
        links = parsedPage[3];
        
        let message = "found these results in wikipedia:\n\n";

        if(names.length == 0){
          message = "no results found :(\n";
        }else{
          for (let i = 0; i < names.length; i++) {
            message += names[i] + " <" + links[i] + ">";
            message += "\n";
          }
        }
        
        if(searchIndex1){
          let text = parseWiki(links[searchIndex1], msg)
          msg.channel.send(text);
        }else{
          msg.channel.send(message);
        }
      });
}

function parseWiki(url, msg)
{
  request(url, (err, res, body)=>{

    if(err){ console.error(err) }

    const root = parse(body);
    
    let paragraph = root.querySelectorAll(".mw-parser-output p")[1].toString().substr(0, 2500)

    paragraph = htmlToText(paragraph);

    paragraph = paragraph.replace(/\[.*?\]/g, '')
    

    msg.channel.send(paragraph.toString().substr(0, 1000))

    return paragraph.toString()

  })
}

module.exports.wikiSearch = wikiSearch;