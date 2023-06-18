function validateForm () {
    const meetingDateInput = document.getElementById('date');
    const meetingPlaceInput = document.getElementById('location');
    const customerInput = document.getElementById('cId');
    const gunSellerInput = document.getElementById('gunId');

    const errorMeetingDate = document.getElementById('errormeetingDate');
    const errorMeetingPlace = document.getElementById('errormeetingPlace');
    const errorCustomer = document.getElementById('errorCustomer');
    const errorGunSeller = document.getElementById('errorGunSeller');
    const errorsSummary = document.getElementById('errorsSumary');


    resetErrors([meetingDateInput, meetingPlaceInput, customerInput, gunSellerInput],[errorMeetingDate, errorMeetingPlace, errorCustomer, errorGunSeller], errorsSummary);

    let valid = true;

    //meeting date validation
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2) 
        day = "0" + day;
    const nowString = [year,month,day].join('-');

    if (!checkRequired(meetingDateInput.value)) {
        valid = false;
        meetingDateInput.classList.add("error-input");
        errorMeetingDate.innerText = "The field is required.";
    } else if (!checkDate(meetingDateInput.value)) {
        valid = false;
        meetingDateInput.classList.add("error-input");
        errorMeetingDate.innerText = "The field should contain the date in the yyyy-MM-dd format.";
    } else if (!checkDateIfInBounds(meetingDateInput.value, nowString)) {
        valid = false;
        meetingDateInput.classList.add("error-input");
        errorMeetingDate.innerText = "The date should not be earlier than today, and not later than 2024-01-01."
    }


    //meeting place validation
    if (!checkRequired(meetingPlaceInput.value)) {
        valid = false;
        meetingPlaceInput.classList.add("error-input");
        errorMeetingPlace.innerText = "The field is required.";
    } else if (!checkTextLengthRange(meetingPlaceInput.value, 10, 60)) {
        valid = false;
        meetingPlaceInput.classList.add("error-input");
        errorMeetingPlace.innerText = "The field should contain 10 to 60 characters."
    }

    //customer validation
    if (!checkRequired(customerInput.value)) {
        valid = false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText = "The field is required.";
    }
    //gun seller validation
    if (!checkRequired(gunSellerInput.value)) {
        valid = false;
        gunSellerInput.classList.add("error-input");
        errorGunSeller.innerText = "The field is required.";
    }

    if(!valid) {
        errorsSummary.innerText = "Form contains errors.";
    }

    return valid;


}