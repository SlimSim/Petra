var G = {};
G.WORKOUTS_ADDED = "workoutsAdded";

G.BRUTAL_DOUBLE_WORKOUT = "Brutal Double Workout";
G.CORE_WORKOUT = {"get": "Core Workout"};
G.LEG_WORKOUT = {"get": "Leg Workout"};
G.LONG_STRETCH_ROUTINE = "Long Stretch Routine";

G.DOUBLE_TYPE = "w";
G.SIGNLE_TYPE = "v";
G.QUICK_STRETCH_TYPE = "s";
G.SERIOUS_STRETCH_TYPE = "a";

G.TENSE = "Tense";
G.REST = "Rest";
G.PAUSE = "Pause";
G.STRETCH = "Stretch";
G.SWITCH = "Switch";

G.B_PLAY_MUSIC = "bPlayMusic";
G.I_VOLUME = "iVolume";
G.WORKOUT_TYPE = "workoutType";


var DB = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}

DB.indexedDB = {};

DB.checkIfMoreExcersisesNeadsToBeAdded = function(){
  
  chrome.storage.local.get( G.WORKOUTS_ADDED, function( resp ){
    function localAddWorkout( type, name, excersises) {
      reloadItems = true;

      addedWorkouts.push ( name );
      var str = type + ":Name_Ex_Splitter:"
              + name + ":Name_Ex_Splitter:"
              + excersises;
      DB.indexedDB.addTodo(str, true);
    }
    var i,
        reloadItems = false,
        addedWorkouts = resp[G.WORKOUTS_ADDED];

    if( addedWorkouts === undefined ) {
      chrome.storage.local.set( { 'workoutsAdded' : [] } );
      addedWorkouts = [];
    }
    if( addedWorkouts.indexOf( G.LONG_STRETCH_ROUTINE ) == -1 ) {
      localAddWorkout(
        G.SERIOUS_STRETCH_TYPE,
        G.LONG_STRETCH_ROUTINE,
        "Right quadriceps, Left quadriceps, " +
        "Right calf, Left calf, " +
        "Right but, Left but, " +
        "Right sholder, Left sholder, " +
        "Right chest, Left chest, " +
        "Back, " +
        "Adductors"
      );
    } else if( addedWorkouts.indexOf( G.BRUTAL_DOUBLE_WORKOUT ) == -1 ) {
      localAddWorkout(
        G.DOUBLE_TYPE, 
        G.BRUTAL_DOUBLE_WORKOUT, 
        "Jump squats, " +
        "Push ups, " +
        "Lunges, " +
        "Triceps dip on chair, " +
        "Crunches to right, " +
        "Crunches to left, " +
        "Back extensions to right, " +
        "Back extensions to left, " +
        "Leg raises, " +
        "Back extensions"
      );
    } else if( addedWorkouts.indexOf( G.CORE_WORKOUT.get ) == -1 ) {
      localAddWorkout(
        G.DOUBLE_TYPE,
        G.CORE_WORKOUT.get,
        "Crunches, Bicycle, " +
        "Back extensions, Superman, " +
        "Right side plank, Left side plank, " +
        "Back extensions to right, Back extensions to left, " +
        "The plank, The boat"
      );
    } else if( addedWorkouts.indexOf( G.LEG_WORKOUT.get ) == -1 ) {
      localAddWorkout(
        G.DOUBLE_TYPE,
        G.LEG_WORKOUT.get,
        "Right leg squat, Left leg squat, " +
        "Toe raises on right foot, Toe raises on left foot, " +
        "Lunges, jump squats"
      );
    }

    chrome.storage.local.set( {'workoutsAdded' : addedWorkouts } );
    
    if( reloadItems ) {
      setTimeout(function(){
        DB.indexedDB.getAllTodoItems();
      }, 1000);
    }

  });
};


DB.indexedDB.db = null;

DB.indexedDB.onerror = function(e) {
  console.error(e);
};

