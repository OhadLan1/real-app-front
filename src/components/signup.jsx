import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";

import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { createUser,user } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },

    validate: formikValidateUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
        toast("Your account is ready!👾", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/sign-in");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PageHeader
        title="Sign Up with Real App"
        description="Open a new account!"
      />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="email"
          label="Email"
          required
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          required
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />

        <Input
          type="text"
          label="Name"
          required
          {...form.getFieldProps("name")}
          error={form.touched.name && form.errors.name}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
