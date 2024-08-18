import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaFacebookF,
} from 'react-icons/fa';
import './footer.scss';
import { FaPhone } from 'react-icons/fa6';
import { useState } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //
  window.addEventListener('resize', () => {
    const windowSize = window.innerWidth;
    if (windowSize > 878 || windowSize < 350) {
      setIsMobile(false);
    } else setIsMobile(true);
  });

  return (
    <footer className="footer-wrapper">
      <div className="contact-info">
        <h2 className="logoname">GadgetHouse</h2>
        <a href="mailto:">
          <FaEnvelope /> GadgetHouse@gmail.com
        </a>
        <a href="tel:">
          <FaPhone /> (057) 333 33 33
        </a>
        <a
          href="https://www.google.co.uk/maps/place/4+Av.+des+Sciences,+91190+Gif-sur-Yvette,+France/@48.7123907,2.1632694,17z/data=!3m1!4b1!4m6!3m5!1s0x47e67f4f661d9579:0x2cf64b4a674b3120!8m2!3d48.7123872!4d2.1658443!16s%2Fg%2F11sxwy7vw9?entry=ttu"
          target="_blank"
        >
          <FaMapMarkerAlt /> Ave. Sciences, 4
        </a>
      </div>

      <div className="client-links">
        <h3>To clients</h3>
        <ul>
          <li>
            <Link to="/about">About company</Link>
          </li>
          <li>
            <Link to="/career">Career</Link>
          </li>
          <li>
            <Link to="/customer-service">Customer Service</Link>
          </li>
          <li>
            <Link to="/new-items">New items</Link>
          </li>
          <li>
            <Link to="/delivery">Delivery</Link>
          </li>
          <li>
            <Link to="/payment">Payment</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms and Conditions</Link>
          </li>
        </ul>
        {isMobile && <p className="footer-note">© 2024 GadgetHouse</p>}
      </div>

      <div className="categories">
        <h3>Categories</h3>
        <ul>
          <li>
            <Link to="/categories/smartphone">Smartphone</Link>
          </li>
          <li>
            <Link to="/categories/laptop">Laptop</Link>
          </li>
          <li>
            <Link to="/categories/tablet">Tablet</Link>
          </li>
          <li>
            <Link to="/categories/pc">PC</Link>
          </li>
          <li>
            <Link to="/categories/tvs-multimedia">TVs and Multimedia</Link>
          </li>
          <li>
            <Link to="/categories/smart-watch">Smart-watch</Link>
          </li>
          <li>
            <Link to="/categories/audio">Audio</Link>
          </li>
          <li>
            <Link to="/categories/game-console">Game console</Link>
          </li>
          <li>
            <Link to="/categories/photo-video">Photo and video</Link>
          </li>
          <li>
            <Link to="/categories/kids">KIDS</Link>
          </li>
          <li>
            <Link to="/categories/sale">SALE</Link>
          </li>
        </ul>
      </div>

      <div className="social-links">
        <h3>Contact Information</h3>
        <div className="icons">
          <FaInstagram />
          <FaPinterestP />
          <FaYoutube />
          <FaTiktok />
          <FaFacebookF />
        </div>
        {!isMobile && <p className="footer-note">© 2024 GadgetHouse</p>}
      </div>
    </footer>
  );
};

export default Footer;