DB.indexedDB.open = function() {
    
    


    var version = 1;
    var request = indexedDB.open("workoutsC", version);
    

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function(e) {
    

    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = DB.indexedDB.onerror;

    if(db.objectStoreNames.contains("workout")) {
      db.deleteObjectStore("workout");
    }

    var t0 = new Date().getTime();
    var t1 = t0 - 1;
    var t2 = t0 - 2;
    var t3 = t0 - 3;
    var t4 = t0 - 4;


    var store = db.createObjectStore("workout",{keyPath: "timeStamp"});

//http://list25.com/25-effective-exercises-you-can-do-anywhere/1/
//http://list25.com/25-effective-exercises-you-can-do-anywhere/2/
    var standardWorkout1 = "w:Name_Ex_Splitter:";
    standardWorkout1 += "Quick double workout:Name_Ex_Splitter:";
    standardWorkout1 += "The Plank";
    standardWorkout1 += ", Leg Raises";
    standardWorkout1 += ", Lunges";
    standardWorkout1 += ", Back Extensions";
    standardWorkout1 += ", Jumping Jacks";
    standardWorkout1 += ", Burpees";

    var standardWorkout2 = "w:Name_Ex_Splitter:";
    standardWorkout2 += "Basic double workout:Name_Ex_Splitter:";
    standardWorkout2 += "Crunches";
    standardWorkout2 += ", Back Extensions";
    standardWorkout2 += ", Wallsit";
    standardWorkout2 += ", Dive bombers";
    standardWorkout2 += ", Side crunches";
    standardWorkout2 += ", Bear Crawls";
    standardWorkout2 += ", Jump Squats";
    standardWorkout2 += ", push ups";

    var standardStretch1 = "s:Name_Ex_Splitter:";
    standardStretch1 += "Quick Stretch Routine:Name_Ex_Splitter:";
    standardStretch1 += "Right butt";
    standardStretch1 += ", left butt";
    standardStretch1 += ", right ancle";
    standardStretch1 += ", left ancle";
    standardStretch1 += ", right chest";
    standardStretch1 += ", left chest";
    standardStretch1 += ", Stomach";
    standardStretch1 += ", Back";

//http://www.builtlean.com/2011/05/25/basic-stretching-exercises-routine/
    var standardStretch2 = "s:Name_Ex_Splitter:";
    standardStretch2 += "Basic Stretch Routine:Name_Ex_Splitter:";
    standardStretch2 += "Right Hamstring";
    standardStretch2 += ", left Hamstring";
    standardStretch2 += ", Butterfly Groin";
    standardStretch2 += ", right Lying Hip";
    standardStretch2 += ", left Lying Hip";
    standardStretch2 += ", right Quad";
    standardStretch2 += ", left Quad";
    standardStretch2 += ", right Calf";
    standardStretch2 += ", left Calf";
    standardStretch2 += ", right Shoulder";
    standardStretch2 += ", left Shoulder";
    standardStretch2 += ", right Triceps";
    standardStretch2 += ", left Triceps";

//http://www.7-min.com/
    var standardSingle1 = "v:Name_Ex_Splitter:";
    standardSingle1 += "7 min workout:Name_Ex_Splitter:";
    standardSingle1 += "Jumping jacks";
    standardSingle1 += ", Wall sit";
    standardSingle1 += ", Push-up";
    standardSingle1 += ", Abdominal crunch";
    standardSingle1 += ", Step-up onto chair";
    standardSingle1 += ", Squats";
    standardSingle1 += ", Triceps Dip on Chair";
    standardSingle1 += ", Plank";
    standardSingle1 += ", High knees running";
    standardSingle1 += ", Lunges";
    standardSingle1 += ", Push-up and rotation";
    standardSingle1 += ", Side plank";


    store.put({
        "text": standardWorkout1,
        "timeStamp": t4
    });
    store.put({
        "text": standardStretch1,
        "timeStamp": t3
    });
    store.put({
        "text": standardWorkout2,
        "timeStamp": t2
    });
    store.put({
        "text": standardStretch2,
        "timeStamp": t1
    });
    store.put({
        "text": standardSingle1,
        "timeStamp": t0
    });

  };


  request.onsuccess = function(e) {
    DB.indexedDB.db = e.target.result;
    DB.indexedDB.getAllTodoItems();
    DB.checkIfMoreExcersisesNeadsToBeAdded();
  };

  request.onerror = DB.indexedDB.onerror;
};

