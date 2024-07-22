let users_obj = {};
let searching_user = {};

const handleSocket = (io) => {
  // on connection
  io.on("connection", (socket) => {
    let user_details = {
      name: socket.handshake.query.name,
      pref: socket.handshake.query.pref,
      id: socket.id,
      connected_user: null, // Add a field for storing the connected user ID
    };

    // Add user details to the object
    users_obj[socket.id] = user_details;

    console.log(`Connection established ${socket.id}`);
    console.log(users_obj);

    socket.on("error", (err) => {
      console.log("Error occurred", err.message);
    });

    socket.on("findusertoconnect", (userdata) => {
      const { myid } = userdata.userdata;  
      
      if (users_obj[myid]) {
        searching_user[myid] = userdata.userdata;
        // console.log('User added to searching_user:', searching_user);

        // Check if there are more than 2 users searching
        if (Object.keys(searching_user).length > 1) {
          let found = false;

          // Iterate through searching_user to find another user with a different ID
          Object.keys(searching_user).forEach((id) => {
            if (id !== myid && !found) {
              // Connect the two users
              users_obj[myid].connected_user = id;
              users_obj[id].connected_user = myid;

              
              // Emit event to notify both users
              socket.emit("connectWithUser", { user: users_obj[id] });
              io.to(id).emit("connectWithUser", { user: users_obj[myid] });
              
              // Remove the users from the searching_user object after they are connected
              delete searching_user[myid];
              delete searching_user[id];
              
              found = true;              
              console.log(`Connected user ${myid} with user ${id}`);    
              console.log(users_obj);        
            }
          });
        }
      }
    });
    
    socket.on('disconnectuser',()=>{
        const connectedUserId = users_obj[socket.id]?.connected_user;  
        if(users_obj[socket.id]?.connected_user){
            users_obj[socket.id].connected_user=null
        }      
        if (connectedUserId) {
          io.to(connectedUserId).emit("userDisconnected", { userId: socket.id });
          // Also clear the connected_user field of the connected user
          users_obj[connectedUserId].connected_user = null;
        }          
    })
    socket.on("sendMessage", (messageData) => {
      const connectedUserId = users_obj[socket.id]?.connected_user;
      if (connectedUserId) {
        // Emit the message to both the sender and the connected user
        socket.emit("receiveMessage", messageData);
        io.to(connectedUserId).emit("receiveMessage", messageData);
      }
    });

    socket.on("disconnect", () => {
      // Notify the connected user if they exist
      const connectedUserId = users_obj[socket.id]?.connected_user;
      if (connectedUserId) {
        io.to(connectedUserId).emit("userDisconnected", { userId: socket.id });
        // Also clear the connected_user field of the connected user
        users_obj[connectedUserId].connected_user = null;
      }

      // Remove user details from the object
      delete users_obj[socket.id];
      delete searching_user[socket.id];
    //   console.log(users_obj);
    });
  });
};

export { handleSocket };
