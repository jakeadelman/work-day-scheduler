var currDate = moment(new Date()).format("dddd, MMMM Do, YYYY");
$("#currdate").text(currDate.toString());

$(".row", $(".container")).each(function () {
  backgroundChanger($(this));
  getEvent($(this));
  onSave($(this));
});

function backgroundChanger(row) {
  //   console.log(row);
  var time = row.children(":first").text();

  var newTime = 0;
  if (time.includes("pm")) {
    var newTime = time.split(" ");
    newTime = parseInt(newTime[0]) + 12;
    newTime = newTime + ":00";
  } else {
    var newTime = time.split(" ");
    newTime = newTime[0].toString() + ":00";
  }
  var newDate = new Date();

  var day = newDate.getDate();
  var year = newDate.getFullYear();
  var month = newDate.getMonth() + 1;
  var ymd = year.toString() + "-" + month.toString() + "-" + day.toString();

  var hour = newDate.getHours();
  hour = hour + ":00";

  var theHour = new Date(ymd + " " + newTime);
  var currHour = new Date(ymd + " " + hour);
  var difference = (theHour - currHour) / 3600000;

  if (difference > 1) {
    row.children(".col-md-9").css("background-color", "lightgreen");
  } else if (difference == 0) {
    row.children(".col-md-9").css("background-color", "#F62817");
  } else if (difference < 1) {
    row.children(".col-md-9").css("background-color", "lightgrey");
  }
}

function onSave(row) {
  var saveEl = row.children(":last");
  var timeEl = row.children(":first");
  var inputEl = row.children(".col-md-9");

  saveEl.click(function () {
    localStorage.setItem(timeEl.text(), inputEl.val());
  });
}

function getEvent(row) {
  var timeEl = row.children(":first");
  var inputEl = row.children(".col-md-9");
  var timeElText = timeEl.text();

  var storage = localStorage.getItem(timeElText);
  if (storage != null) {
    inputEl.val(storage);
  }
}
