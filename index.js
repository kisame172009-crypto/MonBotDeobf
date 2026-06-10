const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot en ligne ! ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    if (interaction.commandName === 'deobf') {
        const code = interaction.options.getString('code');
        await interaction.reply({
            content: `\`\`\`lua\n${code}\n\`\`\``,
            ephemeral: false
        });
    }
});

const commands = [{
    name: 'deobf',
    description: 'Désobfusque du code Lua',
    options: [{
        name: 'code',
        type: 3,
        description: 'Le code à désobfusquer',
        required: true
    }]
}];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('✅ Commandes slash enregistrées');
    } catch (error) {
        console.error('Erreur commandes:', error);
    }
    client.login(process.env.DISCORD_TOKEN);
})();
