Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/', {
	name: 'games',
	waitOn: function(){
		return [Meteor.subscribe("games"), Meteor.subscribe("teams")];
	}
});

Router.route('/teams', {
	waitOn: function(){
		return Meteor.subscribe("teams");
	}
});

var requireLogin = function(){
	if(!Meteor.user()){
		this.render("accessDenied");
	} else {
		this.next();
	}
}
Router.onBeforeAction(requireLogin);