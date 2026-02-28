
const url = "http://localhost:5000";

function goToRegister(){
    window.location.href="register.html";
}
function login(){
    const email = document.getElementById("email").value;
    const passowrd = document.getElementById("password").value; 
    console.log("email",email," ",passowrd);
    fetch("http://localhost:5000/login", {
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
        if(data.message == "Login successful/session created"){
            window.location.href = "index.html";
        }
    })
    .catch(error => console.log("Error while login",error.message));
}