DB.indexedDB.addTodo = function(todoText, bSkippReloadTodoItems) {
  var db = DB.indexedDB.db;
  var trans = db.transaction(["workout"], "readwrite");
  var store = trans.objectStore("workout");

  var data = {
    "text": todoText,
    "timeStamp": new Date().getTime()
  };

  var request = store.put(data);

  if( !bSkippReloadTodoItems ) { 
    request.onsuccess = function(e) {
      DB.indexedDB.getAllTodoItems();
    };
  }

  request.onerror = function(e) {
    console.error("Error Adding: ", e);
  };
};

DB.indexedDB.deleteTodo = function(id) {
  var db = DB.indexedDB.db;
  var trans = db.transaction(["workout"], "readwrite");
  var store = trans.objectStore("workout");

  var request = store.delete(id);

  request.onsuccess = function(e) {
    DB.indexedDB.getAllTodoItems();
  };

  request.onerror = function(e) {
    console.error("Error Adding: ", e);
  };
};

DB.indexedDB.getAllTodoItems = function() {
  
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var db = DB.indexedDB.db;
  var trans = db.transaction(["workout"], "readwrite");
  var store = trans.objectStore("workout");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false){
        return;
    }

    renderTodo(result.value);
    result.continue();
  };

  cursorRequest.onerror = DB.indexedDB.onerror;
};










