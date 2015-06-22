Games = new Mongo.Collection('games');

Games.allow({
	insert: function(userId, doc) {
		return (userId && doc.ownerId === userId);
	},
	update: function (userId, doc, fields, modifier) {
		return doc.ownerId === userId;
	},
	remove: function (userId, doc) {
		return doc.ownerId === userId;
	},
	fetch: ['ownerId']
});

Meteor.methods({
  gamesInsert: function(teamOneId, teamTwoId){
    var teamOne = Teams.findOne({_id: teamOneId});
    var teamTwo = Teams.findOne({_id: teamTwoId});
 
    var teamOneData = {
      _id: teamOne._id,
      name: teamOne.name,
      score: 0
    };

    var teamTwoData = {
      _id: teamTwo._id,
      name: teamTwo.name,
      score: 0
    };

    var game = {
      ownerId: Meteor.userId(),
      createdAt: new Date(),
      teams: [teamOneData, teamTwoData],
      completed: false
    };
 
    var gameId = Games.insert(game);
 
    Teams.update({_id: teamOneData._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: teamTwoData._id}, {$addToSet: { gameIds: gameId}});
 
    return gameId;
  }
});