import styles from "../styles/editForm.module.css";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";

const EditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();

  const onSubmit = async (data) => {
    try {
      console.log("enviado");
    } catch (error) {
      console.log("error");
    }
  };

  return (
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
      {errors.email && <p>error email</p>}

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
      {errors.password && <p>error password</p>}
      <div className={styles.button}>
        <button
          id="close"
          className={styles.cancel}
          // onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button className={styles.send}>Send</button>
      </div>
    </form>
  );
};

export default EditForm;
