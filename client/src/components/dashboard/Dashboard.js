import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

import {ReactTabulator} from "react-tabulator";


class Dashboard extends Component {
    constructor(props) {
      super(props);

      this.state = {
        cards: []
      };
    }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  componentDidMount() {
    axios
    .get('/api/cards/getAll', {
      params: {
        id: this.props.auth.user.id
      }
    })
    .then(res =>  {
      this.setState({cards: JSON.stringify(res.data)});
    })
    .catch(error => {
      console.error(error);
    });
  }

render() {
    const { user } = this.props.auth;
    const { cards } = this.state;

    const columns = [
      { title: 'ID', field: '_id', width: 150 },
      { title: 'Owner', field: 'owner', align: 'left' },
      { title: 'UUID', field: 'uuid' },
      { title: 'Quantity', field: 'quantity' },
      { title: 'Container', field: 'container', align: 'center'},
    ];

    const options = {
      layoutColumnsOnNewData: true,
      layout: "fitColumns", //fit columns to width of table (optional)
    };

    console.log(cards);
    return (
      <div>
      <ReactTabulator
        columns={columns}
        data={cards}
        options={options}
        />

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
