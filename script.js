var DB = {};
window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB;

if ('webkitIndexedDB' in window) {
  window.IDBTransaction = window.webkitIDBTransaction;
  window.IDBKeyRange = window.webkitIDBKeyRange;
}

DB.indexedDB = {};
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
    standardWorkout1 += "Quick double workout:Name_Ex_Splitter:"
    standardWorkout1 += "The Plank"
    standardWorkout1 += ", Leg Raises"
    standardWorkout1 += ", Lunges"
    standardWorkout1 += ", Back Extensions"
    standardWorkout1 += ", Jumping Jacks"
    standardWorkout1 += ", Burpees"

    var standardWorkout2 = "w:Name_Ex_Splitter:";
    standardWorkout2 += "Basic double workout:Name_Ex_Splitter:"
    standardWorkout2 += "Crunches"
    standardWorkout2 += ", Back Extensions"
    standardWorkout2 += ", Wallsit"
    standardWorkout2 += ", Dive bombers"
    standardWorkout2 += ", Side crunches"
    standardWorkout2 += ", Bear Crawls"
    standardWorkout2 += ", Jump Squats"
    standardWorkout2 += ", push ups"

    var standardStreatch1 = "s:Name_Ex_Splitter:";
    standardStreatch1 += "Quick Stretch Routine:Name_Ex_Splitter:"
    standardStreatch1 += "Right butt"
    standardStreatch1 += ", Left butt"
    standardStreatch1 += ", Right ancle"
    standardStreatch1 += ", Left ancle"
    standardStreatch1 += ", Right chest"
    standardStreatch1 += ", Left chest"
    standardStreatch1 += ", Stomach"
    standardStreatch1 += ", Back"

//http://www.builtlean.com/2011/05/25/basic-stretching-exercises-routine/
    var standardStreatch2 = "s:Name_Ex_Splitter:";
    standardStreatch2 += "Basic Stretch Routine:Name_Ex_Splitter:";
    standardStreatch2 += "Right Hamstring";
    standardStreatch2 += ", left Hamstring";
    standardStreatch2 += ", Butterfly Groin";
    standardStreatch2 += ", Right Lying Hip";
    standardStreatch2 += ", left Lying Hip";
    standardStreatch2 += ", right Quad";
    standardStreatch2 += ", left Quad";
    standardStreatch2 += ", right Calf";
    standardStreatch2 += ", left Calf";
    standardStreatch2 += ", right Shoulder";
    standardStreatch2 += ", left Shoulder";
    standardStreatch2 += ", right Triceps";
    standardStreatch2 += ", left Triceps";

//http://www.7-min.com/
    var standardSingle1 = "v:Name_Ex_Splitter:";
    standardSingle1 += "7 min workout:Name_Ex_Splitter:";
    standardSingle1 += "Jumping jacks"
    standardSingle1 += ", Wall sit"
    standardSingle1 += ", Push-up"
    standardSingle1 += ", Abdominal crunch"
    standardSingle1 += ", Step-up onto chair"
    standardSingle1 += ", Squats"
    standardSingle1 += ", Triceps Dip on Chair"
    standardSingle1 += ", plank"
    standardSingle1 += ", High knees running"
    standardSingle1 += ", Lunges"
    standardSingle1 += ", Push-up and rotation"
    standardSingle1 += ", Side plank"


    store.put({
        "text": standardWorkout1,
        "timeStamp": t4
    });
    store.put({
        "text": standardStreatch1,
        "timeStamp": t3
    });
    store.put({
        "text": standardWorkout2,
        "timeStamp": t2
    });
    store.put({
        "text": standardStreatch2,
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
  };

  request.onerror = DB.indexedDB.onerror;
};

