let express=require("express")
let http=require("http")
let socket=require("socket.io")
let path=require("path")

let app=express()
let server=http.createServer(app)

let socketserver=new socket.Server(server)
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.get("/chat/:name",(req,res)=>{

let username=req.params.name

console.log("username:",username)

res.render("chat",{name:username})

})



socketserver.on("connection",(clientks)=>{
    console.log("connected")
    clientks.on("new msg from qais",(msg)=>{
        console.log("qais msg",msg)
        socketserver.emit("new msg from qais",msg)  // this for send clint

    })
    
})
server.listen(9000,()=>{
    console.log("port running on 9000")
})