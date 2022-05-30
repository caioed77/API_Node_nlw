import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../email-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "86fbaa2b0a534f",
        pass: "3cd0a79ab47650"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {


        await transport.sendMail({
            from: 'Equipe Feedget <gi@feedget.com>',
            to: 'caio <batata@gmail.com>',
            subject,
            html: body,

        });

    };
}