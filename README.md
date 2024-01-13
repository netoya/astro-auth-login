# Astro Auth Login

This is a simple example of how to use Astro Auth to create a login page.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── functions/
│       └── session.ts
│   └── modules/
│       └── auth/
│           ├── pages/
│           │   ├── Login.astro
│           │   └── Logout.astro
│           ├── components/
│           │   └── LoginCard.astro
│           ├── handlers/
│           │   └── AuthController.ts
|       └── common/
│           └── components/
│               ├── Header.astro
│               ├── Button.astro
│               └── Input.astro
│           └── layouts/
│               └── MainLayout.astro
│       └── home/
│           └── pages/
│               └── Home.astro
│   └── session/
```

## 🧙‍♂️ Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/netoya/astro-auth-login.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

### 4. Open the project

Your site is now running at `http://localhost:4321`!

## 📝 Reading the code

This project is a simple example of how to use Astro Auth to create a login page.

Sessions are stored in a cookie using [astro-cookie](https://docs.astro.build/core-concepts/cookies)

Session data is stored in the sessions folder.

The SessionManager class is used to manage sessions.

The methods are:

- getID - returns the session ID for the current cookie
- reset - resets the session data from the session file in the sessions folder
- getData - returns the session data from the session file in the sessions folder
- save - saves the session data to the session file in the sessions folder
- existsSessionFile - checks if the session file exists in the sessions folder


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