function renderTodo(row) {

    var aText = row.text.split(":Name_Ex_Splitter:");

    if(aText.length !== 2 && aText.length !== 3){
        console.error("Reading from database error, "+
        "try renaming your exercises");
        return -1;
    }

    var type = '';
    /*
      G.DOUBLE_TYPE = "w";
      G.SIGNLE_TYPE = "v";
      G.QUICK_STRETCH_TYPE = "s";
      G.SERIOUS_STRETCH_TYPE = "a";
     * w d = double workout,
     * v s = single workoutstreching
     * s t = tänjning / streaching
     */
    var name = '';
    var exList = '';
    if(aText.length === 3){
        type = aText[0];
        name = aText[1];
        exList = aText[2];
    } else {
        type = G.DOUBLE_TYPE; // double workout
        name = aText[0];
        exList = aText[1];
    }

    function createExArT(arr){
        // return array of ExcerciseClass-objects!
        var ret = [], 
            stretchTime = 16,
            tenseTime = 8;
        for(var i=0; i<arr.length; i+=1){
            ret.push( new ExcerciseClass(arr[i], stretchTime) );
            ret.push( new ExcerciseClass(G.TENSE, tenseTime) );
            ret.push( new ExcerciseClass(G.STRETCH, stretchTime) );
            ret.push( new ExcerciseClass(G.TENSE, tenseTime) );
            ret.push( new ExcerciseClass(G.STRETCH, stretchTime) );
            ret.push( new ExcerciseClass(G.SWITCH, 4) );
        }
        ret.pop();
        return ret;
    }
    function createExArD(arr){
        // return array of ExcerciseClass-objects!
        var ret = [];
        for(var i=0; i<arr.length; i+=2){
            ret.push( new ExcerciseClass(arr[i], 45) );
            if( i+1<arr.length )
                ret.push( new ExcerciseClass(arr[i+1], 45) );
            ret.push( new ExcerciseClass(arr[i], 30) );
            if( i+1<arr.length )
                ret.push( new ExcerciseClass(arr[i+1], 30) );
            ret.push( new ExcerciseClass(G.REST, 15) );
        }
        ret.pop();
        return ret;
    }
    function createExArS(arr, length, pause){
        // return array of ExcerciseClass-objects!
        var ret = [];
        for(var i=0; i<arr.length; i+=1){
            ret.push( new ExcerciseClass(arr[i], length) );
            if(pause) ret.push( new ExcerciseClass(G.REST, pause) );
        }
        if(pause) ret.pop();
        return ret;
    }


    var aEx = exList.split(/[.,]+/);

    var totalTime;

    if(type === G.DOUBLE_TYPE ) {
        if(aEx.length % 2) // odd
            totalTime = (75*2 + 15) * (aEx.length-1)/2 + 75;
        else // even
            totalTime = (75*2 + 15) * aEx.length/2 - 15;
    } else if (type === G.SIGNLE_TYPE ) {
        totalTime = 40 * aEx.length - 10;
    } else if (type === G.QUICK_STRETCH_TYPE ) {
        totalTime = 24 * aEx.length;
    } else if (type === G.SERIOUS_STRETCH_TYPE ) {
        totalTime = 68 * aEx.length - 4; //16*3(workout) + 2*8(pause) + 4(för byte)
    }
    var time = PT.secToDisp(totalTime);
    var deleteClicked = false;


    var exerciceLi = $('<div>',{class:"excerciceList"});
    var exText = "";

    var textType = "";

    if(type === G.DOUBLE_TYPE ) textType = "Double";
    if(type === G.SIGNLE_TYPE ) textType = "Single";
    if(type === G.QUICK_STRETCH_TYPE ) textType = "Quick Stretch";
    if(type === G.SERIOUS_STRETCH_TYPE ) textType = "Serious Stretch";

    var typeClass = type + "Class";

    for( var i=0; i<aEx.length; i+=2 ) {
        exText = aEx[i];
        if(i+1 < aEx.length) {
            exText += ", " + aEx[i+1];
        }
        exerciceLi.append(
            $("<p>", {
                class: textType,
                text: exText
            })
        );
    }

    $('#todoItems').append(
        $("<li>", {class: typeClass})
        .click(function(){
            PT.clearCounter();
            if(deleteClicked){
                deleteClicked = false;
                return;
            }
            if(type === G.DOUBLE_TYPE ) startRun(type, name,totalTime,createExArD(aEx));
            if(type === G.SIGNLE_TYPE ) startRun(type, name,totalTime,createExArS(aEx, 30, 10));
            if(type === G.QUICK_STRETCH_TYPE ) startRun(type, name,totalTime,createExArS(aEx, 24, 0));
            if(type === G.SERIOUS_STRETCH_TYPE ) startRun(type, name,totalTime,createExArT(aEx, 24, 0));
        })
        .append(
            $("<div>",{
                class: "workoutDiv"
            })
            .append(
                $("<h2>", {
                    class: 'workoutName',
                    text: name
                })
            )
            .append(
                $("<span>")
                    .append(
                        $("<p>", {
                            style: "margin-right: 10px;",
                            text: textType
                        })
                    )
                    .append(
                        $("<p>", {
                            class: 'workoutTime',
                            text: time
                        })
                    )
            )
            .append(
                $("<input>", {
                    'type':'button',
                    'value':'Delete',
                    class: 'btnSmallWidth'
                })
                .click(function(){
                  deleteClicked = true;
                  PT.removeEx(row.timeStamp);
                })
            )
        )
        .append(
            exerciceLi
        )
    );
}

function addWorkout(type) {
  var excersises = $('#workout').val();
  var name = $('#workName').val();
  var str = type + ':Name_Ex_Splitter:'
          + name + ":Name_Ex_Splitter:"
          + excersises;
  DB.indexedDB.addTodo(str);
  $('#workout').val("");  // resetting the input field:
  $('#workName').val("");
}



var PT = {};

PT.bOn = false;
PT.startWorkoutTimer = false;
PT.bPlayMusic = true;



/* standAlone Functions */
PT.secToDisp = function(seconds){
       var sec = ( seconds | 0 ) % 60;
       if ( sec < 10 )
           sec = "0"+sec;
       var min = (seconds / 60) | 0;
       return min + ':' + sec;
};

