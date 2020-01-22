import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }
  onViewClick= e => {
    console.log("test");
    axios.get('/api/cards/getAll', {
      params: {
        id: e
      }
    })
    .then(res =>  {
      var cards = JSON.stringify(res);
      console.log(cards);
    }).catch(error => {
      console.error(error);
    });
  }
render() {
    const { user } = this.props.auth;
    console.log(user);
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there </b> {user.name.split(" ")[0]} <b>!</b>
              <p className="flow-text grey-text text-darken-1">
                You are logged into MagicDex <span role="img" aria-label="poppers">🎉</span>
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={ () => this.onViewClick(user.id)}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Dashboard
            </button>
            <div></div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable red accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
