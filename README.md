
# Web Youtube Sharing app
Web of youtube sharing app. Built from NextJS 14.

Live mode: https://web-youtube-sharing-app-f64a1336af0b.herokuapp.com/

Server side live mode: https://web-production-33daa.up.railway.app/docs
username: admin
password: admin
Server side github: https://github.com/hoangchuongit/api-youtube-sharing-app

## Features

- User registration and login with JWT
- Sharing YouTube videos
- Real-time notifications for new video shares with Web socket

## Tech Feature
- Using Docker setup to run on local
- Also include testing modules for all components You can try with the command below after setting the environment for the application:

```sh
yarn run test
```
![N|Solid](https://github.com/hoangchuongit/web-youtube-sharing-app/assets/24239781/8ec2eaa1-85fb-4fd0-8535-cbc48f830768)

```sh
yarn run test:cov
```
![N|Solid](https://github.com/hoangchuongit/web-youtube-sharing-app/assets/24239781/19cff12f-0815-42da-92fa-eabe5ae5262e)

- In additional, use [Husky](https://typicode.github.io/husky/) to manage git commits
- ![N|Solid](https://github.com/hoangchuongit/api-youtube-sharing-app/assets/24239781/ec00c362-f23e-47f6-b9bc-86557b4c022d)

## Tech

API Youtube Sharing app uses a number of open source projects to work properly:

- [NextJS](https://nextjs.org/) - The React Framework for the Web
- [Node.js](https://nodejs.org/) - evented I/O for the backend
- [Yarn](https://yarnpkg.com/) - package manager that doubles down as project manager
- [Visual Studio Code](https://code.visualstudio.com/download) - Code editing.Redefined. Free. Built on open source. Runs everywhere.
- [Docker](https://www.docker.com/) - Accelerated Container Application Development

## Installation

API Youtube Sharing app requires [Node.js](https://nodejs.org/) v20+ and to run. Recommended to use version 20.12
In addition, also need to install [Yarn](https://yarnpkg.com/) and [Docker](https://www.docker.com/) to develop the project.

After install node you can install global packages.

```sh
npm install -g yarn
```

After clone the project, please follow the steps to run it on your local:

Step 1: install the dependencies and devDependencies:

```sh
yarn install
```

Step 2: Start docker composer and run on local:
```sh
docker compose up -d
```

The above command will create a new Container as image:

![N|Solid](https://github.com/hoangchuongit/web-youtube-sharing-app/assets/24239781/40ef8c5e-d5e5-449f-b62a-9b1c823f6279)


Web we run on host: http://localhost:3000
![N|Solid](https://github.com/hoangchuongit/web-youtube-sharing-app/assets/24239781/0bf3411c-80e4-4cca-966c-51c3fbf52a55)

Installing the Server API here is recommended: https://github.com/hoangchongit/api-youtube-sharing-app for a good local experience.

Copyright ©2024.
