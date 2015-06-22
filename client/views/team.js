Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedTeamId') === this._id;
  }
});

Template.team.events({
  "click a.edit": function(e, tpl){
    e.preventDefault();
    Session.set('editedTeamId', this._id);
  },
 
  "submit form.form-edit": function(e, tpl){
    e.preventDefault();
 
    var teamName = tpl.$("input[name='name']").val();
    var self = this;

    if(teamName.length){
      Teams.update(this._id, {$set: {name: teamName}}, function(error){

        if(!error){

          var games = Games.find({_id: {$in: self.gameIds}});
          if(games.count()){
            _(games.fetch()).each(function(game){
              var team = _(game.teams).findWhere({id: self._id});
              if(team != null){
                team.name = teamName;
                Games.update({_id: game._id}, {$set: {teams: game.teams}})
              }
            });
          }
        }
      });

      Session.set('editedTeamId', null);
    }
  },
});