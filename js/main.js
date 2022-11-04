const selectMenu = document.querySelectorAll("select")
const currentTime = document.querySelector("h1")
const alarmBtn = document.querySelector("button")
const contenEl = document.querySelector(".content")
let alarmTime;
let ringtone = new Audio("./files/ringtone.mp3")
let setAlarmTime = false
for (let i = 12; i > 0; i--) {
    let num = i < 10 ? "0" + i : i
    let option = `<option value="${num}">${num}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i >= 0; i--) {
    let num = i < 10 ? "0" + i : i
    let option = `<option value="${num}">${num}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let timeZone = i === 1 ? "AM" : "PM"
    let option = `<option value="${timeZone}">${timeZone}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {

    
    let time = new Date()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()
    let timezone = "AM"
    if (h >= 12) {
        h = h - 12
        timezone = "PM"
    }

    h = h === 0 ? h = 12 : h
    
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
    currentTime.innerHTML = `${h} : ${m} : ${s} ${timezone}`;
    
    
    if(alarmTime == `${h} : ${m} ${timezone}`) {
        ringtone.play()
        ringtone.loop = true
    }
}, 1000)

function setAlarm() {

    if(setAlarmTime) {
        alarmTime = ""
        ringtone.pause()
        alarmBtn.innerHTML = "Set Alarm"
        contenEl.classList.remove("disable")
        return setAlarmTime = false
    }
    
    let time = `${selectMenu[0].value} : ${selectMenu[1].value} ${selectMenu[2].value}`

    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Enter the corect time")
    }

    setAlarmTime = true
    contenEl.classList.add("disable")
    alarmBtn.innerHTML = "Clear Alarm"
    alarmTime = time
}


alarmBtn.addEventListener("click", setAlarm)
