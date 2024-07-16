
let users_arr = [];
const handleSocket = (io) => {
    // on connection
    io.on('connection', (socket) => {
        let user_details = { name: socket.handshake.query.name, pref: socket.handshake.query.pref };
        user_details = { ...user_details, id: socket.id }     
        users_arr.push(user_details)     
        console.log(`connection established ${socket.id}`)
        console.log(users_arr)
        socket.on('error',(err)=>{
            console.log('Error occured',err.message)
        })
        socket.on('disconnect',()=>{
            const new_user_arr=users_arr.filter((u)=>{
                return u.id!=socket.id
            })
            users_arr=new_user_arr
            console.log(users_arr)
        })
    })
}

export { handleSocket }