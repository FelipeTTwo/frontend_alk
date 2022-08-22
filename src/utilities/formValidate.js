export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: "fill the field",
        },
        patternEmail: {
            value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Wrong email format",
        },
        patternPassword: {
            value:
                /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&@])\S{8,50}$/,
            message: "Wrong password format [A-z-1-*@]",
        },
        minLength: {
            value: 12,
            message: "The password must contain at least 8 characters",
        },
        validateTrim: {

            trim: (v) => {
                if (!v.trim()) {
                    return "fill the field";
                }
                return true;
            },
        },
        validateEquals(getValues) {
            return {
                equals: (v) =>
                    v === getValues("password") ||
                    "passwords do not match",

            }
        },

    }
}