let emailRef = document.getElementById('email');
let passwordRef = document.getElementById('password');
let loginRef = document.getElementById('login');
let registerRef = document.getElementById('registerBtn');

registerRef.addEventListener('click', function() {
    window.location.href = "./register/register.html";
});

login.addEventListener('click', function(e) {
    e.preventDefault();
    let email = emailRef.value;    
    let password = passwordRef.value;

    if (email in localStorage) {
        // alert(localStorage.getItem(email));
        let user = localStorage.getItem(email);
        let userData = JSON.parse(user);
        if (userData.password === password) {
            alert("Logged in successfully!");
            localStorage.setItem("userID", email);
            window.location.href = "./main/main.html";
        } else {
            alert("Incorrect password");
        }
    } else {
        alert("Your email address is not registered");
        return;
    }
});

