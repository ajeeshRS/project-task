
# Simple contact-us page

This project is a simple contact-us page.




## Features

- Quick contact-us form
- Detailed contact-us form
- Email confirmation
- Rate limiting to avoid getting spammed
- Mobile responsive
- 404 not found page
## Build with

- React js
- Tailwind css
- Node js
- Express js
- MongoDB


## Demo

https://to-let-contact-us.netlify.app


## Getting started
## Prerequisites
- Node.js
- MongoDB
- npm
### Installation

  #### 1. Clone the respository

```bash
  git clone https://github.com/ajeeshRS/project-task.git
  cd project-task
```
  #### 2. Backend setup

```bash
  cd server
  npm install
```
  #### 3. Frontend setup

```bash
  cd client
  npm install
```
    
### Configuration
  #### 1. Backend

Create a .env file in the server directory and add:

```env
MONGO_URI = 'your_mongodb_connection_string'
APP_SECRET =' your_google_app_password'
```
  #### 2. Frontend

Create a .env file in the client directory and add:

```env
VITE_API_ENDPOINT = 'http://localhost:5000'

```

## Running the Application
#### 1. Start the Backend server

```bash
  cd server
  npm start
```
  #### 2. Start the Frontend 

```bash
  cd client
  npm run dev
```
  #### 3. Open your browser and navigate to http://localhost:5173

## API Endpoints

 #### Post contact form
```
POST /contact-form
```
