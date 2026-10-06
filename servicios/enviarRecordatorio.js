const { MailtrapClient } = require("mailtrap");

async function enviarRecordatorio(email, asunto, mensaje) {

    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_API_KEY, // You can create your API key here https://mailtrap.io/api-tokens
    });

    const resultado = await mailtrap.send({
        from: { name: "Mailtrap Test", email: "noreply@sergiozurron.site" },
        to: [{ email: email }],
        subject: asunto,
        text: mensaje,
    });

    console.log(resultado);
    return resultado;
}

module.exports = enviarRecordatorio;
