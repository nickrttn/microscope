Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error) {
			if (error) {
				alert(error.reason);
			} else if (Posts.findOne({url: postProperties.url})){
				alert('There\'s already a post with that URL.');
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if(confirm('Delete this post?')) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});