PT.main = function(){

    
    $( '#showPicker' ).children().click( function( event ) {
      var $target = $( event.target ),
        o = {};
      if( $target === undefined ) return;
      
      $( '#showPicker' ).children().removeClass( 'selected' );
      $target.addClass( 'selected' );
      
      $('#todoItems').removeClass(
        "showAll showWorkout showStretch showWClass showVClass showSClass showAClass"
      ).addClass( $target.attr("workoutType") );
      o[ G.WORKOUT_TYPE ] = $target.attr("workoutType");
      chrome.storage.local.set( o );
    });
    
    $('#stopExcersise').click(function(){
        PT.stopExcersise();
    });
    $('#addDoubleWorkoutButt').click(function(){
        addWorkout( G.DOUBLE_TYPE );
    });
    $('#addSingleWorkoutButt').click(function(){
        addWorkout( G.SIGNLE_TYPE );
    });
    $('#addStretchButt').click(function(){
        addWorkout( G.QUICK_STRETCH_TYPE );
    });
    $('#addSeriousStretchButt').click(function(){
        addWorkout( G.SERIOUS_STRETCH_TYPE );
    });
    $('#contribute_0').click(PT.purchase);

    
    chrome.storage.local.get( G.WORKOUT_TYPE, function( resp ){
      if( resp[ G.WORKOUT_TYPE ] !== undefined ) {
        $(' [workouttype="' + resp[ G.WORKOUT_TYPE ] + '"] ' ).click();
      }
    });
    
    chrome.storage.local.get( G.B_PLAY_MUSIC, function( resp ){
      if( resp[ G.B_PLAY_MUSIC ] !== undefined ) {
        PT.bPlayMusic = resp[G.B_PLAY_MUSIC];
        if( !PT.bPlayMusic )
          $('#btnMusicOnOff').removeClass('btnOn');
      }
    });
    chrome.storage.local.get( G.I_VOLUME, function( resp ){
      if( resp[ G.I_VOLUME ] !== undefined ) {
        $('#volume').val(resp[ G.I_VOLUME ]);
        onVolumeUpdate( {target:$('#volume')[0]} );
      }
    });
    
};

PT.removeEx = function(rowTimeStamp){
  IO.confirm(
    "Are you sure?",
    "Do you want to remove this exercise? This action can not be undone",
    function(){
      DB.indexedDB.deleteTodo(rowTimeStamp);
    });

};


PT.stopExcersise = function(){
    PT.clearCounter();
    PT.bOn = false;
    PT.speak("Exercise stopped", true);
    $('#currentExercise').text("-");
    $('audio')[0].pause();
};

PT.clearCounter = function(){
    if(PT.startWorkoutTimer) clearTimeout(PT.startWorkoutTimer);
    if(PT.countDownInterval) clearInterval(PT.countDownInterval);
};

PT.speak = function(text, bOverideIsRunning){
    console.info(text);

    if(PT.bOn || bOverideIsRunning){
        var msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-US';
        if( bOverideIsRunning ) {
          speechSynthesis.cancel();
        }
        speechSynthesis.speak(msg);
    }
};

PT.countDown2 = function(aExcersice, index, callBackFunk){
    if(PT.countDownInterval) clearInterval(PT.countDownInterval);

    if(!PT.bOn){
        PT.clearCounter();
        return;
    }

    var seconds = aExcersice[index].seconds;

    var halfTime = ""+ Math.ceil(seconds / 2);

//    console.log("aExcersise[index+1]:", aExcersice[index+1]);

    var nextExcersise = "Freedom!";
    if(aExcersice[index+1]) nextExcersise = aExcersice[index+1].name;

    var bRest = aExcersice[index].name == G.REST;
    var bSwitch = aExcersice[index].name == G.SWITCH;
    var bTense = aExcersice[index].name == G.TENSE;
    var bNextIsTense = nextExcersise == G.TENSE || nextExcersise == G.SWITCH;

    $('#counter').text(seconds);
    PT.countDownInterval = setInterval(function(){
        $('#counter').text( $('#counter').text()-1 );

        var totSecLeft = $('#workoutCounter').attr('totalTime') - 1;
        $('#workoutCounter').attr('totalTime', totSecLeft);
        $('#workoutCounter').text(PT.secToDisp(totSecLeft));

        switch ($('#counter').text()){
            case halfTime:
                if(!bRest && seconds > 20 )
                    PT.speak('halftime');
                break;
            case "30":
                PT.speak('30 seconds left');
                break;
            case "10":
                if( halfTime > 14 ) PT.speak('10');
                break;
            case "5":
                if(!bRest && !bTense && !bNextIsTense )
                    PT.speak('next up ' + nextExcersise );
                break;
            case "0":
                if(bRest || bSwitch )
                    PT.speak("OK");
                else if(bTense || bNextIsTense)
                    PT.speak('and');
                else
                    PT.speak('Great work!');
                
                clearInterval(PT.countDownInterval);
                callBackFunk(aExcersice, index+1);
                break;
        }
    }, 100);
};


