var friendsList = require("../data/friends");

module.exports = function(app) {
  
    app.get("/api/friends", function(res) {
      res.json(friendsList);
    });
  
    app.post("/api/friends", function(req, res) {
      
    var newFriendScores = req.body.scores;
    var submitScores = [];
    var bestMatch = 0;

    for(var i=0; i<friendsList.length; i++){
      var scoresDiff = 0;
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      submitScores.push(scoresDiff);
    }

    for(var i=0; i<submitScores.length; i++){
      if(submitScores[i] <= submitScores[bestMatch]){
        bestMatch = i;
      }
    }

    var matchFriend = friendsList[bestMatch];
    res.json(matchFriend);

    friendsList.push(req.body);
  });
};