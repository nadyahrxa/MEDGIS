import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
const EditUser = () => {
  const [Nama, setNama] = useState("");
  const [Jenis, setJenis] = useState("");
  const [Kelas, setKelas] = useState("");
  const [Kapasitas, setKapasitas] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [Telepon, setTelepon] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUsersById();
  }, [id]);  // Menambahkan 'id' ke array dependency

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        Nama,
        Jenis,
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

  const getUsersById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      if (response.data) {
        setNama(response.data.Nama || "");
        setJenis(response.data.Jenis || "");
        setKelas(response.data.Kelas || "");
        setKapasitas(response.data.Kapasitas || "");
        setAlamat(response.data.Alamat || "");
        setTelepon(response.data.Telepon || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
                <div className="has-text-centered mb-4">
                    <img src="" alt="" style={{ width: '100px' }} /> 
                    <h1 className="title is-4"> Edit Rumah Sakit</h1>
                </div>
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Nama}
                onChange={(e) => setNama(e.target.value)}
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
                onChange={(e) => setKelas(e.target.value)}
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
                onChange={(e) => setKapasitas(e.target.value)}
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
                onChange={(e) => setAlamat(e.target.value)}
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
                onChange={(e) => setTelepon(e.target.value)}
                placeholder="Telepon"
              />
            </div>
          </div>
          <div className="field">
            <button type='submit' className='button is-success'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
