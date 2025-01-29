
# Project Setup Instructions

## Frontend (Client) Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend should now be running at `http://localhost:3000`.

## Backend Setup
1. Navigate to the root of the project (backend code is in the root folder).
   ```bash
   cd <root-folder>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the backend server using `nodemon` or `node`:
   - Using `nodemon` (Recommended for development):
     ```bash
     nodemon
     ```
   - Using `node`:
     ```bash
     node server.js
     ```

   The backend should now be running at `http://localhost:5000`.

## Project Structure

### Frontend (Client):
- Components: `client/src/components/`
- Redux Store: `client/src/redux/`
- Pages: `client/src/pages/`

### Backend:
- Routes: `backend/routes/`
- Controllers: `backend/controllers/`
- Models: `backend/models/`
- Middleware: `backend/middleware/`

## Running Tests
(if applicable)
- For frontend tests:
   ```bash
   npm test
   ```
- For backend tests (if using a testing library like Jest):
   ```bash
   npm test
   ```

