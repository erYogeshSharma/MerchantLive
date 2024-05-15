import { FormKey, IBusinessForm } from "../../types/business";

export function validateForm(step: number, form: IBusinessForm) {
  let isValid = true;
  const errors: Record<FormKey, string> = {} as Record<FormKey, string>;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  switch (step) {
    case 0:
      if (!form.name) {
        isValid = false;
        errors["name"] = "Name is required";
      }
      if (!form.title) {
        isValid = false;
        errors["title"] = "Tagline is required";
      }
      if (!form.email) {
        isValid = false;
        errors["email"] = "Email is required";
      }
      if (!emailRegex.test(form.email)) {
        isValid = false;
        errors["email"] = "Invalid email address";
      }
      if (!form.description) {
        isValid = false;
        errors["description"] = "Description is required";
      }

      if (!form.phone) {
        isValid = false;
        errors["phone"] = "Phone is required";
      }
      break;
    default:
      return { isValid, errors };
  }
  return { isValid, errors };
}
