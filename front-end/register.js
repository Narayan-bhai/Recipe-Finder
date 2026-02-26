
const url = "http://localhost:5000";

function goTOLogin(){
    window.location.href = "login.html";
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
    .then(async response => {
        const data = await response.json()
        console.log("status ",response.status)
        if(response.status!=200) throw new Error(data.message)
        console.log(data.message)
        if(data.message == "Register successful/user created"){
            window.location.href = "index.html";
        }
    })
    .catch(error => console.log("Error while Register",error.message));
}
