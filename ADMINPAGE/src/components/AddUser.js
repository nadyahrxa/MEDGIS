import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
const [Nama, setNama] = useState("");
const [Kelas, setKelas] = useState("");
const [Kapasitas, setKapasitas] = useState("");
const [Alamat, setAlamat] = useState("");
const [Telepon, setTelepon] = useState("");
const navigate = useNavigate();

const saveUser = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/users", {
            Nama,
            Kelas,
            Kapasitas,
            Alamat,
            Telepon
        });
        navigate("/");
    } catch (error) {
      console.log(error);
    }
};

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
                <div className="has-text-centered mb-4">
                    <img src="" alt="" style={{ width: '100px' }} /> 
                    <h1 className="title is-4">Menambahkan Rumah Sakit</h1>
                </div>
            <form onSubmit={saveUser}>
               <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={Nama}
                        onChange={(e)=> setNama(e.target.value)}
                        placeholder="Nama" 
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Kelas</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={Kelas}
                        onChange={(e)=> setKelas(e.target.value)}
                        placeholder="Kelas" 
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Kapasitas</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input"
                        value={Kapasitas}
                        onChange={(e)=> setKapasitas(e.target.value)} 
                        placeholder="Kapasitas"
                         />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Alamat</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input"
                        value={Alamat}
                        onChange={(e)=> setAlamat(e.target.value)} 
                        placeholder="Alamat" 
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Telepon</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={Telepon}
                        onChange={(e)=> setTelepon(e.target.value)}
                        placeholder="Telepon" />
                    </div>
                </div>
                <div className="field">
                   <button type='submit' className='button is-success'>
                      Save
                   </button> 
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser; 