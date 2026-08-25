import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import "./Users.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const Users = () => {

    const [datas, setDatas] = useState([]);
    const [view, setView] = useState(false);
    const [userId, setUserId] = useState("");
    const [updateModal, setUpdateModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteName, setDeleteName] = useState("");

    const [userDatas, setUserDatas] = useState({
        username: "",
        email: "",
        contactNo:"",
        address: "",
        role: "",
        gender: "",
        dateOfBirth: ""
    });

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        contactNo:"",
        address: "",
        role: "",
        gender: "",
        dateOfBirth: ""
    });

    const handleViewClose = () => {
        setView(false)
        setUserDatas({
            username: "",
            email: "",
            contactNo:"",
            address: "",
            role: "",
            gender: "",
            dateOfBirth: "",
        })
    }

    const handleViewShow = async(id: any) => {
        setView(true);
        console.log(id);
        try {
            const response = await api.get(`/api/users/getUserById/${id}`);
            const data = response.data.data
            setUserDatas({
                username: data.username,
                email: data.email,
                contactNo: data.contactNo,
                address: data.address,
                role: data.role,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateClose = ()=>{
        setUpdateModal(false);
        setUserId("");
        setFormData({
            username: "",
            email: "",
            password: "",
            contactNo:"",
            address: "",
            role: "",
            gender: "",
            dateOfBirth: "",
        })
    }

    const handleUpdateShow = async(id: any)=>{
        setUpdateModal(true);
        setUserId(id);
        console.log(id);
        try {
            const response = await api.get(`/api/users/getUserById/${id}`);
            const data = response.data.data;
            setFormData({
                username: data.username,
                email: data.email,
                password: data.password,
                contactNo: data.contactNo,
                address: data.address,
                role: data.role,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e:any)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    }
    
    const handleViewPassword = ()=>{
        if(showPassword)
            setShowPassword(false);
        else
            setShowPassword(true);
    }

    const handleUpdate = async(e:any)=>{
        e.preventDefault();
        try {
            const newUpdate = await api.put(`/api/users/updateUser/${userId}`, formData);
            console.log(newUpdate.data)
            toast.success(newUpdate.data.message)
            handleUpdateClose();
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteClose = ()=>{
        setDeleteModal(false);
        setUserId("");
        setDeleteName("");
    }

    const handleDeleteShow = async(id: any)=>{
        setDeleteModal(true);
        setUserId(id);
        try {
            const response = await api.get(`/api/users/getUserById/${id}`);
            const data = response.data.data;
            setDeleteName(data.username)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async()=>{
        try {
            const deleted = await api.delete(`/api/users/deleteUser/${userId}`);
            console.log(deleted.data);
            toast.success(deleted.data.message);
            handleDeleteClose();
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        api.get("/api/users/getAllUsers").then((response)=>{
            console.log(response.data)
            setDatas(response.data.data)
        }).catch((error)=>{
            console.error(error)
        })
    },[])

    return (
    <>
        <Container className="users-container">
            <Row className="main-row">
                <Col xs={10} className="main-col">
                    <Table className="main-table">
                        <thead className="table-head">
                            <tr>
                                <th>Sl.no</th>
                                <th>User name</th>
                                <th>Email</th>
                                <th>Contact no</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {
                                datas.map((item:any, index:any)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contactNo}</td>
                                        <td className="actions-cell">
                                            <FontAwesomeIcon 
                                                className="view-icon" 
                                                icon={faEye} 
                                                onClick={() => {handleViewShow(item._id)}}
                                            />
                                            <hr></hr>
                                            <FontAwesomeIcon 
                                                className="view-icon" 
                                                icon={faPen} 
                                                onClick={() => {handleUpdateShow(item._id)}}
                                            />
                                            <hr></hr>
                                            <FontAwesomeIcon 
                                                className="view-icon" 
                                                icon={faTrash} 
                                                onClick={() => {handleDeleteShow(item._id)}}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* View modal */}
            <Modal show={view} onHide={handleViewClose}>
                <Modal.Header closeButton className="view-header">
                    <Modal.Title>{userDatas.username}'s Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>:</td>
                                <td>{userDatas.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{userDatas.email}</td>
                            </tr>
                            <tr>
                                <td>Contact no</td>
                                <td>:</td>
                                <td>{userDatas.contactNo}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td>{userDatas.address}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>:</td>
                                <td>{userDatas.role}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>:</td>
                                <td>{userDatas.gender}</td>
                            </tr>
                            <tr>
                                <td>Date of birth</td>
                                <td>:</td>
                                <td>{userDatas.dateOfBirth}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>

            {/* Update modal */}
            <Modal show={updateModal} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="updateForm">
                        <Table>
                            <tbody>
                                <tr>
                                    <td className="label">Username</td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            placeholder="Enter Username"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Email</td>
                                    <td>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            placeholder="Enter email"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Password</td>
                                    <td>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"} 
                                            name="password"
                                            value={formData.password}
                                            placeholder="Enter new password"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>    
                                        <button 
                                            type="button" 
                                            id="show-pass" 
                                            className="show-pass"
                                            onClick={handleViewPassword}
                                            style={{
                                                border: "none",
                                                backgroundColor:"white"
                                            }}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}/>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Contact no</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            placeholder="Enter contact no"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Address</td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            placeholder="Enter address"
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Role</td>
                                    <td>
                                        <Form.Select 
                                            name="role" 
                                            id="role" 
                                            className="role" 
                                            onChange={handleInputChange} 
                                            value={formData.role}
                                        >
                                            <option value="Select">Select</option>
                                            <option value="Java Developer">Java Developer</option>
                                            <option value="React Developer">React Developer</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="HR Manager">HR Manager</option>
                                            <option value="Software Testing">Software Testing</option>
                                            <option value="UI/UX Designer">UI/UX Designer</option>
                                            <option value="Devops Engineer">Devops Engineer</option>
                                            <option value="Digital Marketting">Digital Marketting</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Gender</td>
                                    <td>
                                        <Form.Check
                                            inline
                                            label="male"
                                            name="gender"
                                            type="radio"
                                              id="inline-radio-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="female"
                                            name="gender"
                                            type="radio"
                                            id="inline-radio-2"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label">Date of birth</td>
                                    <td>
                                        <Form.Control
                                            type="date" 
                                            name="dateOfBirth" 
                                            id="dob" 
                                            onChange={handleInputChange} 
                                            value={formData.dateOfBirth}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update User
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete modal */}
            <Modal show={deleteModal} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure want delete user {deleteName}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </>
    )
}

export default Users
