import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import "./Sewa.css"

class Sewa extends Component {
  constructor() {
    super();
    this.state = {
        sewa:[],
        lapangan:[],
        id_sewa:"",
        id_lapangan:"",
        nama_lapangan:"",
        id_user:"",
        username:"",
        tgl_book:"",
        wkt_mulai:"",
        wkt_selesai:"",
        durasi:"",
        biaya:"",
        status:"",
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

    Add = () => {
        
        $("#modal_member").modal("show");
        let id_user = JSON.parse(localStorage.getItem('id'))

        this.setState({
          action: "insert",
          id: "",
          id_lapangan: "",
          id_user: id_user,
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

      Drop = (id) => {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
          // $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/sewa/drop/" + id;
          axios.delete(url)
          .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.Mysewa();
          })
          .catch(error => {
            console.log(error);
          });
        }
      }

    Mysewa = () => {
    let id = JSON.parse(localStorage.getItem('id'))
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/myorder/" + id;
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

    componentDidMount = () => {
      this.Mysewa(); 
      this.getLapangan();    
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
        this.Mysewa();
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
      return(
          <div className="box" style={{marginTop: "3%", marginBottom:"2%"}}>
  <div className="container-fluid">
      <center>  
          <div className="input-group mb-3 col-sm-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-search" />
              </span>
            </div>
            <input type="date" className="form-control" name="tgl"
            onChange={this.bind} value={this.state.tgl} onKeyUp={this.search}
            placeholder="Pencarian..." />
          </div>
          <button className="btn btn-outline-success my-2 col-sm-6"  onClick={this.Add}>
                <span className="#" ></span> Pesan Lapangan?
          </button>
      </center>
    <div className="row">
    { this.state.sewa.map((item) => {
                    return(
      <div className="col-lg-4" key={item.id_sewa} style={{marginTop:"2%"}}>
        <div className="card text-center shadow">
          <div className="card-header bg-light">
          <i className="fa fa-soccer-ball-o fa-2x" aria-hidden="true" />
            <h4 className="text-success">{item.nama_lapangan}</h4>
          </div>
          <div className="card-body">
          <div className="text">
            <span>
                {item.username}<br/>
                Disewa pada tanggal : {item.tgl_book}<br/>
                Pada jam : {item.wkt_mulai} <br/>
                sampai : {item.wkt_selesai} <br/>
                Durasi : {item.durasi} jam<br/> 
                Status Penyewaan : {item.status} <br/>
                Biaya Penyewaan : {item.biaya}
            </span>
          </div>
          {item.status === "done" ? <div style={{fontWeight:"400", color:"green"}}>DONE</div> :
          <div>
          <button className="m-1 btn btn-block btn-outline-info" onClick={() => this.Edit(item)}>
            <span>Edit</span>
          </button>
          <button className="m-1 btn btn-block btn-outline-danger" onClick={() => this.Drop(item.id_sewa)}>
            <span>Cancel</span>
          </button>
          </div>
          }
          </div>
        </div>
      </div>
);
})}


      {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-instagram fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Instagram</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-twitter fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Twitter</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-facebook fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Facebook</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-pinterest-p fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Pinterest</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-google-plus fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Google</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <div className="box-part text-center">
          <i className="fa fa-github fa-3x" aria-hidden="true" />
          <div className="title">
            <h4>Github</h4>
          </div>
          <div className="text">
            <span>
              Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum
              decore te sed. Elitr scripta ocurreret qui ad.
            </span>
          </div>
          <a href="#">Learn More</a>
        </div>
      </div> */}
    </div>
  </div>

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
      );
    }
}
export default Sewa;