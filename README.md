# Tryout Online
is a web-based tryout platform designed to help students prepare for exams more effectively and efficiently. With an interactive and real-time system, Tryout-Online provides a variety of tryout questions that are tailored to educational levels, from elementary school, junior high school, to vocational school.


## Key Features
- Interactive Tryout – A test simulation that is close to the real exam with an automatic scoring system.
- Category-Based Questions – Questions are available based on difficulty levels: easy, medium, and hard.
- Leaderboard – A ranking system to see the best results from other tryout participants.
- Hint & Timer – Optional help to answer questions and time limits to improve focus and punctuality.
- Superadmin Dashboard – A special feature to easily manage questions and tryout sessions.

With Tryout-Online, students can measure their abilities, evaluate tryout results, and improve their readiness before facing the real exam. Join now and increase your chances of success in your exam! 🚀


## Tech Stack

**Client:** EJS, AlpineJS, TailwindCSS

**Server:** Node, Express

**Database:** Sequelize, mySQL

## Instalation

Before running, please configure the database first so that no errors occur, and if so, run the command in the command prompt, an example of a command is more or less as below.

### with npm installed

```bash
npm install && npm run dev
```

### with pnpm installed

```bash
pnpm install && pnpm dev
```

### with yarn installed

```bash
yarn install && yarn run dev
```

## Structure base

```
└── 📁tryout-online
    └── 📁assets
        └── 📁css
            └── style.css
        └── 📁favicon
            └── android-chrome-192x192.png
            └── android-chrome-512x512.png
            └── apple-touch-icon.png
            └── favicon-16x16.png
            └── favicon-32x32.png
            └── favicon.ico
            └── site.webmanifest
        └── 📁images
            └── 404.svg
            └── book.jpg
            └── classroom.jpg
            └── grid-01.svg
            └── library.jpg
            └── 📁logo
                └── try.svg
                └── tryout-online.svg
            └── love-learn.jpg
    └── 📁configs
        └── utils.js
    └── 📁controllers
        └── authControllers.js
        └── userControllers.js
    └── 📁database
        └── connection.js
        └── models.js
    └── 📁middleware
        └── csrfMiddleware.js
        └── globalMiddleware.js
    └── 📁routes
        └── api.js
        └── dashboard.js
        └── index.js
        └── users.js
    └── 📁views
        └── 404.html
        └── 📁authentication
            └── login.ejs
            └── register.ejs
        └── 📁dashboard
            └── grids.ejs
            └── header.ejs
            └── index.ejs
            └── listUsers.ejs
            └── profile.ejs
            └── sidebar.ejs
            └── tableSoal.ejs
        └── 📁home
            └── about.ejs
            └── callAction.ejs
            └── faq.ejs
            └── footer.ejs
            └── hero.ejs
            └── index.ejs
            └── navbar.ejs
            └── review.ejs
            └── script.ejs
        └── 📁layouts
            └── dashboard.ejs
            └── index.ejs
        └── 📁partials
            └── edit.ejs
            └── loader.ejs
            └── modals.ejs
    └── .prettierrc
    └── index.js
    └── jsconfig.json
    └── package-lock.json
    └── package.json
    └── postcss.config.cjs
    └── tailwind.config.cjs
    └── webpack.config.cjs
```

## Authors

- [@Farhannnn](https://www.github.com/Fxc7)


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Contributing

no contributions yet. maybe you want some?

## Feedback

If you have any feedback, please reach out to us at farhanxcode7@gmail.com