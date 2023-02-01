// Ex 1 . Salutarea
document.getElementById("userNameSubmit")?.addEventListener("click", () => {
    const userNameInput = document.getElementById("userNameInput");
    const helloUserName = document.getElementById("helloUserName");
    helloUserName.innerText = `Salut ${userNameInput.value}`;
    helloUserName.style.display = "block";
})

// Ex 2. Clock
setInterval(()=>{
    const time = document.querySelector(".display #time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if(hours > 12){
      day_night = "PM";
      hours = hours - 12;
    }
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    if(minutes < 10){
      minutes = "0" + minutes;
    }
    if(hours < 10){
      hours = "0" + hours;
    }
    time.textContent = hours + ":" + minutes + ":" + seconds + " "+ day_night;
  });

//Ex 3. Find the age
const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function ageCalculate(){
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth,birthDate,birthYear;
    let birthDetails = {
        date:inputDate.getDate(),
        month:inputDate.getMonth()+1,
        year:inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth()+1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if(
        birthDetails.year > currentYear ||
        ( birthDetails.month > currentMonth && birthDetails.year == currentYear) || 
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ){
        alert("Not Born Yet");
        displayResult("-","-","-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if(currentMonth >= birthDetails.month){
        birthMonth = currentMonth - birthDetails.month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if(currentDate >= birthDetails.date){
        birthDate = currentDate - birthDetails.date;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate,birthMonth,birthYear);
}

function displayResult(bDate,bMonth,bYear){
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        months[1] = 29;
    }
    else{
        months[1] = 28;
    }
}



// => The form
document.getElementById("formSubmit")?.addEventListener("click", () => {
    const formMessage = document.getElementById("formMessage");
    const formName = document.getElementById("formName").value;
    const formLocation = document.getElementById("formLocation").value;
    const likePeanuts = getRadioValue(document.getElementsByName("likePeanuts"));
    const bestFlower = document.getElementById("bestFlower").value;
    const favMovies = document.getElementsByName("favMovies");

    if(formName.length && formLocation.length && likePeanuts && bestFlower.length && isAnItemChcked(favMovies)) {
        formMessage.innerHTML = "";
        formMessage.innerHTML += `Salut, <font color=\"red\">${formName}</font><br/>`;
        formMessage.innerHTML += `Ai ales locatia <font color=\"red\">${formLocation}</font><br/>`;
        formMessage.innerHTML += `Floarea aleasa de tine este <font color=\"red\">${bestFlower}</font><br/>`;
        formMessage.innerHTML += `Genurile de filme pe care le urmaresti sunt: <br/>`;

        let count = 0;
        for(let i = 0; i < favMovies.length; i++) {
            if(favMovies[i].checked) {
                count++;
                formMessage.innerHTML += `${count}. <font color=\"red\">${favMovies[i].value}</font><br/>`;
            }
        }

        if(likePeanuts === "Da") {
            'Here is your peanut'
            document.getElementById("formPeanutsMessage").style.display = "block";
        } else if(likePeanuts === "Nu") {
            document.getElementById("formPeanutsMessage").style.display = "none";
        }
    } else {
        formMessage.innerText = "Nu ai completat toate campurile!";
    }
    

   
});



function getRadioValue(radio) {
    for(let i = 0; i < radio.length; i++) {
        if(radio[i].checked) {
            return radio[i].value;
        }
    }
}

function isAnItemChcked(checkbox) {
    for(let i = 0; i < checkbox.length; i++) {
        if(checkbox[i].checked) {
            return true;
        }
    }
    return false;
}

