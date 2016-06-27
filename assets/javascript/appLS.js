$(document).ready(function() {
    //  console.log( "ready!" );


    // On Click, get the data from the form and store in local storage
    $('#submitBtn').on('click', function() {

        var trainName = $('#inpTrainName').val().trim();
        if (trainName == "") { // if no train name, get out. 
            return;
        }
        localStorage.trainName = trainName;
        //console.log("trainName=" + trainName);  

        var dest = $('#inpDest').val().trim();
        localStorage.dest = dest;

        var freq = $('#inpFreq').val().trim();
        localStorage.freq = freq;

        var trainTime = $('#inpTrainTime').val().trim();
        localStorage.trainTime = trainTime;

    }); // end submit btn on click function


    getDisplayData();  // Get and Display the local storage data on the screen



    // Get and Display the local storage data on the screen
    function getDisplayData(){
    if (localStorage.getItem("trainName") !== null) {

        var trainName = localStorage.getItem("trainName");
        var dest = localStorage.getItem("dest");
        var trainTime = localStorage.getItem("trainTime");
        var freq = localStorage.getItem("freq");

        var nextArrival = "a";
        var minutesAway = "4";
        var theTime = moment(currentTime).format("hh:mm");
        $("#theTime").append(theTime);


        // Format the Time data
        // Assumptions
        var tFrequency = freq;
        // var tFrequency = 60;
        //var firstTime = "03:30"; // Time is 3:30 AM
        var firstTime = trainTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1,
            "years");
        //console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted),
            "minutes");
        //console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        //console.log(tRemainder);

        // Minute Until Train
        tMinutesTillTrain = tFrequency - tRemainder;
        //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        if (tMinutesTillTrain == tFrequency) {
            tMinutesTillTrain = "Arrived - in Station";
        }

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes")
            //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

        nextArrival = moment(nextTrain).format("hh:mm");
        minutesAway = tMinutesTillTrain;





        //  $("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

        $("#tblHdr > tbody").append("<tr><td>" + trainName +
            "</td><td>" + dest +
            "</td><td>" + trainTime + "</td><td>" + freq +
            "</td><td>" +
            nextArrival + "</td><td>" + minutesAway + "</td> </tr>"
        );



        
    } else alert("test - no data");

   }

}); // end document.ready function