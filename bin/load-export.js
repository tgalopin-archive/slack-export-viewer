#!/usr/bin/env node
'use strict';

const exportDir = __dirname+'/../export';
const apiDir = __dirname+'/../public/api';

const fs = require('fs');

console.log('Cleaning old files');

fs.readdirSync(apiDir).forEach(filename => {
    if (filename.endsWith('.json')) {
        fs.unlink(apiDir+'/'+filename, () => {});
    }
});

console.log('Loading exported data');

let channels = [];
require('../export/channels').forEach(channel => {
    channels.push({
        id: channel.id,
        name: channel.name,
        created: channel.created,
        creator: channel.creator,
        members_count: channel.members.length,
        purpose: channel.purpose.value,
        is_archived: channel.is_archived,
    });
});

let users = {};
require('../export/users').forEach(user => {
    users[user.id] = {
        name: user.name,
        real_name: user.real_name,
        picture: user.profile.image_72,
        picture_large: user.profile.image_512,
        is_deleted: user.deleted,
    };
});

console.log('Building new API data');

console.log('    Metadata');
fs.writeFile(apiDir+'/channels.json', JSON.stringify(channels), () => {});
fs.writeFile(apiDir+'/users.json', JSON.stringify(users), () => {});

if (!fs.existsSync(apiDir+'/channels')) {
    fs.mkdirSync(apiDir+'/channels');
}

channels.forEach(channel => {
    console.log('    Channel '+channel.name);

    let messages = [];

    fs.readdirSync(exportDir+'/'+channel.name).forEach(filename => {
        if (filename.endsWith('.json')) {
            require('../export/'+channel.name+'/'+filename).forEach(message => {
                let text = message.text;

                if (typeof message.files !== 'undefined') {
                    let urls = [];
                    message.files.forEach(file => urls.push(file.url_private_download));

                    text += ' (attached: ' + urls.join(', ') + ')';
                }

                messages.push({
                    user: message.user,
                    text: text,
                    ts: Math.round(message.ts),
                });
            });
        }
    });

    fs.writeFileSync(apiDir+'/channels/'+channel.name+'.json', JSON.stringify(messages), () => {});
});

console.log('Data loaded');