var startRun = function(type, name, totalTime, aExcercise){
    if(type === G.DOUBLE_TYPE || type === G.SIGNLE_TYPE ){ //workout:
      $('audio').attr('src', "assets/music/workoutMusic1.mp3");
    } else { // stretching:
      $('audio').attr('src', "assets/music/stretchMusic1.mp3");
    }
    onVolumeUpdate( {target:$('#volume')[0]} );
    
    $('audio').on('loadeddata', function( event ){
      var musicTime = $('audio')[0].duration;
      if( totalTime < musicTime ) {
        event.target.currentTime = Math.random() * (musicTime - totalTime);
      }
    });

    if( PT.bPlayMusic ) {
      $('audio')[0].play();
    }

    PT.bOn = true;
    $('#currentWorkout').text(name);
    $('#workoutCounter')
        .text(PT.secToDisp(totalTime))
        .attr('totalTime', totalTime);
    PT.speak("Lets do the "+name+", we start with " + aExcercise[0].name);
    PT.startWorkoutTimer = setTimeout(function(){

//    denna "setTimeout" borde jag ha en PT-global variabel som jag kan ta bort
//    i clearCounter eller liknande,
//    ska kollas o tömmas när jag startar en ny övning iaf...

        run(aExcercise, 0); // site site
    }, 5000);
};

var run = function(aExcercise, index){
    if(index == aExcercise.length) {
        PT.speak("Now we are free!");
        $('#currentExercise').text("Great work!");
        $('audio')[0].pause();
        return;
    }
    var firstFrase;
    var ex = aExcercise[index];

    if(ex.name == G.REST ){
        PT.speak("Lets rest for " + ex.seconds + " seconds.");

        if(aExcercise[index+1]){
          firstFrase = "Then we'll do some ";
          if(aExcercise[index].name.substring(0, 3).toUpperCase() == "THE")
              firstFrase = "Then we'll do ";
          PT.speak(firstFrase + aExcercise[index+1].name);


          $('#currentExercise').text("Rest, then " + aExcercise[index+1].name);

        }
    } else if(ex.name == G.SWITCH) {
        if(aExcercise[index+1]){
          PT.speak( "Now lets switch to " + aExcercise[index+1].name );
          $('#currentExercise').text(aExcercise[index+1].name);
        }
    } else if(ex.name == G.STRETCH) {
        if(aExcercise[index+1]){
          PT.speak( G.STRETCH );
//          $('#currentExercise').text(aExcercise[index+1].name);
        }
    } else if( ex.name == G.TENSE ) {
        if(aExcercise[index+1]){
          PT.speak( G.TENSE );
//          $('#currentExercise').text(aExcercise[index+1].name);
        }
    } else {
        firstFrase = "Lets do some ";
        if(aExcercise[index].name.substring(0, 3).toUpperCase() == "THE")
            firstFrase = "Lets do ";
        PT.speak(firstFrase + ex.name);

        $('#currentExercise').text(ex.name);
    }
    PT.countDown2(aExcercise, index, run );
};

var ExcerciseClass = function(name, seconds){
    this.name = name || "no Name Exercise";
    this.seconds = Math.round(seconds) || 45;
};

