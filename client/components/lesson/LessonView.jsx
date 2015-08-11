var React = require('react');
var VideoBox = require('./VideoBox.jsx');
var Content = require('./Content.jsx');
var _ = require('lodash');
var Actions = require('../../actions');
var LessonStore = require('../../stores/lesson-store.js');
var Reflux = require('reflux');


var LessonView = React.createClass({
  mixins: [Reflux.listenTo(LessonStore, "onChange")],

  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function(){
    Actions.fetchLesson(this.context.router.getCurrentParams().url)
  },
  render: function() {
    return (
        <div>
          <div id='lesson-view'>
            <VideoBox />
            <Content/>
          </div>
        </div>
    );
  }
});

module.exports = LessonView;