import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";

import css from "../ContactForm/ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be 50 characters or less")
        .required("Name is required"),
      number: Yup.string()
        .matches(
          /^\d{3}-\d{2}-\d{2}$/,
          "Number must be in the format 459-12-56"
        )
        .required("Number is required"),
    }),
    onSubmit: (value, { resetForm }) => {
      dispatch(addContact(value.name, value.number));
      resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <label>
        Name:
        <input
          className={css.field}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={css.error}>{formik.errors.name}</div>
        ) : null}
      </label>
      <label>
        Number:
        <input
          className={css.field}
          type="text"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.number && formik.errors.number ? (
          <div className={css.error}>{formik.errors.number}</div>
        ) : null}
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}
