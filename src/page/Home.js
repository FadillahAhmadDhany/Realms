import React,{Component} from "react";
import axios from "axios";



class Home extends Component {
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
    this.getLapangan();      
  }

  render(){
    return (
      <div>
        <header className="parallax py-5 mb-5">
        <div className="caption">
          <span className="borderless" style={{ backgroundColor: "transparent", fontSize: "35px", color: "#f7f7f7", fontFamily:"Candara"}}>REALMS</span><br/>
          <span className="borderless" style={{ backgroundColor: "transparent", fontSize: "20px", color: "#f7f7f7"}}>Cheaper but Better</span>
        </div>
  </header>
  {/* Page Content */}
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-8 mb-5">
        <h2>Apa Yang Kami Lakukan</h2>
        <hr />
        <p>
          Kami menampilkan tempat persewaan lapangan futsal yang ada di dekat anda yang sudah terdaftar di aplikasi kami.
        </p>
        <h2>Cara Memesan</h2>
        <hr />
        <p>
          - Registrasi bila belum memiliki akun<br/>
          - Pilih tempat yang tersedia<br/>
          - Pilih tanggal peminjaman<br/>
          - Konfirmasi pembayaran
        </p>
      </div>
      <div className="col-md-4 mb-5">
        <h2>Contact Us</h2>
        <hr />
        <address>
          <strong>Realms</strong>
          <br />
          2271 Kedungkandang
          <br />
          Sawojajar, Malang
          <br />
        </address>
        <address>
          No Telp: 083216521828
          <br />
          Email: <a href="mailto:#">dhragon22@gmail.com</a>
        </address>
      </div>
    </div>
    {/* /.row */}
    <h2 className="text-center">Lapangan Yang Tersedia</h2>
    <hr/>
    <div className="row">
    { this.state.lapangan.map((item) => {
                    return(
      <div className="col-md-4 mb-5" key={item.id}>
        <div className="card h-100 shadow">
          <img className="card-img-top" src={"http://localhost/lapangan/public/images/" + item.gambar} alt="kosong" />
          <div className="card-body">
            <h4 className="card-title">{item.nama}</h4>
            <p className="card-text">
            Lapangan ini memiliki panjang 25m dan lebar 15m.<br/>
              Lapangan ini dilengkapi dengan fasilitas papan skor, 1 bola futsal,<br/>
              dan lapangan ini berbahan rumput sintetik.<br/>
              harga : Rp.{item.harga}
            </p>
          </div>
          <div className="card-footer bg-light">
            <a className="btn btn-outline-info btn-block" href="/mysewa">
            Pesan
            </a>
          </div>
        </div>
      </div>
      );
    })}
    </div>
    {/* /.row */}
  </div>
  {/* /.container */}
  {/* Footer */}
  
      </div>
    );
  }
}

export default Home;
