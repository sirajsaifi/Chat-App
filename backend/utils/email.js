import nodemailer from 'nodemailer'
import welcomeEmail from './welcomeEmailTemp.js';
import resetEmail from './resetPassEmail.js';

class Email {
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
        const emailHtml = resetEmail(this.firstName, this.url)

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Your password reset token (Valid for only 10 minutes)',
            html: emailHtml
        }

        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() {
        const emailHtml = welcomeEmail(this.firstName, this.url)

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Welcome to ChatApp!',
            html: emailHtml
        }

        await this.newTransport().sendMail(mailOptions)
    }

}

export default Email