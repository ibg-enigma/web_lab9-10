function logIn(evt) {
    deleteErrors();
    
    let login_field = document.getElementById("login");
    let password_field = document.getElementById("password");

    let loginIsEmpty = checkEmpty(login_field);
    let passwordIsEmpty = checkEmpty(password_field);
    if (!(loginIsEmpty || passwordIsEmpty)) {
        let data = {
            login: login_field.value,
            password: password_field.value
        }
        sendToServer(data);
    }
}

function checkEmpty(elem) {
    if (elem.value.trim() == 0) {
        let errorMsg = document.createElement('div');
        errorMsg.textContent = "Empty field";
        errorMsg.className = "error";
        elem.after(errorMsg);

        return true;
    }

    return false;
}

function deleteErrors() {
    errors = document.getElementsByClassName('error');
    for (let i = errors.length - 1; i >= 0; i--) {
        errors[i].remove();
    }
}

function sendToServer(data) {
    let url = "http://localhost:3000";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.text())
        .then((text) => {
            alert(text);
        });
} 