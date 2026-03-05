let socket = io()

let form = document.getElementById("form")
let input = document.getElementById("input")
let messages = document.getElementsByClassName("chat-messages")[0]

form.addEventListener("submit",(e)=>{
e.preventDefault()

if(input.value){

socket.emit("new msg from qais",{
mess:input.value,
id:socket.id
})

input.value=""
}
})

socket.on("new msg from qais",(data)=>{

let row = document.createElement("div")
row.className="msg-row"

let bubble = document.createElement("div")

if(data.id==socket.id){

row.classList.add("right-row")
bubble.className="message right"

}else{

let avatar=document.createElement("div")
avatar.className="avatar"
avatar.textContent=data.id[0]

row.appendChild(avatar)

bubble.className="message left"
}

bubble.textContent=data.mess

row.appendChild(bubble)

messages.appendChild(row)

messages.scrollTop=messages.scrollHeight

})