import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { FormView, ErrorMessageView } from "@Components/view";

export function NameUpdate({ fullName, updateName }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName,
    },
  });

  const onSubmit = handleSubmit(async (values) => updateName(values.fullName));

  return (
    <FormView
      content={
        <>
          <Form.Group controlId="fullName" className="p-4 w-50">
            <Form.Label className="h4">Your Name</Form.Label>
            <p id="fullNameDesc" className="mt-2 mb-3  ">
              Please enter your full name.
            </p>
            <Form.Control
              {...register("fullName", { required: true })}
              aria-describedby="fullNameDesc"
              required
            />
          </Form.Group>
        </>
      }
      footerText=" It will be visible to other members of your organization"
      onSubmit={onSubmit}
    />
  );
}

export function PasswordUpdate({ updatePassword }) {
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const { password, newPassword } = values;
    return updatePassword(password, newPassword).then(() => {
      reset({
        password: "",
        newPassword: "",
        confPassword: "",
      });
    });
  });

  return (
    <FormView
      content={
        <>
          <Form.Group controlId="password" className="p-4 w-50">
            <Form.Label className="h4">Password update</Form.Label>
            <p id="passwordDesc" className="mt-2 mb-3 ">
              Enter your current password
            </p>
            <Form.Control
              {...register("password", {
                required: "You must provide the current password",
              })}
              aria-describedby="passwordDesc"
              type="password"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between pb-4">
            <Form.Group controlId="newPassord" className="px-4 w-50">
              {/* <Form.Label className="h4">Password update</Form.Label> */}
              <p id="newPasswordDesc" className="mt-2 mb-3  ">
                Enter your new password
              </p>
              <Form.Control
                {...register("newPassword", { required: "Field is required" })}
                aria-describedby="newPasswordDesc"
                type="password"
                required
              />
            </Form.Group>
            <Form.Group controlId="confPassword" className="px-4 w-50">
              {/* <Form.Label className="h4">Password update</Form.Label> */}
              <p id="confPasswordDesc" className="mt-2 mb-3  ">
                Confirm your new password
              </p>
              <Form.Control
                name="confPassword"
                {...register("confPassword", {
                  required: "Field is required",
                  validate: (value) =>
                    getValues().newPassword === value ||
                    "Passwords do not match",
                })}
                aria-describedby="confPasswordDesc"
                type="password"
                required
              />
              <ErrorMessage
                errors={errors}
                name="confPassword"
                render={ErrorMessageView}
              />
            </Form.Group>
          </div>
        </>
      }
      footerText=""
      onSubmit={onSubmit}
    />
  );
}
