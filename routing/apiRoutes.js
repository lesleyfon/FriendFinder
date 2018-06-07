// We are linking our routes to a series of "data" sources.
var friendsData = require("../app/data/friends");
// API GET Requests
// Below code handles when users "visit" a page.
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friendsData array)

    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function (req, res) {
        // code goese here
            var newFriend = req.body;
            var bestFriend = {
                name:"",
                photo:"",
                difference:1000
            }
            var difference;
            

            for (var i=0; i<friendsData.length; i++){
                // grabbing a particular friend
                var curFriend = friendsData[i];
                // console.log(curFriend)
                // grabing the value of the scores
                for (var j=0; j<curFriend.scores.length; j++){
                    var curFriendScr = parseInt(curFriend.scores[j]);
                    // grabing the value of the scores from the use input

                    var curUserScr = parseInt(newFriend.scores[j]);
                
                    //converting the corrent scores to numbers then we fine the absolute difference between the numbers and we add that to our total differencen variable
                     difference += Math.abs(curFriendScr - curUserScr);
                    //  console.log(difference)
                    
                };
            //    if(difference < bestFriend.difference) {
                    bestFriend.name = curFriend.name;
                    bestFriend.photo = curFriend.photo;
                    bestFriend.difference = difference;
            //    }
            }


            friendsData.push(req.body);
            
            res.json(bestFriend);
   
    });
}