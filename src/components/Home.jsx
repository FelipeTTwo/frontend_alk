import styles from "../styles/home.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faCircleDollarToSlot,
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Home = () => {
  const [operations, setOperations] = useState([]);
  const [maxIncome, setMaxIncome] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const { idUser, setIdUser } = useContext(UserContext);

  useEffect(() => {
    readToken();
  }, []);

  useEffect(() => {
    if (idUser) {
      getOperations();
    }
  }, [idUser]);

  useEffect(() => {
    getMaxAmountIncome();
    getMaxAmountExpense();

    setBalance((maxIncome - maxExpense).toFixed(2));
  }, [operations]);

  const readToken = async () => {
    const res = await axios({
      method: "get",
      url: "https://alkemyapp.herokuapp.com/users",
      withCredentials: true,
    });
    if (res.data.isToken) {
      setIdUser(res.data.idUser);
    }
  };

  const getOperations = async () => {
    const URI = `https://alkemyapp.herokuapp.com/operations/getAll/${idUser}`;
    const res = await axios.get(URI);
    setOperations(res.data);
  };

  const getMaxAmountIncome = () => {
    if (operations.length !== 0) {
      const incomes = operations
        .filter((operation) => operation.type === "income")
        .map((item) => item.amount);

      if (incomes.length !== 0) {
        const max = incomes.reduce((acc, current) => acc + current);
        setMaxIncome(parseFloat(max.toFixed(2)));
      }
    }
  };

  const getMaxAmountExpense = () => {
    if (operations.length !== 0) {
      const expenses = operations
        .filter((operation) => operation.type === "expense")
        .map((item) => item.amount);

      if (expenses.length !== 0) {
        const max = expenses.reduce((acc, current) => acc + current);
        setMaxExpense(parseFloat(max.toFixed(2)));
      }
    }
  };

  return (
    <div className={styles["home-content"]}>
      <div className={styles["container-1"]}>
        <div className={styles.cards}>
          <div
            className={`${styles.card} ${styles["border-left-primary"]} ${styles.shadow} ${styles["h-100"]}  `}
          >
            <div className={styles["card-body"]}>
              <div>
                <div className={styles["card-title"]}>Total income</div>
                <p className={styles["card-text"]}>$ {maxIncome}</p>
              </div>
              <div className={styles["card-icon"]}>
                <FontAwesomeIcon icon={faSackDollar} />
              </div>
            </div>
          </div>
          <div
            className={`${styles.card} ${styles["border-left-primary"]} ${styles.shadow} ${styles["h-100"]} `}
          >
            <div className={styles["card-body"]}>
              <div>
                <div className={styles["card-title"]}>Total expense</div>
                <p className={styles["card-text"]}>$ {maxExpense}</p>
              </div>
              <div className={styles["card-icon"]}>
                <FontAwesomeIcon icon={faCircleDollarToSlot} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styles.circular} ${styles["circular-card"]}  ${styles.shadow}   `}
        >
          <div className={styles["circular-title"]}>Current balance</div>
          <div
            className={
              balance < 0
                ? `${styles["circular-progress"]} ${styles["negative"]}`
                : `${styles["circular-progress"]}`
            }
          >
            <span
              className={
                balance < 0
                  ? `${styles["progress-value"]} ${styles["negative"]}`
                  : `${styles["progress-value"]}`
              }
            >
              {" "}
              {balance}
            </span>
          </div>

          <span className={styles["circular-text"]}>I & E</span>
        </div>
      </div>

      <div className={styles["container-2"]}>
        <ul className={styles["responsive-table"]}>
          <li className={styles["table-header"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>I/E</div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>DATE</div>
            <div className={`${styles["col"]} ${styles["col-3"]}`}>TYPE</div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>AMOUNT</div>
          </li>
          {operations.map((operation) => (
            <li className={styles["table-row"]} key={operation.ID_operation}>
              <div
                className={`${styles["col"]} ${styles["col-1"]}`}
                data-label="ID"
              >
                {operation.type === "income" ? (
                  <FontAwesomeIcon
                    icon={faArrowTrendUp}
                    className={styles["icon-income-row"]}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    className={styles["icon-expense-row"]}
                  />
                )}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-2"]}`}
                data-label="Date"
              >
                {operation.updatedAt}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-3"]}`}
                data-label="Type"
              >
                {operation.type}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-4"]}`}
                data-label="Amount"
              >
                <span>$</span>
                {operation.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
