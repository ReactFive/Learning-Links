var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;
var Route = Router.Route;
var AuthStore = require('../../stores/AuthStore');
var Actions = require('../../actions');

module.exports = React.createClass({
  mixins: [Navigation],

  render: function(){
    return ( <div className="container" id='signup'>
      <div className="col-md-6 col-md-offset-3">

        <h1>signup</h1>
        <form name="signupForm" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label id="name">Name</label>
            <input ref="name" className="form-control" name="name" type='text' placeholder="First Last"/>
          </div>

          <div className="form-group">
            <label id="email">Email</label>
            <input ref="email" className="form-control" name="email" type='text' placeholder="you@mail.com"/>
          </div>

          <div className="form-group">
            <label id="password">Password</label>
            <input ref="password" className="form-control" name="password" type="password" placeholder="combination of 6+ letters and numbers"/>
          </div>

          <div className="form-group">
            <label id="password2">Confirm Password</label>
            <input ref="password2" className="form-control" name="password2" type="password" placeholder="same password again"/>
          </div>

          <button className="btn btn-primary">signup</button>
        </form>
      </div>
    </div> )
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var password2 = this.refs.password2.getDOMNode().value;

    if (password !== password2) {
      toastr["warning"]("Your passwords do not match")
    } else {
      Actions.signup(name, email, password)
      .then(function(){
        this.transitionTo("/");
      }.bind(this));

      this.refs.name.getDOMNode().value = "";
      this.refs.email.getDOMNode().value = "";
      this.refs.password.getDOMNode().value = "";
      this.refs.password2.getDOMNode().value = "";

      //Actions.login(email, password);
    }
  }
});