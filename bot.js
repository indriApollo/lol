const Discord = require('discord.js');

const bot = new Discord.Client();

const token = 'MzIxMjc2MzY1NDA2MDc2OTMw.DBbrdw.t1MQXzlq2TIQzShjGjJTGfzRQwo';

const filenames = [
	'wtc',
	'boxxy',
	'touille',
	'gitan',
	'surprise',
	'build',
	'orphan',
	'avril',
	'iorveth'
];

var playing = false;

var helpmsg = "cmds: \nhelp\n";

for(var i = 0; i<filenames.length ; i++) {
	helpmsg += filenames[i]+"\n";
}

bot.on('ready', () => {
	console.log('Bot started');
	bot.user.setGame("indriapollo.be");
	bot.voiceConnections
});

bot.on('message', message => {
	if(playing) return;

	function playogg(filename) {
		if (!message.member.voiceChannel) return; // user has to be in a voice channel
		message.member.voiceChannel.join().then(connection => {
			playing = true;
			console.log("play "+filename);
			connection.playFile(filename+".ogg").on('end', end => {
				connection.disconnect();
				playing = false;
			});
		}).catch(function(e) {
			console.log(e);
		});
	}

	var matches = message.content.match( /^!lol\s?(\S*)?/ );
	if (matches) {
		var filename;
		if(!matches[1]) {
			playogg(filenames[Math.floor(Math.random()*5)]); // only top 5
		}
		else if(filenames.indexOf(matches[1]) == -1 || matches[1] == "help") {
			message.channel.send(helpmsg);
		}
		else {
			playogg(matches[1]);
		}
	}
});

bot.login(token);
