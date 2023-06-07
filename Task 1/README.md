
# User Management API
This is a simple User Management API built with Node.js and Express. It provides endpoints to manage user data, including creating, updating, deleting, and searching users.

## Features
- Get a list of all users
- Get a user by ID
- Create a new user
- Update an existing user
- Delete a user
- Search users by various criteria
## Installation
1. Clone the repository:
	```bash
	git clone https://github.com/bedirhanyildirim/Picket-Code-Challenges.git
2. Navigate to the project directory:
	```bash
	cd Task\ 1
3. Install the dependencies:
	```bash
	npm install
4. Start the server:
	```bash
	npm run server
5. Test:
	```bash
	npm run test
## API Endpoints
The following API endpoints are available:
-  **GET /users**: Get a list of all users.
-  **GET /users/byId/:id**: Get a user by ID.
-  **GET /users/search**: Search users by criteria.
-  **POST /users**: Create a new user.
-  **PUT /users/:id**: Update an existing user.
-  **DELETE /users/:id**: Delete a user.

## Data
User data is stored in users.json in data folder.