var IO = {};

IO.enterFunction = false;

IO.confirm = function(textHead, textBox, func, funcCancel){
  IO.enterFunction = function(){
    if(func) func();
    IO.enterFunction = false;
    outerDiv.remove();
  };


  var outerDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  var inputRow = document.createElement('div');
  var p = document.createElement('div');
  var h2 = document.createElement('h2');
  var inputOK = document.createElement('input');
  var inputCancel = document.createElement('input');

  p.textContent = textBox;
  h2.textContent = textHead;


  inputOK.type = "button";
  inputOK.value = "OK";
  inputOK.addEventListener('click', IO.enterFunction);

  inputRow.style.display = "flex";

  inputCancel.type = "button";
  inputCancel.value = "Cancel";
  inputCancel.addEventListener('click', function(){
    if(funcCancel) funcCancel();
    IO.enterFunction = false;
    outerDiv.remove();
  });

  outerDiv.style.position = "fixed";
  outerDiv.style.top = "0px";
  outerDiv.style.left = "0px";
  outerDiv.style.width = "100vw";
  outerDiv.style.height = "100vh";
  outerDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  outerDiv.style.display = "flex";
  outerDiv.style.alignItems = "center";
  outerDiv.style.justifyContent = "center";

  innerDiv.style.width = "200px";
  innerDiv.style.padding = "10 15px";
  innerDiv.style.backgroundColor = "gold";

  inputRow.appendChild(inputOK);
  inputRow.appendChild(inputCancel);

  innerDiv.appendChild(h2);
  innerDiv.appendChild(p);
  innerDiv.appendChild(inputRow);
  outerDiv.appendChild(innerDiv);

  p.style.margin = "6px 0";

  document.body.appendChild(outerDiv);
  return;
};//end confirm


IO.keyboardKeydown  = function(event) {
    if(IO.enterFunction){
        if(event.keyCode == 13){
            IO.enterFunction();
        }
        return;
    }

    if(event.keyCode == 229) // wierd thing but ok...
        return;

    //if 0 to 9 or bakspace in a input-field, return,
    //---- site add "or minus, delete, numpad mm"
    if($(':input[type="number"]' ).is(":focus") &&
        (event.keyCode>=48 && event.keyCode<=57 || event.keyCode==8 )){
        return;
    }


    if(event.keyCode>=48 && event.keyCode<=57) {
        // pressed a number
        var number = event.keyCode - 48;
//            Troff.setLoopTo(number);
    }


    switch(event.keyCode){
    case 32: //space bar
//              Troff.space();
        break;
    case 13: // return
//            Troff.enterKnappen();
        break;
    case 27: // esc
//            Troff.pauseSong();
        break;
    default:
        //console.log("key " + event.keyCode);
        //nothing
    }// end switch

}; // end IO.keyboardKeydown *****************/

var onVolumeUpdate = function( event ){
    var volume = event.target.value,
      o = {};
    $('#volumeDisplay').text(volume);
    $('audio')[0].volume = volume/parseInt(event.target.max);
    
    o[ G.I_VOLUME ] = volume;
    
    chrome.storage.local.set( o );
};

var toggleMusicOnOff = function( event ) {
  var o = {};
  if( PT.bPlayMusic ) {
    
    PT.bPlayMusic = false;
    event.target.classList.remove('btnOn');
    $('audio')[0].pause();
  } else {
    PT.bPlayMusic = true;
    event.target.classList.add('btnOn');
    if( PT.bOn ) {
      $('audio')[0].play();
    }
  }
  o[ G.B_PLAY_MUSIC ] = PT.bPlayMusic;
  chrome.storage.local.set( o );
};

$( document ).ready(function(){
    DB.indexedDB.open();
    PT.main();
    document.addEventListener('keydown', IO.keyboardKeydown);
    
    
    $('#volume')[0].addEventListener('input', onVolumeUpdate);
    $('#btnMusicOnOff').click(toggleMusicOnOff);
    
});

//window.addEventListener("DOMContentLoaded", init, false);




