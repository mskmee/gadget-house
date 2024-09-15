import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaFacebookF,
} from 'react-icons/fa';
import { mailImg, phoneWhiteImg, locationImg } from '@/assets/constants';

const toClientsMenu = [
  { id: 1, menuText: 'About company', href: '/about-us' },
  { id: 2, menuText: 'Career', href: '/career' },
  { id: 3, menuText: 'Customer Service', href: '/customer-service' },
  { id: 4, menuText: 'New items', href: '/new-items' },
  { id: 5, menuText: 'Delivery', href: '/delivery' },
  { id: 6, menuText: 'Payment', href: '/payment' },
  { id: 7, menuText: 'Privacy policy', href: '/privacy-policy' },
];

const categoriesMenu = [
  { id: 1, menuText: 'Smartphone', href: '/categories/smartphone' },
  { id: 2, menuText: 'Laptop', href: '/categories/laptop' },
  { id: 3, menuText: 'Tablet', href: '/categories/tablet' },
  { id: 4, menuText: 'PC', href: '/categories/pc' },
  {
    id: 5,
    menuText: 'TVs and Multimedia',
    href: '/categories/tvs-and-multimedia',
  },
  { id: 6, menuText: 'Smart-watch', href: '/categories/smart-watch' },
  { id: 7, menuText: 'Audio', href: '/categories/audio' },
  {
    id: 8,
    menuText: 'Game console',
    href: '/categories/game-console',
  },
  { id: 9, menuText: 'Photo and video', href: '/categories/photo-and-video' },
  { id: 10, menuText: 'KIDS', href: '/categories/kids' },
];

const Footer = () => {
  return (
    <footer className={styles['footer-wrapper']}>
      <div className={styles['contact-info']}>
        <a href="/" className={styles['footer-logo']}>
          GadgetHouse
        </a>
        <div>
          <a href="mailto:GadgetHouse@gmail.com">
            <img src={mailImg} alt="footer phone pic" /> GadgetHouse@gmail.com
          </a>
          <a href="tel:+380573333333">
            <img src={phoneWhiteImg} alt="footer phone pic" />
            (057) 333 33 33
          </a>
          <a
            href="https://www.google.co.uk/maps/place/4+Av.+des+Sciences,+91190+Gif-sur-Yvette,+France/@48.7123907,2.1632694,17z/data=!3m1!4b1!4m6!3m5!1s0x47e67f4f661d9579:0x2cf64b4a674b3120!8m2!3d48.7123872!4d2.1658443!16s%2Fg%2F11sxwy7vw9?entry=ttu"
            target="_blank"
          >
            <img src={locationImg} alt="footer phone pic" />
            Contract Square, 4, Kyiv, Ukraine, 02000
          </a>
        </div>
      </div>

      <div className={styles['client-links']}>
        <h3>To clients</h3>
        <ul>
          {toClientsMenu?.map((item) => (
            <li key={item?.id}>
              <Link to={item?.href}>{item?.menuText}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['categories']}>
        <h3>Categories</h3>
        <ul>
          {categoriesMenu?.map((item) => (
            <li key={item?.id}>
              <Link to={item?.href}>{item?.menuText}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['social-links']}>
        <h3>Contact Information</h3>
        <div className={styles['icons']}>
          <a href="http://instagram.com" target="_blank">
            <FaInstagram size="22px" />
          </a>
          <a href="http://pinterest.com" target="_blank">
            <FaPinterestP size="22px" />
          </a>
          <a href="http://youtube.com" target="_blank">
            <FaYoutube size="22px" />
          </a>
          <a href="http://tiktok.com" target="_blank">
            <FaTiktok size="22px" />
          </a>
          <a href="http://facebook.com" target="_blank">
            <FaFacebookF size="22px" />
          </a>
        </div>
        <a
          href="https://teamchallenge.io/team/387/public"
          target="_blank"
          className={styles['footer-note']}
        >
          © 2024 GadgetHouse
        </a>
      </div>
    </footer>
  );
};

export default Footer;
