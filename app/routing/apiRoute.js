
//data source that holds an array of people
var friends = require("../data/friends");


module.exports = function(app) {
  
//Api "get" request  
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  
//Api post request
  app.post("/api/friends", function(req, res) {

    var winningMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // Parses the data from the survey Post
    var userData = req.body;
    var userScores = userData.scores;

    // Variable that calculates the difference between the user"s scores and the scores of
    // each user in the database
    var scoreDifference;

    // Loops through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      scoreDifference = 0;

      console.log(currentFriend.name);

      // Loops through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // Calculate the difference between the scores and sum them into the scoreDifference
        scoreDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the sum of differences is less then the differences of the current "winning match"
      if (scoreDifference <= winningMatch.friendDifference) {
        // Reset the winningMatch to be the new friend.
        winningMatch.name = currentFriend.name;
        winningMatch.photo = currentFriend.photo;
        winningMatch.friendDifference = scoreDifference;
      }
    }

    //Save's user data to the database (this has to happen AFTER the check. otherwise,
    friends.push(userData);

    // Return a JSON with the user's winningMatch. This will be used by the HTML in the next page
    res.json(winningMatch);
  });
};