import styles from "../styles/addOperation.module.css";
import axios from "axios";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { ToastContainer } from "react-toastify";
import { alertSuccess, alertError } from "../utilities/Alerts";

const AddOperation = () => {
  const { setUpload, idUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();

  const onSubmit = async (data) => {
    try {
      const URI = "https://alkemyapp.herokuapp.com/operations/create";
      const operation = {
        under: data.under,
        amount: data.amount,
        type: data.radio,
        ID_user: idUser,
      };
      axios.post(URI, operation);
      setUpload(true);
      alertSuccess("Operation has been successfully created");
    } catch (error) {
      alertError("error");
    }
  };

  return (
    <div className={styles["add-content"]}>
      <div className={styles.title}>
        <span>Add Operation</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["input-box"]}>
          <textarea
            placeholder="Under"
            type="text"
            cols="30"
            rows="4"
            name="under"
            {...register("under", {
              required,
            })}
          />
        </div>
        {errors.under && <FormError error={errors.under} />}
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
        {errors.amount && <FormError error={errors.amount} />}

        <div className={styles["container-radio"]}>
          <div className={styles.radio}>
            <input
              id="radio-1"
              name="radio"
              type="radio"
              value="income"
              {...register("radio", {
                required,
              })}
            />
            <label htmlFor="radio-1" className={styles["radio-label"]}>
              Income
            </label>
          </div>

          <div className={styles.radio}>
            <input
              id="radio-2"
              name="radio"
              type="radio"
              value="expense"
              {...register("radio", {
                required,
              })}
            />
            <label htmlFor="radio-2" className={styles["radio-label"]}>
              Expense
            </label>
          </div>
        </div>
        {errors.radio && <FormError error={errors.radio} />}

        <span className={styles["button-box"]}>
          <button>Add</button>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddOperation;
