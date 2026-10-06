jest.mock("mailtrap");

const { MailtrapClient } = require("mailtrap");
const enviarRecordatorio = require("../servicios/enviarRecordatorio");

describe("Pruebas de enviarRecordatorio", () => {
    let sendMock;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.MAILTRAP_API_KEY = "test_api_key";
        sendMock = jest.fn().mockResolvedValue("Correo enviado");
        MailtrapClient.mockImplementation(() => ({ send: sendMock }));
    });

    it("Debe enviar un correo con los datos correctos", async () => {
        await enviarRecordatorio("test@email.com", "Asunto Test", "Mensaje de prueba");

        expect(MailtrapClient).toHaveBeenCalledTimes(1);
        expect(MailtrapClient).toHaveBeenCalledWith({ token: "test_api_key" });
        expect(sendMock).toHaveBeenCalledTimes(1);
        expect(sendMock).toHaveBeenCalledWith({
            from: { name: "Mailtrap Test", email: "noreply@sergiozurron.site" },
            to: [{ email: "test@email.com" }],
            subject: "Asunto Test",
            text: "Mensaje de prueba",
        });
    });

    it("Debe manejar errores en el envío de correo", async () => {
        sendMock.mockRejectedValue(new Error("Fallo en el envío"));

        await expect(
            enviarRecordatorio("test@email.com", "Asunto Test", "Mensaje de prueba")
        ).rejects.toThrow("Fallo en el envío");
    });
});
