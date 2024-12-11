import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaFacebookF,
} from 'react-icons/fa';
import { mailImg, locationImg } from '@/assets/constants';
import { NavPhoneIcon } from '@/assets/icons/NavPhoneIcon';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

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
  const isLargerThan1440px = useMediaQuery({
    query: '(max-width: 1440px)',
  });
  return (
    <footer
      className={classNames(styles['footer-wrapper'], {
        'container-xxl': !isLargerThan1440px,
      })}
    >
      <div>
        <div>
          <div className={styles['contact-info']}>
            <Link to="/" className={styles['footer-logo']}>
              GadgetHouse
            </Link>
            <div>
              <a href="mailto:GadgetHouse@gmail.com">
                <img src={mailImg} alt="footer phone pic" />{' '}
                GadgetHouse@gmail.com
              </a>
              <a href="tel:+380573333333">
                <NavPhoneIcon />
                (057) 333 33 33
              </a>
              <a
                href="https://www.google.co.uk/maps/place/Hostynyy+Dvir,+Kontraktova+Square,+4,+Kyiv,+Ukrayna,+02000/@50.464881,30.5144404,17z/data=!3m1!4b1!4m6!3m5!1s0x40d4ce4026cba28f:0xb1e17e87b1141676!8m2!3d50.464881!4d30.5170153!16s%2Fg%2F11c0ptqwyv?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D"
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
              {toClientsMenu.map((item) => (
                <li key={item.id}>
                  <Link to={item.href}>{item.menuText}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles['categories']}>
            <h3>Categories</h3>
            <ul>
              {categoriesMenu.map((item) => (
                <li key={item.id}>
                  <Link to={item.href}>{item.menuText}</Link>
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
          </div>
        </div>
        <div className={styles.copyrightText}>
          <a
            href="https://teamchallenge.io/team/387/public"
            target="_blank"
            className={styles['footer-note']}
          >
            © 2024 GadgetHouse
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
