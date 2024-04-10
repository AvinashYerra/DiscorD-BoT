require('dotenv').config();
const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
    console.log('Bot is ready.');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.user.bot) return;

    const { commandName, options } = interaction;

    if (commandName === 'explain') {
        const code = options.getString('code');
        let explanation = await getExplanation(code);
        explanation = explanation.toString(); // Convert to string
        if (explanation) {
            await interaction.reply({ content: explanation, ephemeral: true }).catch(console.error);
        } else {
            await interaction.reply({ content: "Unable to provide explanation.", ephemeral: true }).catch(console.error);
        }
    } else if (commandName === 'convert') {
        const lang = options.getString('lang');
        const code = options.getString('code');
        let convertedCode = await convertCode(lang, code);
        convertedCode = convertedCode.toString(); // Convert to string
        if (convertedCode) {
            await interaction.reply({ content: convertedCode, ephemeral: true }).catch(console.error);
        } else {
            await interaction.reply({ content: "Unable to convert code.", ephemeral: true }).catch(console.error);
        }
    }
});



async function getExplanation(code) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user", 
                        "content": `can you explain the ${code}`
                
                  }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`,
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error.response.data.error);
        return 'Sorry, an error occurred while processing your request.';
    }
}

async function convertCode(lang, code) {
    // Placeholder function for code conversion, you can implement this based on your requirements
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user", 
                        "content": `can you convert the ${code} into ${lang}`
                
                  }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`,
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error.response.data.error);
        return 'Sorry, an error occurred while processing your request.';
    }
}

client.login(`${process.env.TOKEN}`);