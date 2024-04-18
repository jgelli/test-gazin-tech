
# Fullstack Test Gazin Tech

This project has two parts, the frontend and the backend. The backend was made with Nestjs (Typescript) and Prisma ORM (Object Relational Mapper for Javascript). The frontend was made with React (Typescript) and ChakraUI.











## Installation

First off all, copy the .env.example and fill in the variables

```bash
    cp .env.example .env
```

Run docker-compose to build the project

```bash
    docker-compose up -d
```

Push the migration to database

```bash
    make backend-db-push
```

Access the backend documentation in `localhost:3000/docs`

The frontend will be available on the route `localhost:8080`
    
## Screenshots

![Developer List](https://github.com/jgelli/test-gazin-tech/assets/52708022/30f3e7e7-a86e-4731-8859-461a6230036e)
![Developer_Create](https://github.com/jgelli/test-gazin-tech/assets/52708022/bbb8635b-f4e3-4aa4-8ecf-bfb7b8fb6192)
![Backend_Docs](https://github.com/jgelli/test-gazin-tech/assets/52708022/8bfa4a27-ac62-4d68-9118-a47bc7452538)

