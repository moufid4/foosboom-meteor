Template.teams.helpers({
	isCreatingTeam: function(){
		return Session.get('isCreatingTeam');
	},
	teams: function(){
		return Teams.find();
	}
});