import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
// import CircularProgress from "@mui/material/CircularProgress";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

interface ContactFormProps {
  submitHandler: (data: {
    from: string;
    subject: string;
    message: string;
  }) => void;
}
interface FormValues {
  from: string;
  subject: string;
  message: string;
}

const schema = yup
  .object()
  .shape({
    from: yup.string().email().max(50).required(),
    subject: yup.string().max(100).required(),
    message: yup.string().max(5000).required(),
  })
  .required();

const defaults = {
  from: "",
  subject: "",
  message: "",
};

const ContactForm:React.FC<ContactFormProps> =({submitHandler}) => {
 

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  useEffect(() => {
    console.log(formState);
  })

  const formRowStyle = {
    marginBlockEnd: "1em",
  };

  let submitFn = (vals:FormValues) => {
    reset();
    console.log(vals);
    submitHandler(vals);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="from"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="email"
              {...field}
              label="email"
              fullWidth
              error={!!errors.from}
              helperText={errors.from?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="subject"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="subject"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="message"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="message"
              fullWidth
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />
      </div>
      

      

      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2 }}
          disabled={!isDirty}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
export default ContactForm;