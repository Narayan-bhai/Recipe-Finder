
const url = "http://localhost:5000";

function goTOLogin(){
    window.location.href = "login.html";
}
function login(email,password){
    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(async response => {
        data = await response.json()
        if(!response.ok) throw new Error(data.message)
        if(data.message == "Login successful/session created"){
            window.location.href = "index.html";
        }
    })
    .catch(error => console.log("Error while login",error.message));
}
function register(){
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("register func") 
    console.log("email",email," ",password);

    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
        })
    })
    .then(async response => {
        data = await response.json()
        if(!response.ok) throw new Error(data.message)
        if(data.message == "Register successful/user created"){
            login(email,password)
        }
    })
    .catch(error => console.log("Error while Register",error.message));
}
