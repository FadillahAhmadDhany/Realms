import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";


class DataSewa extends Component {
  constructor() {
    super();
    this.state = {
        sewa: [],
        id_sewa: "",
        id_lapangan: "",
        nama_lapangan: "",
        id_user: "",
        username: "",
        tgl_book: "",
        wkt_mulai: "",
        wkt_selesai: "",
        durasi: "",
        biaya: "",
        status: "",

        member: [],
        lapangan: [],

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


    Used = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/lapangan/public/sewa/used/"+id;
        axios.post(url)
        .then(response => {
          this.getSewa();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Done = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/lapangan/public/sewa/done/"+id;
        axios.post(url)
        .then(response => {
          this.getSewa();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Add = () => {
      
      $("#modal_member").modal("show");
      
      this.setState({
        action: "insert",
        id: "",
        id_lapangan: "",
        id_user: "",
        tgl_book: "",
        wkt_mulai: "",
        wkt_selesai: "",
      });
    }

    Edit = (item) => {
      
      $("#modal_member").modal("show");
     
      this.setState({
        action: "update",
        id: item.id_sewa,
        id_lapangan: item.id_lapangan,
        id_user: item.id_user,
        tgl_book: item.tgl_book,
        wkt_mulai: item.wkt_mulai,
        wkt_selesai: item.wkt_selesai,
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

    getMember = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member";
      axios.get(url)
      .then(response => {
        this.setState({member: response.data.member});
        console.log(this.setState);
        // $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    getSewa = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/sewa";
      axios.get(url)
      .then(response => {
        this.setState({sewa: response.data.sewa});
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
        let url = "http://localhost/lapangan/public/sewa/drop/" + id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.getSewa();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.getSewa(); 
      this.getLapangan();
      this.getMember();     
    }

    Save = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_member").modal("hide");
      let url = "http://localhost/lapangan/public/sewa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("id_lapangan", this.state.id_lapangan);
      form.append("id_user", this.state.id_user);
      form.append("tgl_book", this.state.tgl_book);
      form.append("wkt_mulai", this.state.wkt_mulai);
      form.append("wkt_selesai", this.state.wkt_selesai);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        // this.setState({message: response.data});
        // $("#message").toast("show");
        this.getSewa();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if (event.keyCode === 13) {
          let url = "http://localhost/lapangan/public/sewa/find"

          let form = new FormData()
          form.append("searchBy", "this.state.searchBy")
          form.append("tgl", this.state.tgl)
          axios.post(url, form)
              .then(response => {
                  this.setState({sewa: response.data.sewa})
              })
              .catch(error => {
                  console.log(error);
              })
      }
      
  }

    render(){
      // const { sewa } = this.state;
      return(
        <div className="container" style={{marginTop: "5%", marginBottom:"2%"}}>
          <div className=" mt-5">
            {/* header card */}
            <div className="#">
              <div className="row">
                <div className="col">
                  <h2 className="#" style={{fontWeight:"500", textAlign:"center", fontSize:"40px"}} >Data Sewa</h2>
                </div>
              </div>

              <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-search" />
              </span>
            </div>
            <input type="date" className="form-control" name="tgl"
                    onChange={this.bind} value={this.state.tgl} onKeyUp={this.search}
                    placeholder="Pencarian..." />
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
                    <th>Nama Lapangan</th>
                    <th>Username</th>
                    <th>Tanggal Book</th>
                    <th>Waktu Mulai</th>
                    <th>Waktu Selesai</th>
                    <th>Durasi</th>
                    <th>Biaya</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Additional</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.sewa.map((item) => {
                    return(
                      <tr key={item.id_sewa}>
                        <td>{item.id_sewa}</td>
                        <td>{item.nama_lapangan}</td>
                        <td>{item.username}</td>
                        <td>{item.tgl_book}</td>
                        <td>{item.wkt_mulai}</td>
                        <td>{item.wkt_selesai}</td>
                        <td>{item.durasi}</td>
                        <td>{item.biaya}</td>
                        <td>{item.status}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop(item.id_sewa)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                        <td>
                        <button className="m-1 btn btn-sm btn-outline-warning"
                            onClick={() => this.Used(item.id_sewa)}>
                            Used
                          </button>
                        <button className="m-1 btn btn-sm btn-outline-success"
                            onClick={() => this.Done(item.id_sewa)}>
                            Done
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
                <span className="#" ></span> Tambah Data Sewa
              </button>
              </center>

              {/* form modal Barang*/}
              <Modal id="modal_member" title="Form Sewa" bg_header="light" text_header="dark">
                <form onSubmit={this.Save}>
                Lapangan
                <select className="form-control" name="id_lapangan" value={this.state.id_lapangan} onChange={this.bind} required>
                        <option>Select</option>
                      {this.state.lapangan.map((il) => {
                    return(
                      <option key={il.id} value={il.id}>{il.nama}({il.id})</option>
                      )})}
                    </select>
                User
                <select className="form-control" name="id_user" value={this.state.id_user} onChange={this.bind} required>
                        <option>Select</option>
                      {this.state.member.map((im) => {
                    return(
                      <option key={im.id} value={im.id}>{im.username}({im.id})</option>
                      )})}
                    </select>
                  Tanggal Sewa
                  <input type="date" className="form-control" name="tgl_book"
                    value={this.state.tgl_book} onChange={this.bind} required />
                  Jam Sewa Mulai
                  <input type="time" className="form-control" name="wkt_mulai"
                    value={this.state.wkt_mulai} onChange={this.bind} required />
                  Jam Sewa Selesai
                  <input type="time" className="form-control" name="wkt_selesai"
                    value={this.state.wkt_selesai} onChange={this.bind} required />
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
export default DataSewa;