import React, { useState } from 'react';
import './styles/Contact.css';  // make sure this line correctly points to your CSS file
import { Socket } from 'socket.io-client';

function ContactForm({socket}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        alert("Form submitted. Check the console for details.");
        socket.emit('form_submit',formData)
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
        <h1>Contact Us</h1>
        <div className="form-inner">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </form>
    );
}

export default ContactForm;
