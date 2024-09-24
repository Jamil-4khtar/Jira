let nameRef = document.getElementById("name");
let emailRef = document.getElementById("email");
let passwordRef = document.getElementById("password");
let confirmRef = document.getElementById("confirmpwd");
let registerRef = document.getElementById("register");

registerRef.addEventListener("click", (e) => {
    e.preventDefault();
    let name = nameRef.value;
    let email = emailRef.value;
    let password = passwordRef.value;
    let confirmPassword = confirmRef.value;

    if (name == "" || email == "" || password == "" || confirmPassword == "") {
        alert("Please fill out all fields");
    }else if (!email.includes("@") && !email.includes(".")) {
        alert("Invalid email format");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
    } else if (password !== confirmPassword) {
        alert("Passwords do not match");
    }
    let user = { 
        name: name,
        email: email,
        password: password,
    };
    
    localStorage.setItem(email, JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "/index.html";
});