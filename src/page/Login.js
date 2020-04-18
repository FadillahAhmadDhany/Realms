import React, {Component} from 'react';
import axios from "axios";
import $ from "jquery";
import vec4 from '../component/Image/vector4.jpg'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    }
  }

  bind = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form)
    .then(response => {
      let logged = response.data.status;
      let role = response.data.users.role;
      if (logged) {

        if(role === "admin"){
          window.location = "/admin";
        }else{
          window.location = "/myprofile";

        }

        this.setState({message: "Login Berhasil"});
        //menyimpan data token pada local storage
        localStorage.setItem("Token", response.data.token);
        //menyimpan data login user ke local storage
        localStorage.setItem("id", JSON.stringify(response.data.users.id));
        //direct ke halaman data siswa
        localStorage.setItem("role", response.data.users.role);
        
        
      } else {
        this.setState({message: "Login Gagal"});
      }
      $("#message").toast("show");
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return (
      <div>
  <div className="limiter">
    <div className="container-login100">
      <div className="wrap-login100">
        <div className="login100-pic js-tilt" data-tilt>
          <img src={vec4} alt="IMG" />
        </div>
        <form className="login100-form validate-form" onSubmit={this.Login}>
          <span className="login100-form-title">Member Login</span>
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
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">Login</button>
          </div>
          <a className="txt2" href="/">
              <i className="fa fa-long-arrow-left m-l-5" aria-hidden="true" />
              Back To Home Page
            </a>
          <div className="text-center p-t-136">
            <a className="txt2" href="/register">
              Create your Account
              <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
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

export default Login;
