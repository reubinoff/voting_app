import React from 'react';
import PropTypes from 'prop-types'; // ES6
import LoginsContainer from './LoginsContainer'
import './NavBar.css'
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  static get contextTypes() {
    return {
      router: PropTypes.object.isRequired,
    };
  }


  render() {


    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="btn btn-default navbar-btn" href="#">

              <i className="fa fa-envelope" aria-hidden="true"></i>
            </button>
          </div>

          <LoginsContainer />

        </div>
      </nav>
    );
  }
}


export default NavigationBar;
