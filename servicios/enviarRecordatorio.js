const { MailtrapClient } = require("mailtrap");

async function enviarRecordatorio(email, asunto, mensaje) {

    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_API_KEY, // You can create your API key here https://mailtrap.io/api-tokens
    });

    const resultado = await mailtrap.send({
        from: { name: "Learn2Program", email: "noreply@sergiozurron.site" },
        to: [{ email: email }],
        template_uuid: process.env.MAILTRAP_REMINDER_TEMPLATE_ID,
        template_variables: {
            "continue_url": process.env.URL + "/ver-teoria-curso"
        }
    });

    console.log(resultado);
    return resultado;
}

module.exports = enviarRecordatorio;
