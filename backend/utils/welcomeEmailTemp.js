const welcomeEmail = (userName, url) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <title>Welcome to ChatApp!</title>
    <style>
        /* Add your email styles here */
        body {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2vh 3vw;
            background-color: rgb(232, 237, 237);
        }

        .container {
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;
            padding: 8vh 2vw;
            background-color: white;
            border: 1px solid rgb(16, 53, 112);
            border-radius: 4vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        header {
            width: 100%;
            text-align: center;
            color: rgb(59 130 246);
            font-size: 1.875rem;
            font-weight: 600;
            margin: 1vh 0 5vh 0;
        }

        .main-heading {
            text-align: center;
            margin: 0 0 3vh 0;
            font-size: 30px;
            font-weight: 500;
        }

        p {
            margin: 0;
        }

        footer {
            margin: 3vh 0 0 0;
            width: 100%;
        }

        .container-2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 3vh 1vw;
            font-weight: 100;
            color: black;
            font-size: 3vh;
        }

        button {
            padding: 1vh 1vw;
            margin: 3vh 0 1vh 0;
            color: white;
            background-color: rgb(59 130 246);
            border: solid rgb(59 130 246);
            border-radius: 10px;
        }

        main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <div class="container">
        <header>
            ChatApp
        </header>
        <main>
            <div class="main-heading">Welcome to ChatApp</div>
            <div>
                <p>Hello, ${userName}!</p>
                <p>Thank you for signing up. We are excited to have you onboard.</p>
                <p>Click the button below to login</p>
            </div>
            <a href='${url}' target="_blank"><button>Login</button></a>
        </main>
        <footer>
            <p>Best regards,</p>
            <p>ChatApp Team</p>
        </footer>
    </div>
    <div class="container-2">
        <div>Dehradun, India</div>
        <div><u>Unsubscribe</u> from our emails</div>
    </div>
</body>

</html>
`;

export default welcomeEmail