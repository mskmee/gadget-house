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
import { categoriesMenu, toClientsMenu } from '@/constants/footer';

const Footer = () => {
  const isLargerThan1440px = useMediaQuery({
    query: '(max-width: 1440px)',
  });

  const isLargerThan1024px = useMediaQuery({
    query: '(max-width: 1024px)',
  });

  const isLargerThan370px = useMediaQuery({
    query: '(max-width: 370px)',
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

          {!isLargerThan1024px ? (
            <>
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
            </>
          ) : (
            <>
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
              {!isLargerThan370px && (
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
              )}
            </>
          )}
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
