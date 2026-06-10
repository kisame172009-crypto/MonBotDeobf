const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

console.log("Token présent :", token ? "OUI" : "NON");
console.log("Client ID :", clientId);

if (!token || !clientId) {
    console.error("❌ DISCORD_TOKEN ou CLIENT_ID manquant dans les variables !");
    process.exit(1);
}

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

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log('✅ Commandes slash enregistrées');
    } catch (error) {
        console.error('❌ Erreur commandes:', error.message);
    }
    client.login(token);
})();
