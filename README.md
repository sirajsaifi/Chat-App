# MERN Stack Project: Build and Deploy a Real Time Chat App | JWT, Socket.io, Botpress (Custom AI Chatbot), Brevo, Mailtrap

## Video Demo

Watch the demo video on [LinkedIn](https://www.linkedin.com/posts/siraj-saifi_hey-connections-heres-my-new-project-activity-7216347293413691393-AnvV?utm_source=share&utm_medium=member_desktop).

Some Features:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- ❄ Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status (Socket.io and React Context)
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- 🌐 Reset password if user forgots the password
- 📧 Sending users automatic Emails on signup and reset password token
- ⚙ Custom AI Chatbot (Botpress)
- ⭐ At the end Deployment like a pro for FREE!
- ⏳ And much more!

### Setup .env file

```js
NODE_ENV = development
PORT = paste your backend port here
DATABASE = paste your MongoDB for VS Code url here
DATABASE_PASSWORD = paste your database password here

JWT_SECRET = write your JWT_SECRET
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES_IN =

//create an account on mailtrap, go to Email testing then inboxes and click on add project. Open the project click on Integration and copy the following values from there
EMAIL_HOST = smtp.mailtrap.io
EMAIL_PORT = paste your mailtrap port
EMAIL_USERNAME = paste your mailtrap username
EMAIL_PASSWORD = paste your mailtrap password

EMAIL_FROM =

//create account on Brevo, go to 'SMTP & API' and copy the following values from there
//NOTE: Brevo only works for production environment in this project
BREVO_USERNAME = paste your brevo login
BREVO_PASSWORD = paste your brevo password
BREVO_PORT = paste your brevo port
BREVO_HOST = paste your brevo host
```

### How email template will look to users

Use maildrop to create a temporary disposal email and use their inbox

### Chatbot Implementation

script for botpress are implemented in index.html file. Read botpress tutorial

### Build the app

```shell
npm run build
```

### Start the app (development)

```shell
npm run start:dev
```

### Start the app (production)

```shell
npm run start:prod
```
