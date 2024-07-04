import nodemailer from 'nodemailer'
import { render } from '@react-email/components';
import ResetPassEmail from '../../frontend/src/components/email/resetPass'

export class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = `<${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'Brevo',
                host: process.env.BREVO_HOST,
                port: process.env.BREVO_PORT,
                auth: {
                    user: process.env.BREVO_USERNAME,
                    pass: process.env.BREVO_PASSWORD
                }
            })
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    async sendPasswordReset() {
        const emailHtml = render(Email({ url: "https://example.com" }))

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Your password reset token (Valid for only 10 minutes)',
            html: emailHtml
        }

        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() {
        const emailHtml = render(Email({ url: "https://example.com" }))

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Your password reset token (Valid for only 10 minutes)',
            html: emailHtml
        }

        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() {
        await this.send('Welcome', 'Welcome to the Natours family!')
        //the 1st 'Welcome' will be grabbed by the template in the send() and then will be passed to the pug.renderfile template option 
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (Valid for only 10 minutes)')
    }
}