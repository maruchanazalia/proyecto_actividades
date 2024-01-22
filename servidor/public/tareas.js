
const socket = io("ws://localhost:3000");

//dom elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
    socket.emit('tareas:lista', {
        username: username.value,
        message: message.value
    });
});

message,addEventListener('keypress', function(){
    socket.emit('chat:typing',username.value);
})

socket.on('tareas:lista', function (data) {
    console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on('chat:typing', function (data) {
    console.log(data);
    actions.innerHTML = `<p><em>${data} está haciendo un comentario</em></p>`;
});
