const Discord = require('discord.js');
const auth = require('./auth.json')
const client = new Discord.Client();
const search = require('./wikipedia/wikiSearch');
const fightGame = require('./game/fightGame');

let PREFIX = "*";

let fightGames = [];


client.on('ready', () => {
	/* log when the bot is ready */
  console.log(`Logged in as ${client.user.tag}!`);

  /* set bot status */
  client.user.setActivity("the better and improved bot", {
  type: "STREAMING",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  });

});

client.on('message', msg => {

  if (msg.content.substr(0, 1) == PREFIX ) {
    console.log("command detected")
    console.log("sending " + msg.content.substr(1))
    commands(msg, msg.content.substr(1))
  }

	/* classic ping */
	if (msg.content == "ping")
	{
		msg.reply("pong");
  }

});

function commands(msg, cmdTxt)
{
  switch(cmdTxt.substr(0, 4))
  {
    case "ping":
      msg.channel.send("*pong*");
      break;
    case "help":
      help(msg);
      break;
    case "wiki":
      var text = cmdTxt.substr(5);
      wikiSearch(msg, text);
      break;
  }

  if (cmdTxt.substr(0,5).toLowerCase() == "fight") {

    console.log(cmdTxt.substr(6,11));

    switch(cmdTxt.substr(6,11))
    {
      /*  command for starting a game  */
      case "strt":
            console.log("creating a new class instance for an existing user")

          //iterate through the existing games to check if it already exists
          let exists = false;
          for (let i = 0; i < fightGames.length; i++) {
            console.log(fightGames[i]);
            console.log(i)
            if (fightGames[i].id == msg.author.id) {
              exists = true;
            
            }
          }

          if (exists) {
            msg.channel.send("game already exists"); 
          }else{
            fightGames.push(new fightGame.player(msg.author.id));
            msg.channel.send("started a game")
          }
          break;
      /*  command for hitting a user  */
      case "hit":
          if(fightGames.length == 1){
            msg.channel.send("no players to hit");
        }else{
            for (let i = 0; i < fightGames.length; i++) {
                if (fightGames[i].id != msg.author.id) {
                    if(!fightGames[i].checkHealth())
                    {
                        msg.channel.send("you have sent a player to gulag, he gone now");
                        fightGames.splice(i, 1);
                    }else
                    {
                        console.log(fightGames[i].health);
                        let damageAmount = Math.random() * 10;
                        fightGames[i].changeHealth( -damageAmount - 50 );
                        msg.channel.send(`did ${damageAmount} damage`)
                    }
                }
            }
        }
        break;
      case "hlth":
            for (let i = 0; i < fightGames.length; i++) {
                if (fightGames[i].id == msg.author.id) {
                    let currentHealth = fightGames[i].findHealth();
                    msg.channel.send(`your health is : ${currentHealth}`);
                }
            }
          break;
    }
  }
}

function help(msg)
{
  if(msg.content.substr(6, 8) == "fight")
  {
    let embed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('fight game help')
                    .addFields(
                      { name : "start", value : "strt : start a game", inline : false},
                      { name: "fighting", value : "hit : hits a player ~~with a super precise amount~~\nhealth : checks for the health"},
                      { name : "in-game", value : "still working on it, be patient", inline : true}
                    )
    
    msg.channel.send(embed);
  }
  else
  {
    let messageEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(" Help ")
        .setDescription("these are the available commands")
        .addFields(
          { name : "Prefix", value : "*****", inline : false},
          { name: "Games", value: "fight", inline: true },
          { name: "Commands", value: " wiki\n ping\n ", inline: true }
        )
        .setTimestamp()
        .setFooter("the message is finished, nothing to read here")

    msg.channel.send(messageEmbed)
  }
}

function wikiSearch(msg, text)
{
  search.wikiSearch(msg, text);
}

client.login(auth.token);