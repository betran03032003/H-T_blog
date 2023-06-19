function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


function openForm() {
    document.getElementById("modal").style.display = "block";
}


function closeForm() {
    document.getElementById("modal").style.display = "none";
}

//Login 
const adminEmail = [
    'huyentran0303',
    'lanhuong'
];
const adminPassword = [
    '21103101',
    '21103040'
];
const avt = [
    'profile-1',
    'profile-2'
];

function login() {
    var u = document.querySelector('#username').value;
    var p = document.querySelector('#password').value;
    const avtUser = document.querySelector(".avatar");
    let dem = 0;
    for(var i =  0; i< adminEmail.length; i++){
        if(u == adminEmail[i] && p==adminPassword[i]){
            avtUser.src = `assets/img/Pictures/${avt[i]}.jpg`;
            dem++;
        }
    }
    if(dem == 1) {
        alert('Đăng nhập thành công');
        document.getElementById("modal").style.display = "none";
        //document.querySelector("div .login").innerHTML = u;
        document.querySelector(".login-btn .login").style.display ="none";
        document.querySelector(".user-avt").style.display = "block";
    }else {
        alert('Đăng không nhập thành công');
    }
}

document.querySelector(".log-out").addEventListener("click", () => {
    document.querySelector(".user-avt").style.display = "none";
    document.querySelector(".login-btn .login").style.display ="block";
});