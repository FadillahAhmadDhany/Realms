import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';
import './Main.css'
import './Util.css'

class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("id");
    localStorage.removeItem("cart");
    localStorage.removeItem("role");
    window.location = "/"
  }

  
  
  render() {
    let role = localStorage.getItem("role");
    let auth = localStorage.getItem("Token");
    return (
          <div>
            <nav className="navbar shadow-sm navbar-expand-lg navbar-dark bg-p fixed-top">
    <div className="container">
      <a className="navbar-brand" href="/" style={{fontFamily:"Candara"}}>
        REALMS
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">

          { role === "admin" ? "" : <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li> }
          { role === "admin" ? "" : <li className="nav-item"><Link className="nav-link" to="/myprofile">Myprofile</Link></li> }
          { role === "admin" ? "" : <li className="nav-item"><Link className="nav-link" to="/mysewa">Sewa Lapangan</Link></li> }
          
          { role === "admin" ? auth ? <li className="nav-item"><Link className="nav-link" to="/admin">Member</Link></li> : "" : "" }
          { role === "admin" ? auth ? <li className="nav-item"><Link className="nav-link" to="/dataLapangan">Data Lapangan</Link></li> : "" : "" }
          { role === "admin" ? auth ? <li className="nav-item"><Link className="nav-link" to="/dataSewa">Data Sewa</Link></li> : "" : "" }

          {!(auth) ? <li className="nav-item"><Link className="nav-link" to="/login">login</Link></li> : 
            <li className="nav-item"><button className="nav-link" onClick={this.Logout}>Logout</button></li> }
        </ul>
      </div>
    </div>
  </nav>
      </div>
  


      
    );
  }
}
export default Navbar;