DB.indexedDB.addTodo = function(todoText) {
  var db = DB.indexedDB.db;
  var trans = db.transaction(["workout"], "readwrite");
  var store = trans.objectStore("workout");

  var data = {
    "text": todoText,
    "timeStamp": new Date().getTime()
  };

  var request = store.put(data);

  request.onsuccess = function(e) {
    DB.indexedDB.getAllTodoItems();
  };

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
     * w d = double workout,
     * v s = single workoutstreching
     * s t = tänjning / streaching
     */
    var name = '';
    var exList ='';
    if(aText.length === 3){
        type = aText[0];
        name = aText[1];
        exList = aText[2];
    } else {
        type = 'w'; // double workout
        name = aText[0];
        exList = aText[1];

    }

    function createExArD(arr){
        // return array of ExcerciseClass-objects!
        var ret = [];
        for(var i=0; i<arr.length; i+=2){
            ret.push( new ExcerciseClass(arr[i], 45) );
            if(i+1<arr.length)
                ret.push(new ExcerciseClass(arr[i+1], 45) );
            ret.push( new ExcerciseClass(arr[i], 30) );
            if(i+1<arr.length)
                ret.push(new ExcerciseClass(arr[i+1], 30) );
            ret.push(new ExcerciseClass("Rest", 15) );
        }
        ret.pop();
        return ret;
    }
    function createExArS(arr, length, pause){
        // return array of ExcerciseClass-objects!
        var ret = [];
        for(var i=0; i<arr.length; i+=1){
            ret.push( new ExcerciseClass(arr[i], length) );
            if(pause) ret.push( new ExcerciseClass("Rest", pause) );
        }
        if(pause) ret.pop();
        return ret;
    }


    var aEx = exList.split(/[.,]+/);

    var totalTime;

    if(type === 'w'){
        if(aEx.length % 2) // odd
            totalTime = (75*2 + 15) * (aEx.length-1)/2 + 75
        else // even
            totalTime = (75*2 + 15) * aEx.length/2 - 15
    } else if (type === 'v'){
        totalTime = 40 * aEx.length - 10;
    } else if (type === 's'){
        totalTime = 24 * aEx.length;
    }
    var time = PT.secToDisp(totalTime);
    var deleteClicked = false;


    var exerciceLi = $('<div>',{class:"excerciceList"});
    var exText = "";

    var textType = "";

    if(type === 'w') textType = "Double";
    if(type === 'v') textType = "Single";
    if(type === 's') textType = "Stretch";

    var typeClass = type + "Class"


    for(var i=0; i<aEx.length; i+=2){
        exText = aEx[i];
        if(i+1 < aEx.length){
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
            if(type === 'w') startRun(name,totalTime,createExArD(aEx));
            if(type === 'v') startRun(name,totalTime,createExArS(aEx, 30, 10));
            if(type === 's') startRun(name,totalTime,createExArS(aEx, 24, 0));
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
                    class: 'workoutDelete'
                })
                .click(function(){
                  deleteClicked = true;
                  console.log("delete row.timeStamp=" + row.timeStamp)
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

/* standAlone Functions */
PT.secToDisp = function(seconds){
       var sec = ( seconds | 0 ) % 60;
       if ( sec < 10 )
           sec = "0"+sec;
       var min = (seconds / 60) | 0;
       return min + ':' + sec;
}

PT.main = function(){
    $('#stopExcersise').click(function(){
        PT.stopExcersise();
    });
    $('#addDoubleWorkoutButt').click(function(){
        addWorkout('w');
    });
    $('#addSingleWorkoutButt').click(function(){
        addWorkout('v');
    });
    $('#addStretchButt').click(function(){
        addWorkout('s');
    });
    $('#contribute_0').click(PT.purchase);
}

PT.removeEx = function(rowTimeStamp){
  IO.confirm(
    "Are you sure?",
    "Do you want to remove this exercise? This action can not be undone",
    function(){
      DB.indexedDB.deleteTodo(rowTimeStamp);
    })

}


PT.stopExcersise = function(){
    PT.clearCounter();
    PT.bOn = false;
    PT.speak("Exercise stopped", true);
    $('#currentExercise').text("-");
}

PT.clearCounter = function(){
    if(PT.startWorkoutTimer) clearTimeout(PT.startWorkoutTimer);
    if(PT.countDownInterval) clearInterval(PT.countDownInterval);
}

PT.speak = function(text, bOverideIsRunning){
    console.info(text);

    if(PT.bOn || bOverideIsRunning){
        var msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-US';
        speechSynthesis.speak(msg);
    }
}

PT.countDown2 = function(aExcersice, index, callBackFunk){
    console.log("coundDown2 ->")
    if(PT.countDownInterval) clearInterval(PT.countDownInterval);

    if(!PT.bOn){
        PT.clearCounter();
        return;
    }

    var seconds = aExcersice[index].seconds;

    var halfTime = ""+ Math.ceil(seconds / 2)

    console.log("aExcersise[index+1]:")
    console.log(aExcersice[index+1]);

    var nextExcersise = "Freedom!";
    if(aExcersice[index+1]) nextExcersise = aExcersice[index+1].name;

    var bRest = aExcersice[index].name == "Rest"

    $('#counter').text(seconds);
    PT.countDownInterval = setInterval(function(){
        $('#counter').text( $('#counter').text()-1 );

        var totSecLeft = $('#workoutCounter').attr('totalTime') - 1;
        $('#workoutCounter').attr('totalTime', totSecLeft);
        $('#workoutCounter').text(PT.secToDisp(totSecLeft));

        switch ($('#counter').text()){
            case halfTime:
                if(!bRest)
                    PT.speak('halftime');
                break;
            case "30":
                PT.speak('30 seconds left');
                break;
            case "10":
                if(halfTime > 14) PT.speak('10');
                break;
            case "5":
                if(!bRest)
                    PT.speak('next up ' + nextExcersise );
                break;
            case "0":
                if(bRest)
                    PT.speak("OK");
                else
                    PT.speak('Great work!');
                clearInterval(PT.countDownInterval);
                callBackFunk(aExcersice, index+1);
                break;
        }
    }, 1000);
}

var startRun = function(name, totalTime, aExcercise){
    console.log("startRun");
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
}

var run = function(aExcercise, index){
    if(index == aExcercise.length) {
        PT.speak("Now we are free!");
        $('#currentExercise').text("Great work!");
        return;
    }
    var ex = aExcercise[index];
    if(ex.name == 'Rest'){
        PT.speak("Lets rest for " + ex.seconds + " seconds.")

        if(aExcercise[index+1]){
          var firstFrase = "Then we'll do some ";
          if(aExcercise[index].name.substring(0, 3).toUpperCase() == "THE")
              firstFrase = "Then we'll do ";
          PT.speak(firstFrase + aExcercise[index+1].name);


          $('#currentExercise').text("Rest, then " + aExcercise[index+1].name);

        }
    } else{

        var firstFrase = "Lets do some ";
        if(aExcercise[index].name.substring(0, 3).toUpperCase() == "THE")
            firstFrase = "Lets do ";
        PT.speak(firstFrase + ex.name);

        $('#currentExercise').text(ex.name);
    }
    PT.countDown2(aExcercise, index, run );
}

var ExcerciseClass = function(name, seconds){
    this.name = name || "no Name Exercise";
    this.seconds = Math.round(seconds) || 45;
}

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

  outerDiv.style.position = "fixed"
  outerDiv.style.top = "0px"
  outerDiv.style.left = "0px"
  outerDiv.style.width = "100vw";
  outerDiv.style.height = "100vh";
  outerDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
  outerDiv.style.display = "flex"
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

  p.style.margin = "6px 0"

  document.body.appendChild(outerDiv);
return;
}//end confirm


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

} // end IO.keyboardKeydown *****************/


$( document ).ready(function(){
    console.log("ready")
    DB.indexedDB.open();
    PT.main();
    document.addEventListener('keydown', IO.keyboardKeydown);
});

//window.addEventListener("DOMContentLoaded", init, false);




