var React = require('react');

var LibLessonEntry = require('./lib-lesson-entry.jsx');
var LibAddLesson = require('./lib-add-lesson.jsx')

var Library = React.createClass({
  render:function(){
    return (
      <div id="library">
        <LibLessonEntry lessons = {this.props.lessons}/>
        <LibAddLesson />
      </div>
    )
  }
});

module.exports = LibLessonEntry;