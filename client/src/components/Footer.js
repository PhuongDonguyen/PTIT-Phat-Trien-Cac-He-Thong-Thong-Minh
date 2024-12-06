import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>
                            We are a company dedicated to providing the best services and products for our customers. Our mission is to improve lives through innovative solutions.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/about" className="text-white">About</a></li>
                            <li><a href="/services" className="text-white">Services</a></li>
                            <li><a href="/contact" className="text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p>
                            Email: <a href="mailto:info@company.com" className="text-white">info@company.com</a>
                        </p>
                        <p>
                            Phone: <a href="tel:+123456789" className="text-white">+123 456 789</a>
                        </p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
