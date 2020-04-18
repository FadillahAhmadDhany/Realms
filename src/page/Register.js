import React, {Component} from 'react';
import axios from "axios";
import $ from "jquery";
import vec1 from '../component/Image/vector1.jpg'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
            message:""
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    Save = (event) => {
      const { password, confirmPassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
      event.preventDefault();
      let url = "http://localhost/lapangan/public/register";
      let form = new FormData();
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      axios.post(url, form)

      .then(response => {
        this.setState({message: response.data.message});
        $("#message").toast("show");
        window.location = "/login";
      })
      .catch(error => {
        console.log(error);
      });
    }
    }
      
  render(){
    return (
      <div>
  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-pic js-tilt" data-tilt>
          <img src={vec1} alt="IMG" />
        </div>
        <form className="login100-form validate-form" onSubmit={this.Save}>
          <span className="login100-form-title">Member Register</span>
          <div
            className="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              className="input100"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username} onChange={this.bind}
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-user-circle" aria-hidden="true" />
            </span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              className="input100"
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email} onChange={this.bind}
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              className="input100"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password} onChange={this.bind}
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Password is required"
          >
            <input
              className="input100"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword} onChange={this.bind}
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">Register</button>
          </div>
          <div className="text-center p-t-136">
            <a className="txt2" href="/login">
              <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true" />
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    );
  }
}

export default Register;
