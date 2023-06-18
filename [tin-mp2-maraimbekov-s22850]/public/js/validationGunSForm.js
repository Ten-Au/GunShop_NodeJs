function validateForm() {
    const nickNameInput = document.getElementById('gunNick');
    const experienceInput = document.getElementById('experience');
    const salaryInput = document.getElementById('salary');

    const errorNickName = document.getElementById('errornickName');
    const errorExperience = document.getElementById('errorExperience');
    const errorSalary = document.getElementById('errorSalary');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([nickNameInput, experienceInput, salaryInput],
     [errorNickName, errorExperience, errorSalary], errorsSummary)

    let valid = true;

    //nick name validation
    if(!checkRequired(nickNameInput.value)) {
        valid = false;
        nickNameInput.classList.add("error-input");
        errorNickName.innerText = "The field is required.";
    } else if (!checkTextLengthRange(nickNameInput.value, 2, 15)) {
        valid = false;
        nickNameInput.classList.add("error-input");
        errorNickName.innerText = "The field should contain 2 to 15 characters";
    }
    if(!checkRequired(experienceInput.value)) {
        valid = false;
        experienceInput.classList.add("error-input");
        errorExperience.innerText = "The field is required."
    }


    //salary validation
    if (!checkRequired(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "The field is required.";
    } else if (!checkNumber(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "The field should contain a number.";
    } else if (!checkNumberRange(salaryInput.value, 5000, 50000)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "The field should contain a number between 5000 to 50000";
    }

    
    if(!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;

}