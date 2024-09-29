import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the PHP script via a POST request
      const response = await fetch('http://192.168.0.103/submit_form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Parse the JSON response from the PHP script
      const result = await response.json();

      // Handle success response
      if (response.ok) {
        console.log('Message submitted:', result);
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
        setErrorMessage(''); // Clear previous error messages
        setSuccessMessage(result.message); // Display success message
      } else {
        // Handle errors returned by the PHP script
        setErrorMessage(result.error || 'Failed to submit message');
        setSuccessMessage(''); // Clear any previous success messages
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('Error submitting message:', error);
      setErrorMessage('Failed to submit message');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-content">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </section>
  );
}

export default Contact;
