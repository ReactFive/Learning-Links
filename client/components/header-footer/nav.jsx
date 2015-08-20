var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Reflux = require('reflux');
var AuthStore = require('../../stores/AuthStore');
var Actions = require('../../actions');
var Navigation = Router.Navigation;


var nav = React.createClass({
  mixins: [Reflux.connect(AuthStore,"auth"), Navigation],

  getInitialState: function(){
  },

  componentWillMount: function(){
   Actions.authenticate();
  },

  render: function() {
    return ( <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">
            LESSON LINKS
          </Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className="hoverNavSpecial">
              {(this.state.auth && this.state.auth.loggedIn) && <Link activeClassName="active" className="navCreate" to="/add-lesson">Create Lesson</Link>}
            </li>
            <li className="hoverNavSpecial">
              {(this.state.auth && this.state.auth.loggedIn) && <Link activeClassName="active" to="/library">Library</Link>}
            </li>
            <li className="hoverNavSpecial pull-right">
             <a href="/api/google">Google< /a>
            </li>            
            <li className="hoverNavSpecial pull-right">
              <a href="/api/facebook">Facebook< /a>
            </li>
            <li className="hoverNavSpecial pull-right">
              <a href="/api/twitter">Twitter < /a>
            </li>
            <li className="hoverNavSpecial pull-right">
              {(this.state.auth && !this.state.auth.loggedIn) && <Link activeClassName="active" to="/register">Signup</Link>}
            </li>
            <li>
              { (this.state.auth && this.state.auth.loggedIn) ? null : this.renderLogin() }
            </li>
            <li className="hoverNavSpecial">
              { (this.state.auth && this.state.auth.loggedIn) ? 
                 <a onClick={this.handleLogout}>Logout</a>
                 : 
                 <a className="pull-right" type="submit" onClick={this.handleSubmit}>Login</a> }
            </li>
          </ul>
        </div>
      </div>
    </nav> )
  },

  renderLogin: function(){
    return (
    <form onSubmit={this.handleSubmit} className="navbar-form navbar-right" role="search">
      <div className="form-group form-group-md">
        <div className="col-sm-4">
          <input ref="email" type="text" className="form-control nav-login" placeholder="Email"/>
        </div>
      </div>
      <div className="form-group form-group-md">
        <div className="col-sm-4">
          <input ref="password" type="password" className="form-control nav-login" placeholder="Password"/>
        </div>
      </div>
      {/* add error message */}
    </form>)
  },

  handleLogout: function() {
    event.preventDefault();
    Actions.logout();
    this.transitionTo('/');
  },

  handleSubmit: function(event){
    event.preventDefault();

    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    Actions.login(email, password);

    this.refs.email.getDOMNode().value = "";
    this.refs.password.getDOMNode().value = "";

    this.transitionTo('/library');

  }
});

module.exports = nav;
