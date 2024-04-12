# social_network_api
## Description
This project is a social network API that allows users to create, read, update, and delete posts, as well as add friends and post comments.

## Installation
Clone the repository and run `npm install` to install all dependencies. 

## Usage
To start the server, run `npm start`. The API endpoints can be accessed through `http://localhost:3000`.

## API Endpoints
- `POST /users`: Create a new user
- `GET /users`: Get all users
- `GET /users/:id`: Get a single user by id
- `PUT /users/:id`: Update a user by id
- `DELETE /users/:id`: Delete a user by id
- `POST /posts`: Create a new post
- `GET /posts`: Get all posts
- `GET /posts/:id`: Get a single post by id
- `PUT /posts/:id`: Update a post by id
- `DELETE /posts/:id`: Delete a post by id
- `POST /comments`: Create a new comment
- `GET /comments`: Get all comments
- `GET /comments/:id`: Get a single comment by id
- `PUT /comments/:id`: Update a comment by id
- `DELETE /comments/:id`: Delete a comment by id

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)