Real Time Chat Application Project.(BACKEND)

Tech Stack used: Node.js, MongoDB, html, css , js.

Steps to start the application:
* Installing nessasary dependancies : npm install
* This Applications runs on 2 servers:
        1. authentication server.
        2. DataManagement server.
* Both the server connects to Database. 
1. authentication server maintains authentication and authorization to access different content using jwt tokens.
2. Starting the server : npm run devStart2
3. server started on port 4000.
4. Connection to MongoDB:
   used mongoose to connect with mongodb.
6. routes in authServer server:
   * /users - signup page for entering details to email and password and these stored in mongodb database
     Mongodb schema designed in model/user.js.
     api request : https://localhost:4000/users
     body : { gmail : "ram@gmail.com" , password : "user123"}
     -password will convert to hashed password. using bcrypt.
   * /users/login - login page authenticating user creating jwt token.
   * jwt contains header, payload , secret key : userid , name, access-token-key.
   * response from this route will provide us jwt token.
     api request: https://localhost:4000/users/login
     body { gmail : "ram@gmail.com", password: "user123"}
     This will authenticate user from database. If user signup data present in data base it will generate a jwt token.
     jwt token will be stored in client side.
   * You can user AuthencateToken middleware to authenticate before redirecting to access any data.
  7. Another Server is running on port 3000:
  8. run server 2: npm run devStart
     This server handles messages between users:
     Tech used : socket.io, MongoDB connection
     * Implemented socket functionalities :
       4 scenarios :
       *  New-user connected to server :this message will broadcast to other users.
       *  Sending chat message : message entered by user will broadcast to other users connected on the server.(name and message).
       *  When user disconnected from server : message ("user disconnected") will broadcasted to other users.
       *  if user set status busy : open ai api will assist the user with messages.
     *   Message will be stored into database in form of json format.
     *   { "socketID" : { username : name , socketID : socket.id }
     *   MongoDB schema is designed in /models/content.js.
    8. Integrated OpenAI apis in aimodel.js : javascript function - generateChatCompletion() for the required query.
      
