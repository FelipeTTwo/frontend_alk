import styles from "../styles/income.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const Income = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [operations, setOperations] = useState([]);
  const [idOperation, setIdOperation] = useState([]);
  const { upload, setUpload, idUser } = useContext(UserContext);

  useEffect(() => {
    const getOperations = async () => {
      const URI = `https://alkemyapp.herokuapp.com/operations/incomes/${idUser}`;
      const res = await axios.get(URI);
      setOperations(res.data);
      setUpload(false);
    };

    getOperations();
  }, [upload]);

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setIdOperation(id);
  };

  const handleUpdate = (id) => {
    setShowEditModal(true);
    setIdOperation(id);
  };

  return (
    <>
      <div className={styles["income-content"]}>
        <div className={styles.title}>
          <span>Income</span>
        </div>
        <ul className={styles["responsive-table"]}>
          <li className={styles["table-header"]}>
            <div className={`${styles["col"]} ${styles["col-1"]}`}>ID</div>
            <div className={`${styles["col"]} ${styles["col-2"]}`}>UNDER</div>
            <div className={`${styles["col"]} ${styles["col-3"]}`}>DATE</div>
            <div className={`${styles["col"]} ${styles["col-4"]}`}>AMOUNT</div>
            <div className={`${styles["col"]} ${styles["col-5"]}`}>ACTION</div>
          </li>
          {operations.map((operation) => (
            <li className={styles["table-row"]} key={operation.ID_operation}>
              <div
                className={`${styles["col"]} ${styles["col-1"]}`}
                data-label="ID"
              >
                {operation.ID_operation}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-2"]}`}
                data-label="Under"
              >
                {operation.under}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-3"]}`}
                data-label="Date"
              >
                {operation.updatedAt}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-4"]}`}
                data-label="Amount"
              >
                <span>$</span>
                {operation.amount}
              </div>
              <div
                className={`${styles["col"]} ${styles["col-5"]}`}
                data-label="action"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={styles.delete}
                  onClick={() => handleDelete(operation.ID_operation)}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={styles.update}
                  onClick={() => handleUpdate(operation.ID_operation)}
                />
              </div>
            </li>
          ))}
        </ul>

        <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          idOperation={idOperation}
        />
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          idOperation={idOperation}
        />
      </div>
    </>
  );
};

export default Income;
