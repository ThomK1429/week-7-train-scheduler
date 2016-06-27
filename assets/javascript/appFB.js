 // - - - - - - - - - -  THE JAVASCRIPT and JQUERY   - - - - - - - - - -  //

    $(document).ready(function() {
        //console.log( "ready!" );

        // Define the variables
        
        var trainName   = "";
        var dest        = "";
        var trainTime   = "";
        var freq        = "";

        var nextArrival = "";
        var minutesAway = "";
        var theTime = moment(currentTime).format("hh:mm");


        var tFrequency = "";
        var firstTime = ""; 
        var firstTimeConverted = "";
        var currentTime = "";
        var diffTime = "";
        var tRemainder = "";
        var tMinutesTillTrain = "";
        var nextTrain = "";

        
    // - - - - - - - - - -  THE JAVASCRIPT and JQUERY   - - - - - - - - - -  //

    // Link to Firebase
    var trainData = new Firebase("https://thetraintk20160620.firebaseio.com/");
        


    $('#submitBtn').on("click", function(){

      trainName = $('#inpTrainName').val().trim(); 
      if (trainName == ""){  // if no train name, get out. 
            return false;
      }

      storeTheData();
      clearTheInput();
      return false;
    });



    // Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    trainData.on("child_added", function(childSnapshot, prevChildKey){
      //console.log("child added process - start");
      //console.log(childSnapshot.val());

      // Store everything into a variable.
      trainName = childSnapshot.val().name;
      dest = childSnapshot.val().dest;
      trainTime = childSnapshot.val().trainTime;
      freq = childSnapshot.val().freq;

      // Train Info
      //console.log(trainName);
      //console.log(dest);
      //console.log(trainTime);
      //console.log(freq);

      formatTheData();

      $("#tblHdr > tbody").append("<tr><td>" + trainName + "</td><td>"  
         + dest + "</td><td>" + trainTime + "</td><td>" + freq + "</td><td>" 
         + nextArrival + "</td><td>" + minutesAway + "</td> </tr>");

      //console.log("child added process - end");
      return false;
    }, function(errorObject){
       console.log("Errors handled: " + errorObject.code)
    });  




    // Clears all of the text-boxes
    function clearTheInput(){
      $("#inpTrainName").val("");
      $("#inpDest").val("");
      $("#inpFreq").val("");
      $("#inpTrainTime").val("");
    }
         

    function storeTheData() {
      //alert('store the data');

      // Get the input fields from the form
      trainName = $('#inpTrainName').val().trim(); 
      //console.log("trainName=" + trainName);  
      trainTime = $('#inpTrainTime').val().trim();
      dest = $('#inpDest').val().trim();
      freq = $('#inpFreq').val().trim(); 

      // Creates local "temporary" object for holding train data
      var newTrain = {
        name:  trainName,
        dest: dest,
        trainTime: trainTime,
        freq: freq
      }

      // Push the data to Firebase
      trainData.push(newTrain);
    
    }  // end storeTheData function




    function formatTheData() {
            // Taken from week 7.x trainExample.html for moment processing. 
            // Assumptions
          tFrequency = freq;
                    console.log("tFrequency: " + tFrequency);
          console.log("freq: " + freq);
            // var tFrequency = 60;
            //var firstTime = "03:30"; // Time is 3:30 AM
          firstTime = trainTime; 

            // First Time (pushed back 1 year to make sure it comes before current time)
          firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
            //console.log("firstTimeConverted: " + firstTimeConverted);

            // Current Time
          currentTime = moment();
            //console.log("CURRENT TIME: " + currentTime);
            //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            //console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
          tRemainder = diffTime % tFrequency;
            //console.log(tRemainder);

            // Minute Until Train
          tMinutesTillTrain = tFrequency - tRemainder;
            //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
            if (tMinutesTillTrain == tFrequency) {
               tMinutesTillTrain = "Arrived - in Station";
            }

            // Next Train
          nextTrain = moment().add(tMinutesTillTrain, "minutes")
            //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

            nextArrival = moment(nextTrain).format("hh:mm");
            minutesAway = tMinutesTillTrain;
        }


//-------------------------------------------------------------------------

 
   
    }); // end document.ready function
