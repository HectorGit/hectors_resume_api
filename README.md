
#### API

1. Clone the API repo to your local drive using the following command (note: do not clone this inside of your local solaires-flask repository).

    ```bash
    git clone https://gitlab.com/solaires/solaires-api.git  'solaires-api'
    ```

2. Enter your local repository and use NPM to install dependencies.

    ```bash
    cd 'solaires-api' && npm install
    ```

3. Run the API using Nodemon.

    ```bash
    nodemon my_resume_api.js
    ```

    If you do not have nodemon install it globally first with NPM

    ```bash
    npm install -g nodemon
    ```

#### Database

1. To clone the database type the following command into your terminal.

    ```bash
    heroku pg:pull postgresql-animate-92158 'solaires_local' --app solaires-api
    ```

2. In your local API repository open the `.env` file and modify line 3 to your postgreSQL database name credentials.

    `DATABASE_URL=postgresql://'postgres username':'postgres password'@localhost:5432/solaires_local`