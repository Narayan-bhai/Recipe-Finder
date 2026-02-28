
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
        const data = await response.json()
        if(response.status!=200) throw new Error(data.message)
        if(data.message == "Login successful/session created"){
            window.location.href = "index.html";
        }
    })
    .catch(error => console.log("Error while login",error.message));
}
function register(){
    const email = document.getElementById("email").value;
    const passowrd = document.getElementById("password").value;
    console.log("register func") 
    console.log("email",email," ",passowrd);
    return fetch("http://localhost:5000/register", {
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
    .then(response => {
        if(response.status!=200) throw new Error(data.message)
        return response
    })
    .then(response => response.json())
    .then(data => {
        if(data.message == "Register successful/user created"){
            login(email,passowrd)
        }
    })
    .catch(error => console.log("Error while Register",error.message));
}
