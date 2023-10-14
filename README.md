# easy-bill-api

`easy-bill-api` is a RESTful API designed to streamline financial and account management for the `easy-bill-app` and `easy-bill-mobile` applications. It facilitates convenient interaction with the database, allowing access to account and financial operations through HTTP requests.

## Overview

This repository contains the backend logic and endpoints necessary to manage financial accounts, transactions, and related data for the `easy-bill-app` and `easy-bill-mobile`. The API provides essential functionalities to create, update, and retrieve financial information, enabling seamless integration with the respective applications.

## API Endpoints

- **Authentication Endpoints**:

  - `POST /api/users/signin`: Authenticate a user and obtain an access token.
  - `POST /api/users/signup`: Register a new user.

- **Account Endpoints**:

  - `GET /api/users`: Retrieve a list of user accounts.
  - `GET /api/users/{id}`: Retrieve information about a specific account.
  - `PUT /api/users/{id}`: Update account information.
  - `DELETE /api/users/{id}`: Delete an account.

- **Financial Operations Endpoints**:
  - `POST /operations/income`: Add a new income entry.
  - `POST /operations/expense`: Add a new expense entry.
  - `POST /operations/transfer`: Add a new transfer entry.
  - `GET /operations`: Retrieve a list of financial transactions.
  - `GET /operations/{id}`: Retrieve information about a specific financial transaction.

## Getting Started

To set up and run the `easy-bill-api` on your local machine, follow these steps:

1. Clone this repository to your local environment.
2. Install the necessary dependencies using your preferred package manager.
3. Configure the database connection and environment variables.
4. Run the application using the appropriate command for your environment.

## Contributing

We welcome contributions from the community. If you would like to contribute to this project, please follow [Conventional Commits](https://www.conventionalcommits.org/en).

## License

This project is licensed under the MIT License.
