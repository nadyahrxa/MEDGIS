import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(
        () => JSON.parse(localStorage.getItem("currentPage")) || 1 // Initialize from localStorage
    );
    const [usersPerPage] = useState(10); 

    useEffect(() => {
        getUsers(currentPage);
        // Store the current page in localStorage whenever it changes
        localStorage.setItem("currentPage", JSON.stringify(currentPage));
    }, [currentPage]);

    const getUsers = async (page) => {
        const response = await axios.get(`http://localhost:5000/users?page=${page}`);
        console.log(response.data); 
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:5000/users/${id}`);
                getUsers(currentPage); // Fetch users without changing the current page
            } catch (error) {
                console.log(error);
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.Nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.Kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (number) => {
        setCurrentPage(number);
        window.scrollTo(0, 0); // Scroll to top of the page
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-full">
                <div className="has-text-centered mb-4">
                    <img src="" alt="" style={{ width: '100px' }} /> 
                    <h1 className="title is-4">Daftar Rumah Sakit</h1>
                </div>

                {/* Button and Search Bar Container */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '86%', margin: '0 auto', marginBottom: '1rem' }}>
                    <Link to={`add`} className="button is-success">
                        Add New
                    </Link>
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="input" 
                        style={{ width: '300px', marginLeft: '10px' }} // Adjust width as needed
                    />
                </div>

                <table className="table is-striped" style={{ width: '86%', margin: '0 auto' }}>
                    <colgroup>
                        <col style={{ width: '5%' }} />  {/* No */}
                        <col style={{ width: '20%' }} /> {/* Nama */}
                        <col style={{ width: '10%' }} /> {/* Kelas */}
                        <col style={{ width: '10%' }} /> {/* Kapasitas */}
                        <col style={{ width: '35%' }} /> {/* Alamat */}
                        <col style={{ width: '15%' }} /> {/* Telepon */}
                        <col style={{ width: '10%' }} /> {/* Actions */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th align="center">No</th>
                            <th align="center">Nama</th>
                            <th align="center">Kelas</th>
                            <th align="center">Kapasitas</th>
                            <th align="center">Alamat</th>
                            <th align="center">Telepon</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td align="center">{index + 1 + indexOfFirstUser}</td>
                                <td align="center">{user.Nama}</td>
                                <td align="center">{user.Kelas}</td>
                                <td align="center">{user.Kapasitas}</td>
                                <td align="center">{user.Alamat}</td>
                                <td align="center">{user.Telepon}</td>
                                <td align="center">
                                    <Link 
                                        to={`edit/${user.id}`} 
                                        className="button is-small is-info"
                                    >
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button 
                                    onClick={() => handlePageChange(number)} 
                                    className={`pagination-link ${currentPage === number ? 'is-current' : ''}`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default UserList;
