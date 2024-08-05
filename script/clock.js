setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let day = time.getDate();
    let year = time.getFullYear();
    let month = time.getUTCMonth() + 1;

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    month = month < 10 ? "0" + month : month;

    let currentTime = hour + ":" + min;

    try {
        document.getElementById("clock").innerHTML = currentTime;
    } catch (e){}

    try {
        document.getElementById("date").innerHTML = day + "." + month + "." + year;
    } catch (e) {}
}

showTime();