require('dotenv').config();

const { REST, Routes, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

const data = [
    {
        name: 'explain',
        description: 'Get an explanation for code',
        options: [
            {
                name: 'code',
                description: 'The code to explain',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },{
        name: 'convert',
        description: 'Convert your code to desired language',
        options: [
            {
                name: 'lang',
                description: 'The language you want',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'code',
                description: 'The code to convert',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ] 
    }
];

const rest = new REST({ version: '10' }).setToken(`${process.env.TOKEN}`); 
  
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
  
        await rest.put(Routes.applicationGuildCommands(`${process.env.CLIENT_TOKEN}`,`${process.env.GUILD_TOKEN}`), { body: data });
  
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
