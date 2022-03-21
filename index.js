const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');

(async () => {
    const apiIdRaw = await input.text('api_id');
    const apiId = parseInt(apiIdRaw, 10);
    const apiHash = await input.text('api_hash');
    const stringSession = new StringSession('');
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 })
    await client.start({
        phoneNumber: async () => await input.text('number ?'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    console.log('You should now be connected.')
    const session = client.session.save();
    console.log(JSON.stringify({
        "apiId": apiId,
        "session": session,
        "apiHash": apiHash
    }, null, 2));
    await client.destroy();
})();

