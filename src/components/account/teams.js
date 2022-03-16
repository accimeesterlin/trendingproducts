import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import slugify from "slugify";
import { FormView, ErrorMessageView } from "./atom";

export const EditTeamName = ({ onSave }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(async (values) =>
    // const orgs = Storage.getData("orgs") || [];
    // const org = {
    //   name: values.newOrgName,
    //   slug: slugify(values.newOrgName, {
    //     lower: true,
    //     strict: true,
    //     remove: /[*+~.()'"!:@]/g,
    //   }),
    //   id: new Date().toISOString(),
    // };
    // orgs.push(org);
    // Storage.setData("orgs", orgs);
    // onComplete(org);

    onSave({
      name: values.newOrgName,
      slug: slugify(values.newOrgName, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      }),
    })
  );

  return (
    <FormView
      content={
        <Form.Group controlId="newOrgName" className="p-4">
          <Form.Label className="h4">Name</Form.Label>
          <p id="newOrgNameDesc" className="mt-2 mb-3 ">
            How the team will be known by its members.
          </p>
          <Form.Control
            {...register("newOrgName", { required: "Name is required" })}
            aria-describedby="newOrgNameDesc"
            required
          />
          <ErrorMessage
            errors={errors}
            name="newOrgName"
            render={ErrorMessageView}
          />
        </Form.Group>
      }
      footerText="Each tean will hahve its separate billing"
      onSubmit={onSubmit}
    />
  );
};
