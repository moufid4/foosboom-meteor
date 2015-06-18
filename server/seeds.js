Meteor.startup(function () {
	if (Teams.find().count() === 0) {
		[
			{name:"Barcelona"},
			{name: "Real Madrid"},
			{name: "Mouloudia"}
		].forEach(function(team){
			Teams.insert(team);
		});
	}
});