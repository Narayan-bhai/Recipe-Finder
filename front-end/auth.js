
const url = "http://localhost:5000";
function redirect(){
}
function login(){
    const email = document.getElementById("email").value;
    const passowrd = document.getElementById("password").value; 
    console.log("email",email," ",passowrd);
    return fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: passowrd
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.message = "Login successful/session created"){
            window.location.href = "index.html";
        }
    })
    .catch(error => console.log(error));
}
