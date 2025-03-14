const socket = io('http://localhost:8000');

const form = document.querySelector("#send-container");
const messageInput = document.querySelector("#messageInp");
const messageContainer = document.querySelector(".container");

const name = prompt("enter your name...")

form.addEventListener("submit",(event)=>{
 event.preventDefault();
 const message = messageInput.value;
 append(`You: ${message}`,'right');
 socket.emit('send',message);
 messageInput.value="";
})

const append=(message,position)=>{
    const messageElement = document.createElement("div")
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);


}



socket.emit('new-user-joined',name)

socket.on('user-joined',(name)=>{
 append(`${name} joined the chat`,"right")
})

socket.on('receive',(data)=>{
 append(`${data.name}: ${data.message}`,"left")
})