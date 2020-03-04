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
      cards: [],
      name: "",
      quantity: ""
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newEntry = {
      owner: this.props.auth.user.id,
      name: this.state.name,
      quantity: this.state.quantity
    };
    console.log("test");
    axios
    .post("/api/cards/add", newEntry)
    .then(console.log(newEntry))
    .catch(err =>{
      console.error(err);}
    );
    console.log(newEntry);
  };

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
      { title: 'Card Name', field: 'name' },
      { title: 'Quantity', field: 'quantity' },
      { title: 'Container', field: 'container', align: 'center'},
    ];

    const options = {
      layoutColumnsOnNewData: true,
      layout: "fitColumns", //fit columns to width of table (optional)
    };

    return (
      <div>
      <ReactTabulator
      columns={columns}
      data={cards}
      options={options}
      />
      <form noValidate onSubmit={this.onSubmit}>
      <div class="row">
      <div class="row">
      <div class="input-field col s6">
      <input
      onChange ={this.onChange}
      value={this.state.name}
      placeholder="Card Name"
      id="name"
      type="text"
      />
      </div>
      </div>
      <label>Quantity</label>
      <select
      value={this.state.quantity}
      onChange={this.onChange}
      id="quantity"
      class="browser-default">
      <option value="" disabled selected>Choose quantity</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="3">4</option>
      </select>

      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
      <i class="material-icons right">send</i>
      </button>
      </div>
      </form>


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
