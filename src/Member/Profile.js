import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";


class Profile extends Component {
  constructor() {
    super();
    this.state = {
        profile:[],
        last_password:"",
        new_password:"",
        action: "",
        find: "",
        message: ""
    }

    
    if(!localStorage.getItem("Token")){
    
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({gambar: event.target.files[0]})
    }

    Edit = (item) => {
      
      $("#modal_member").modal("show");
     
      this.setState({
        action: "update",
        id: item.id,
        username: item.username,
        email: item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        gender: item.gender,
        date_birth: item.date_birth,
        no_hp: item.no_hp,
        alamat: item.alamat
      });
    }
    
    EditPassword = (item) => {
      
      $("#modal_password").modal("show");
     
      this.setState({
        id: item.id,
        last_password: item.last_password,
        new_password: item.new_password
      });
    }

    Myprofile = () => {
    let id = JSON.parse(localStorage.getItem('id'))
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/myprofil/" + id;
      axios.get(url)
      .then(response => {
        this.setState({profile: response.data.profil});
        console.log(this.setState);
        // $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    componentDidMount = () => {
      this.Myprofile();     
    }

    Save = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_member").modal("hide");
      let url = "http://localhost/lapangan/public/myprofil/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("first_name", this.state.first_name);
      form.append("last_name", this.state.last_name);
      form.append("gender", this.state.gender);
      form.append("date_birth", this.state.date_birth);
      form.append("no_hp", this.state.no_hp);
      form.append("alamat", this.state.alamat);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.Myprofile();
      })
      .catch(error => {
        console.log(error);
      });
    }

    ChangePassword = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_password").modal("hide");
      let url = "http://localhost/lapangan/public/myprofil/pwd";
      let form = new FormData();
      form.append("id", this.state.id);
      form.append("last_password", this.state.last_password);
      form.append("new_password", this.state.new_password);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.Myprofile();
      })
      .catch(error => {
        console.log(error);
      });
    }

    render(){
      return(
        <div className="container-fluid" style={{marginTop: "8%", marginBottom:"8%"}}>
          <div className=" mt-5">
            {/* header card */}
            <div className="#">
            <div className="card-body">
            <div className="row no-gutters shadow">
                <div className="col-sm-3 ">
                  <img src={"http://localhost/lapangan/public/images/Dha.jpg"} className="rounded mx-auto d-block" style={{marginTop: "40px",  width: "200px"}} alt="Tidak Ada"/>
                  </div>
                
                <div className="col-md-8 ">
                  <div className="card-body">
                  <center><h4 className="card-title" style={{ fontWeight: "500" }}>Data Diri</h4></center>
                  
                    <div className="table table-borderless">
                    { this.state.profile.map((item) => {
                    return(
                      <ul className="list-group list-group-flush" key={item.id}>
                        <li className="list-group-item">Username : {item.username}</li>
                        <li className="list-group-item">Email : {item.email}</li>
                        {/* <li className="list-group-item">Password : {item.password}</li> */}
                        <li className="list-group-item">Role : {item.role}</li>
                        <li className="list-group-item">Nama Lengkap : {item.first_name} {item.last_name}</li>
                        <li className="list-group-item">Tanggal Lahir : {item.date_birth}</li>
                        <li className="list-group-item">Jenis Kelamin : {item.gender}</li>
                        <li className="list-group-item">
                          <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit">Edit</span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.EditPassword(item)}>
                            <span className="fa fa-edit">Change Password</span>
                          </button>
                        </li>
                      </ul>
                      );
                    })}
                    </div>

                  </div>
                </div>
              </div>
              </div>

              {/* form modal Barang*/}
              <Modal id="modal_member" title="Edit Profile" bg_header="light" text_header="dark">
              <form onSubmit={this.Save}>
                  Username
                  <input type="text" className="form-control" name="username" value={this.state.username}
                    onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="email"
                    value={this.state.email} onChange={this.bind} required />
                  Nama Awal
                  <input type="text" className="form-control" name="first_name" 
                  value={this.state.first_name} onChange={this.bind} required />
                  Last Name
                  <input type="text" className="form-control" name="last_name" 
                  value={this.state.last_name} onChange={this.bind} required />
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select className="form-control" name="gender" value={this.state.value} onChange={this.bind} required>
                      <option value="">Select..</option>
                      <option value="L">Laki Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  TTL
                  <input type="date" className="form-control" name="date_birth" 
                  value={this.state.date_birth} onChange={this.bind} required />
                  {/* NO HP
                  <input type="int" className="form-control" name="no_hp" 
                  value={this.state.no_hp} onChange={this.bind} />
                  Alamat
                  <input type="text" className="form-control" name="alamat" 
                  value={this.state.alamat} onChange={this.bind} /> */}

                  {/* Image
                  <input type="file" className="form-control" name="img_brg" 
                   onChange={this.bindImage} /> */}

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>

              <Modal id="modal_password" title="Form Password" bg_header="light" text_header="dark">
              <form onSubmit={this.ChangePassword}>
                  Password
                  <input type="text" className="form-control" name="last_password"
                    value={this.state.value} onChange={this.bind} required />
                  New Password
                  <input type="text" className="form-control" name="new_password" 
                  value={this.state.value} onChange={this.bind} required />
                  
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
}
export default Profile;