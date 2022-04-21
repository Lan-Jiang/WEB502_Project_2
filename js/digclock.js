//Create a time data function
function currentTime() {
    //Declare variables
    var d = new Date(); //Get current date
    var hr = d.getHours(); //Get current hours
    var min = d.getMinutes(); //Get current minutes
    var sec = d.getSeconds(); //Get current seconds
    var ampm; //Declare empty variable to store AM or PM

    //Add 0 to single digits for seconds
    if (sec < 10) {
        sec = "0" + sec;
    }
    //Add 0 to single digits for minutes
    if (min < 10) {
        min = "0" + min;
    }

    //Determine AM or PM string
    if (hr == 12) {
        ampm = "PM"; //Set to PM
    } else if (hr > 12) {
        hr -= 12; //Deduct 12 from hours gerater than 12
        ampm = "PM"; //Set to PM
    } else {
        ampm = "AM";
    }

    //Add time zone
    var utchr = d.getUTCHours(); //Get current UTC 
    var timeDiff = utchr - hr; //To store time difference between GMT and local hour
    var adjTimeDiff; //To store time difference converted to positive number
    var timeZone; //To store the 4 time zomes (PT, MT, CT, ET)

    if (timeDiff < 0) {
        adjTimeDiff = utchr + 24 - (hr + 12)
    } 

    //Determine time zone
    if (adjTimeDiff == 8) {
            timeZone = 'PT';
            } else if (adjTimeDiff == 7) {
            timeZone = 'MT';
            } else if (adjTimeDiff == 6) {
            timeZone = 'CT';
            } else if (adjTimeDiff == 5) {
            timeZone = 'ET';
            } else {
            timeZone = 'Unknown';
            }

    //Assemble time format to display
    var time = hr + ":" + min + ":" + sec + " " + ampm + " " + timeZone;

    //Display current local time and time zone on HTML elements
    document.getElementById("clock").innerText = time; //Adding time

    //Run time data function every 1 second
    setInterval(currentTime, 1000); //Setting timer  

}
//Initial run of time data function
currentTime();