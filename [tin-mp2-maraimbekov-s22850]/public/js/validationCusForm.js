function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const nickNameInput = document.getElementById('nickName');
    const phoneNumberInput = document.getElementById('phoneNumber');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorlastName');
    const errorNickName = document.getElementById('errornickName');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorsSummary = document.getElementById('errorsSummary')

    resetErrors([firstNameInput, lastNameInput, nickNameInput, phoneNumberInput], 
        [errorFirstName, errorLastName, errorNickName, errorPhoneNumber], errorsSummary)

    let valid = true;


    //first name validation
    if(!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "The field is required.";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "The field should contain 2 to 60 characters.";
    }
    //last name validation
    if(!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "The field is required.";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "The field should contain 2 to 60 characters.";
    }
    //nick name validation
    if(nickNameInput.value || !nickNameInput.value.toString().trim() === "") {
        if (!checkTextLengthRange(nickNameInput.value, 2, 15)) {
            valid = false;
            nickNameInput.classList.add("error-input");
            errorNickName.innerText = "The field should contain 2 to 15 characters.";
        }
    }
    //phone number validation
    if(!checkRequired(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "The field is required.";
    } else if (!checkPhoneNumber(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "The field should contain a valid phone number.";
    }

    if(!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;

}
