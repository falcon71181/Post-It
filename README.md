# ⚡Post-It⚡
<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,ts,tailwind,postgres,nodejs" />
  <br/>
</p>
<br/><br/>


## Overview
Post-It is an interactive online platform that facilitates engaging discussions and community interaction. With user registration and login features, members can post topics, share opinions, and engage in conversations, fostering a dynamic space for diverse discussions.

## 🔥Features
- **User Authentication & Authorization:** TaskSync provides secure user authentication and authorization, ensuring that only authenticated users can access and manage tasks.
- **CRUD Operations:** Users can create, read, update, and delete tasks associated with their account.
- **Global Chat:** Using socket.io for global chat where every online users can chat with each other.
- **Community Forum:** Users can create threads , and users can replies and discuss things around the thread topic.

#### 🧬 Running locally for development

## Installation
1. Clone the TaskSync repository to your local machine:
```bash
git clone https://github.com/falcon71181/Post-It
cd Post-It
```

2. Navigate to the `client/` directory:
```bash
cd client/
```

3. Install client dependencies using your preferred package manager (e.g., npm, npm, yarn, bun):
```bash
bun install
```

4. Create a `.env` file in the `client/` directory and add the following variables:
```dotenv
NEXT_PUBLIC_SERVER=http://localhost:3333
```

5. Navigate to the `server/` directory:
```bash
cd ../server/
```

6. Install server dependencies using your preferred package manager:
```bash
bun install
```

7. Create a `.env` file in the `server/` directory and add the following variables:
```dotenv
# DB related values and credentials
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=postit
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432

CLIENT_PORT=3000
SERVER_PORT=3333
CLIENT_ORIGIN=http://localhost:3000
SERVER_ORIGIN=http://127.0.0.1:3333

# Cors related values
ALLOWED_ORIGINS='http://localhost:3000, http://localhost:4173, http://localhost
:8000'
ALLOWED_METHODS='GET, POST, PATCH, OPTION, PUT, DELETE
```

## Usage
1. Start the server:
```bash
bun run dev
```
### or
```bash
nodemon
```

2. Start the client:
```bash
cd ../client/
bun run dev
```

3. Access the client interface at http://localhost:3000.

## 🍄Technologies Used
- postgreSQL
- TypeScript
- Tailwind CSS
- Fastify
- Node.js
- Next.js
- JSON Web Tokens (JWT) for authentication
- Bcrypt

## 🤖 References
- [TailwindCSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [postgreSQL](https://www.postgresql.org/)
- [Fastify](https://fastify.dev/)
- [SocketIO](https://socket.io/)

## 💖  Contribution 🤝
Contributions to enhance the functionality or improve the codebase are welcome! Feel free to open issues or pull requests.
