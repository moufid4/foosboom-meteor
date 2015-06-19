Template.teams.helpers({
  isCreatingTeam: function(){
    return Session.get('isCreatingTeam');
  },
  teams: function(){
    return Teams.find();
  } 
});

Template.teams.events({
  'click a.create': function(e, tpl){
    Session.set('isCreatingTeam', true);
  },

  'click a.cancel': function(e, tpl){
    Session.set('isCreatingTeam', false);
  },

  'submit form.create-team': function(e, tpl){
    var teamName = $('input[name=name]').val();
    Teams.insert({name: teamName});
  }
});