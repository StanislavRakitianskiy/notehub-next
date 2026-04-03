import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { useId } from "react";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

interface OrderFormValue {
  title: string;
  content: string;
  tag: NoteTag;
}
const initialValues: OrderFormValue = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Text")
      .max(50, "Text")
      .required("Title is required"),
    content: Yup.string().max(500, "Max Text"),
    tag: Yup.mixed<NoteTag>()
      .oneOf(["Todo", "Work", "Shopping", "Personal", "Meeting"])
      .required("Tag is required"),
  });
  const fieldId = useId();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
  const handleSubmit = (
    values: OrderFormValue,
    action: FormikHelpers<OrderFormValue>,
  ) => {
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    action.resetForm();
    onClose();
  };
  const handleCancelClick = () => {
    onClose();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;