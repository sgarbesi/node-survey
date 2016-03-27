# node-survey

This is a basic Node.js survey example using the Express framework.

---

## Prerequisites

- MySQL
- Node.js >=0.10.0

---

## Noteworthy Dependencies

- Bootstrap 3
- Express 4
- jQuery 2
- Handlebars
- PM2
- Sequelize

---

## Installation

From the CLI navigate to the project directory and run the following command:

```bash
npm install;
```

You'll be prompted to enter the MySQL credentials, along with the Express HTTP server settings.

After the installation is completed you can start the server with the following command:

```bash
npm start;
```

If you need to re-run the setup, run the following command:

```
npm run setup;
```

---

## Web Access

Once the server is running you should be able to access the following URLs.
Note to adjust the domain and port accordingly if you changed the default settings.

**Survey:** http://localhost:3000/

**Admin:** http://localhost:3000/admin/

The admin credentials are stored in the MySQL database under the `admin` table.
The admin `password` is stored in cleartext.

The following credentials are added by default and can be used to access the admin through the web:

**Username:** admin

**Password:** pass

---

## CLI

Starting the project:

```bash
npm start;
```

Setting up the project:

```bash
npm run setup;
```

Developing with the project:

```bash
npm run dev;
```

Syncing the datastore:

```bash
npm run sync;
```

Testing the project:

```bash
npm test;
```
