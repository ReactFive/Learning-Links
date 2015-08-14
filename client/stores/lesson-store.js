var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var AuthStore = require('./AuthStore')
var _ = require('lodash');

module.exports = Reflux.createStore({
  listenables: [Actions],
  mixins: [Reflux.connect(AuthStore)],

  init: function() {},

  fetchLesson : function(url){
    url = url// || 'sass-101'
    var self = this;
    Api.getLesson(url)
    .then(function(res) {
      self.lesson = res.data;
      console.log(self.lesson)
      self.trigger(self.lesson);
    })
  },

  followLesson : function(url){
    {/*Check if the user is already following this lesson*/}
    var following = _.reduce(window.currentUser.lessons, function(found, elem, key){
      if (found) {
        return true
      } else {
        return (elem.lesson_url === url)
      }}, false
    )
    console.log(following)
    if(!following) 
    {
      console.log('adding lesson')
      console.log(url)
      Api.updateUser({
        test: 'wat',
        lesson_url : url,
        addLesson : true
      })
    }
  },

  submitComment: function(comment) {
    this.lesson.comments.push(comment);
    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);
  },

  deleteComment: function(commentKey){
    //find the index of the comment to which the reply should be added
    var commentIndex;
    _.forEach(this.lesson.comments, function(comment, key){
      if(comment.key === commentKey){
        commentIndex = key;
      }
    })

    //remove the index
    this.lesson.comments.splice(commentIndex, 1);
    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);

  },

  likeComment: function(commentKey, userID){
    //find the index of the comment to which the reply should be added
    var commentIndex;
    _.forEach(this.lesson.comments, function(comment, key){
      if(comment.key === commentKey){
        commentIndex = key;
      }
    })
    
    if(this.lesson.comments[commentIndex].likes.indexOf(userID)  === -1){
      this.lesson.comments[commentIndex].likes.push(userID);
    }

    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);
  },

  unlikeComment: function(commentKey, userID){
    //find the index of the comment to which the reply should be added
    var commentIndex;
    _.forEach(this.lesson.comments, function(comment, key){
      if(comment.key === commentKey){
        commentIndex = key;
      }
    })
    
    if(this.lesson.comments[commentIndex].likes.indexOf(userID) >= 0){
      var index = this.lesson.comments[commentIndex].likes.indexOf(userID);
      this.lesson.comments[commentIndex].likes.splice(index, 1);
    }

    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);
  },

  starComment: function(commentKey, userID){
    //find the index of the comment to which the reply should be added
    var commentIndex;
    _.forEach(this.lesson.comments, function(comment, key){
      if(comment.key === commentKey){
        commentIndex = key;
      }
    })
    
    //toggle the star
    this.lesson.comments[commentIndex].star = !this.lesson.comments[commentIndex].star;
 

    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);
  },


  submitReply: function(reply, commentKey) {
    //wrap the reply in an object
    var replyObj = {
      author: reply.author,
      text: reply.text
    };
    //find the index of the comment to which the reply should be added
    var commentIndex;
    _.forEach(this.lesson.comments, function(comment, key){
      if(comment.key === commentKey){
        commentIndex = key;
      }
    })
    //add the reply to the comments
    this.lesson.comments[commentIndex].replies.push(replyObj);
    this.trigger(this.lesson);
    Api.updateLesson(this.lesson);
  }
})
