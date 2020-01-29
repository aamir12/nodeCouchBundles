let DOMAIN = 'sandbox01dd92924179489aa7ac17a31a75ab2a.mailgun.org';
let API_KEY = '1faa249f5526cf3ff62079e14f5f8acd-0a4b0c40-0c4e4396';
let mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

exports.testMailGun = (req,res,next) => {
    const data = {
        from: 'Excited User <support@codexking.com>',
        to: 'aamirkhan8878@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
    };

    mailgun.messages().send(data, (error, body) => {
       console.log(body);
    });
}