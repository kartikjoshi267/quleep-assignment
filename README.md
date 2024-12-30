# Blog Application

This application is a blog application. It allows users to create, read, update, and delete posts.

## Live Demo

The link to the live demo of this application is [https://client-8gkt.onrender.com/](https://client-8gkt.onrender.com/).

__Note the application might take upto 1-2 minutes to load because it has been hosted on a free hosting service. The same applies to the API requests The hosting service states that__

_Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more_.

## How to run application locally?

1. Clone the repository.
   ```bash
   git clone https://github.com/kartikjoshi267/quleep-assignment
   ```
   
2. __Running the server (backend):__
   - Installing dependencies
     ```bash
     cd server
     npm install
     ```
   - Creating .env file
     ```
     JWT_SECRET_STRING=secret
     MONGO_URI=your-mongo-connection-string-here
     ```
   
   - Running the server
     ```bash
     npm run start
     ``` 

3. __Running the client (frontend):__
   - Installing dependencies
     ```bash
     cd client
     npm install
     ```

   - Creating .env file
     ```
     VITE_APP_BACKEND_URL=http://localhost:8000
     VITE_APP_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     VITE_APP_CLOUDINARY_API_KEY=your-cloudinary-api-key
     VITE_APP_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-upload-preset
     ```

   - Running the client
     ```bash
     npm run dev
     ```