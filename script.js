var users = ["freecodecamp", "storbeck", "MedryBW", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "thomasballinger", "noobs2ninjas", "esl_csgo", "beohoff"];
var clientId = '2k027j7xdqh816oyq4uw3t934xuyjhl';

// function grabs data from channels URL (vs streams URL) for offline users

function offline(num) {

  var url = "https://api.twitch.tv/kraken/channels/" + users[num] + "?client_id="+clientId;

  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(twitch) {

        var usericon = twitch.logo;
        var username = twitch.display_name;
        var userlink = twitch.url;
        var offline = "OFFLINE";
      
        if (usericon == undefined) {
          usericon = "http://bit.ly/1WGY3Uw";
        }
      
      if (username == undefined) {
        username = users[num];
      }

        console.log(users[num] + twitch.status);

        if (twitch.status == 422) {
          offline = "ACCOUNT CLOSED";
        }

        document.getElementById("userblock").innerHTML += "<a href=" + userlink + "><div class='row'><div class='col-xs-3'></div><div class='col-xs-1 icon-box showred'><img src='" + usericon + "' class='icon' height='50'></div><div class='col-xs-1 username showred'><p>" + username + "</p></div><div class='col-xs-4 info showred'><p>" + offline + "</p></div><div class='col-xs-3'></div></div></a>";

      } //closing API success function
  }); //closing ajax call
} // closing offline();

// Function that runs on load and loops through the user array  

function getStreams() {

  for (var i = 0; i < users.length; i++) {

    var url = "https://api.twitch.tv/kraken/streams/" + users[i] + "?client_id="+clientId;

    $.ajax({
      url: url,
      dataType: 'json',
      async: false,
      success: function(twitch) {

          if (twitch.stream === null) {

            offline(i);

          } else {

            var usericon = twitch.stream.channel.logo;
            var username = twitch.stream.channel.name;
            var userlink = twitch.stream.channel.url;
            var userstatus = twitch.stream.channel.status;
            
            if (usericon == undefined) {
          usericon = "http://bit.ly/1WGY3Uw";
        }

            document.getElementById("userblock").innerHTML += "<a href=" + userlink + "><div class='row'><div class='col-xs-3'></div><div class='col-xs-1 icon-box showgreen'><img src='" + usericon + "' class='icon' height='50'></div><div class='col-xs-1 username showgreen'><p>" + username + "</p></div><div class='col-xs-4 info showgreen'><p>" + userstatus + "</p></div><div class='col-xs-3'></div></div></a>";

          } //closing else

        }, //closing API success function
      
        error: function(twitch) {
          console.log(users[i]);
          offline(i);
        }
      
    }); //closing ajax API call
  }; //closing for loop
} //closing getStreams onload function