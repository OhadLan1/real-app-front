import { useFormik } from "formik";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import Joi from "joi";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useState } from "react";
import { createCard } from "../services/cardService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateCard() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;

        if (bizImage) {
          body.bizImage = bizImage;
        }

        await createCard(body);
        toast("you create your own card!!😁", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title="Create Card" description="Create Card" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="text"
          label="Name"
          required
          {...form.getFieldProps("bizName")}
          error={form.touched.bizName && form.errors.bizName}
        />

        <Input
          type="text"
          label="Description"
          required
          {...form.getFieldProps("bizDescription")}
          error={form.touched.bizDescription && form.errors.bizDescription}
        />

        <Input
          type="text"
          label="Address"
          required
          {...form.getFieldProps("bizAddress")}
          error={form.touched.bizAddress && form.errors.bizAddress}
        />

        <Input
          type="text"
          label="Phone"
          required
          {...form.getFieldProps("bizPhone")}
          error={form.touched.bizPhone && form.errors.bizPhone}
        />

        <Input
          type="text"
          label="Image"
          {...form.getFieldProps("bizImage")}
          error={form.touched.bizImage && form.errors.bizImage}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            create card
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateCard;
