import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class DataLapangan extends Component {
  constructor() {
    super();
    this.state = {
        lapangan: [],
        id: "",
        nama: "",
        harga: "",
        gambar: null,
        action: "",
        find: "",
        message: ""
    }

    
    // if(!localStorage.getItem("Token")){
    
      // window.location = "/login";
    // }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({gambar: event.target.files[0]})
    }

    Add = () => {
      
      $("#modal_member").modal("show");
      
      this.setState({
        action: "insert",
        id: "",
        nama: "",
        harga: "",
        gambar: ""
      });
    }

    Edit = (item) => {
      
      $("#modal_member").modal("show");
     
      this.setState({
        action: "update",
        id: item.id,
        nama: item.nama,
        harga: item.harga,
        gambar: item.gambar
      });
    }

    getLapangan = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/lapangan";
      axios.get(url)
      .then(response => {
        this.setState({lapangan: response.data.lapangan});
        console.log(this.setState);
        // $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/lapangan/drop/" + id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.getLapangan();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.getLapangan();      
    }

    Save = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_member").modal("hide");
      let url = "http://localhost/lapangan/public/lapangan/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("nama", this.state.nama);
      form.append("harga", this.state.harga);
      // if (form.has("gambar")){
      form.append("gambar", this.state.gambar, this.state.gambar.name);
      // }

      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.getLapangan();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if (event.keyCode === 13) {
          let url = "http://localhost/lapangan/public/lapangan/find"

          let form = new FormData()
          form.append("searchBy", "this.state.searchBy")
          form.append("find", this.state.find)
          axios.post(url, form)
              .then(response => {
                  this.setState({lapangan: response.data.lapangan})
              })
              .catch(error => {
                  console.log(error);
              })
      }
      
  }

    render(){
      return(
        <div className="container" style={{marginTop: "5%", marginBottom:"2%"}}>
          <div className=" mt-5">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h2 className="#" style={{fontWeight:"500", textAlign:"center", fontSize:"40px"}} >Data Lapangan</h2>
                </div>
              </div>

              <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-search" />
              </span>
            </div>
            <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian Nama Lapangan" />
          </div>

            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <div className="table-responsive">
              <table className="table table-hover">
                <thead className="">
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Harga</th>
                    <th>Gambar</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.lapangan.map((item) => {
                    return(
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.harga}</td>
                        <td>{item.gambar === "null" ? <div style={{fontWeight:"400", color:"green"}}>NO IMAGE</div> : <img src={"http://localhost/lapangan/public/images/" + item.gambar} style={{width:"120px", height:"80px"}} alt="Kosong"></img>} </td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-dark" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
              {/* tombol tambah */}
              <center>
              <button className="btn btn-outline-dark my-2"  onClick={this.Add}>
                <span className="#" ></span> Tambah Lapangan
              </button>
              </center>

              {/* form modal Barang*/}
              <Modal id="modal_member" title="Form Lapangan" bg_header="light" text_header="dark">
                <form onSubmit={this.Save}>
                  Nama
                  <input type="text" className="form-control" name="nama" 
                  value={this.state.nama} onChange={this.bind} required />
                  Harga
                  <input type="text" className="form-control" name="harga"
                    value={this.state.harga} onChange={this.bind} required />
                  Gambar
                  <input type="file" className="form-control" name="gambar" 
                    onChange={this.bindImage} />
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
export default DataLapangan;