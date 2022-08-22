import styles from "../styles/management.module.css";
import axios from "axios";
import profile from "../images/profile_1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faMoneyBillTransfer,
  faRightFromBracket,
  faMoneyBillTrendUp,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faAccusoft } from "@fortawesome/free-brands-svg-icons";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Management = () => {
  const [siderOn, setSiderOn] = useState(false);
  const logout = async () => {
    const URI = "https://alkemyapp.herokuapp.com/users/logout";
    await axios({
      method: "get",
      url: URI,
      withCredentials: true,
    });
  };

  return (
    <>
      <div className={styles.body}>
        <nav className={siderOn ? `${styles.nav} ${styles.close}` : styles.nav}>
          <div className={styles["logo-name"]}>
            <div className={styles["logo-image"]}>
              <FontAwesomeIcon
                icon={faAccusoft}
                style={{ fontSize: "25px", color: "#1a1a1a" }}
              />
            </div>

            <span className={styles["logo_name"]}>Management</span>
          </div>

          <div className={styles["menu-items"]}>
            <ul className={styles["nav-links"]}>
              <li>
                <Link to="/management">
                  <FontAwesomeIcon icon={faHouse} className={styles.icons} />
                  <span className={styles["link-name"]}>Home</span>
                </Link>
              </li>
              <li className="">
                <Link to="/management/income">
                  <FontAwesomeIcon
                    icon={faMoneyBillTrendUp}
                    className={styles.icons}
                  />
                  <span className={`${styles["link-name"]}`}>Income</span>
                </Link>
              </li>
              <li>
                <Link to="/management/expense">
                  <FontAwesomeIcon
                    icon={faMoneyBillTransfer}
                    className={styles.icons}
                  />
                  <span className={styles["link-name"]}>Expense</span>
                </Link>
              </li>
              <li>
                <Link to="/management/add">
                  <FontAwesomeIcon
                    icon={faFolderPlus}
                    className={styles.icons}
                  />
                  <span className={styles["link-name"]}>Add</span>
                </Link>
              </li>
            </ul>
            <ul className={styles["logout-mod"]}>
              <li>
                <a href="/">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className={styles.icons}
                  />
                  <span className={styles["link-name"]} onClick={logout}>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <section className={styles.content}>
          <div className={styles.top}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                setSiderOn(!siderOn);
              }}
              className={styles["sidebar-toggle"]}
            />
            <img src={profile} alt="perfil" />
          </div>
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Management;
