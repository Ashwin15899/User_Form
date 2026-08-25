import "./UserForm.scss";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const UserForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        contactNo:"",
        address: "",
        role: "",
        gender: "",
        dateOfBirth: "",
        acknowledge: false
    });

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

    const createUser = async(e: any)=>{
        e.preventDefault();

        if (!formData.acknowledge) {
            toast.error("Please accept the terms and conditions");
            return;
        }
        
        try {
            const newUser = await api.post("/api/users/createUser", formData);
            console.log(newUser.data);
            toast.success(newUser.data.message)
            setFormData({
                username: "",
                email: "",
                password: "",
                contactNo:"",
                address: "",
                role: "",
                gender: "",
                dateOfBirth: "",
                acknowledge: false
            })    
        } catch (error) {
            console.error(error)
        }
    }

    return (
    <>
    <Container className="form-container">
        <form className="main-form" onSubmit={createUser}>
            <h5>User registration</h5>
            <table className="form-table">
                <tbody>
                {/* Username */}
                <tr>
                    <td><label htmlFor="username">User name</label></td>
                    <td>
                        <input 
                            placeholder="Enter username" 
                            id="username" 
                            name="username" 
                            type="text"
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </td>
                </tr>

                {/* Email */}
                <tr>
                    <td><label htmlFor="email">Email</label></td>
                    <td>
                        <input
                            placeholder="Enter email" 
                            id="email" 
                            name="email" 
                            type="email"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </td>
                </tr>

                {/* Password */}
                <tr>
                    <td><label htmlFor="password">Password</label></td>
                    <td>
                        <div className="pwd-cell">
                            <input 
                                placeholder="Enter password"
                                id="password" 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                onChange={handleInputChange}
                                value={formData.password}
                            />
                            <button type="button" id="show-pass" className="show-pass" onClick={handleViewPassword}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />   
                            </button>
                        </div>
                    </td>
                </tr>

                {/* Contact no */}
                <tr>
                    <td><label htmlFor="contact">Contact no</label></td>
                    <td>
                        <input 
                            placeholder="Enter contact no"
                            id="contact" 
                            type="number" 
                            name="contactNo"
                            onChange={handleInputChange}
                            value={formData.contactNo}
                        />
                    </td>
                </tr>

                {/* Address */}
                <tr>
                    <td><label htmlFor="address">Address</label></td>
                    <td>
                        <textarea 
                            placeholder="Enter address"
                            id="address" 
                            rows={4} 
                            name="address"
                            onChange={handleInputChange}
                            value={formData.address}
                        >
                        </textarea>
                    </td>
                </tr>

                {/* Role */}
                <tr>
                    <td><label htmlFor="role">Role</label></td>
                    <td>
                        <select name="role" id="role" className="role" onChange={handleInputChange} value={formData.role}>
                            <option value="Select">Select</option>
                            <option value="Java Developer">Java Developer</option>
                            <option value="React Developer">React Developer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Software Testing">Software Testing</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Devops Engineer">Devops Engineer</option>
                            <option value="Digital Marketting">Digital Marketting</option>
                        </select>
                    </td>
                </tr>

                {/* Gender */}
                <tr>
                    <td><label htmlFor="gender">Gender</label></td>
                    <td>
                        <input type="radio" value="male" id="male" name="gender" onChange={handleInputChange}/>
                        <label htmlFor="male">Male</label>
                        <input type="radio" value="female" id="female" name="gender" onChange={handleInputChange}/>
                        <label htmlFor="female">Female</label>
                    </td>
                </tr>

                {/* Date of birth */}
                <tr>
                    <td><label htmlFor="dob">Date of birth</label></td>
                    <td>
                        <input 
                            type="date" 
                            name="dateOfBirth" 
                            id="dob" 
                            onChange={handleInputChange} 
                            value={formData.dateOfBirth}
                        />
                    </td>
                </tr>

                {/* Acknowledgement */}
                <tr className="checkbox">
                    <td colSpan={2} className="checkbox-cell"> 
                        <input 
                            type="checkbox" 
                            id="acknowledge" 
                            className="acknowledge" 
                            name="acknowledge" 
                            checked={formData.acknowledge}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    acknowledge: e.target.checked
                                });
                            }}
                        />
                        <label htmlFor="acknowledge">I hereby agree with the terms and conditions of the company</label>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="submit-btn">
                <button type="submit" id="submit">Submit form</button>
            </div>
        </form>
    </Container>
    </>
    )
}

export default UserForm;
