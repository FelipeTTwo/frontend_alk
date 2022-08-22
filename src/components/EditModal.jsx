import styles from "../styles/editModal.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { formValidate } from "../utilities/formValidate";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { alertInfo } from "../utilities/Alerts";

const EditModal = ({ showEditModal, setShowEditModal, idOperation }) => {
  const { setUpload } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();

  const onSubmit = async (data) => {
    try {
      const URI = `https://alkemyapp.herokuapp.com/operations/update/${idOperation}`;
      await axios.put(URI, data);
      setUpload(true);
      setShowEditModal(false);
      alertInfo("Operation has been successfully updated");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <section
      className={
        showEditModal ? `${styles.section} ${styles["active"]}` : styles.section
      }
    >
      <div className={`${styles["popup-outer"]}`}>
        <div className={styles["popup-box"]}>
          <div className={styles["box-header"]}>
            <p>Edit</p>
            <FontAwesomeIcon
              icon={faRectangleXmark}
              className={styles.close}
              onClick={() => setShowEditModal(false)}
            />
          </div>

          <div className={styles["box-body"]}>
            <div className="text">
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["input-box"]}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Under"
                    name="under"
                    {...register("under", {
                      required,
                    })}
                  />
                </div>
                {errors.under && <p>error email</p>}

                <div className={styles["input-box"]}>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    {...register("amount", {
                      required,
                    })}
                  />
                </div>
                {errors.amount && <p>error password</p>}
                <div className={styles.button}>
                  <button
                    type="button"
                    className={styles.cancel}
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button className={styles.send}>Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EditModal;
