import { toast } from "sonner";

interface RequiredField {
  valid: boolean;
  message: string;
  selector: string;
}

// Explain every missing requirement and bring the first field into keyboard reach.
export function checkRequiredFields(fields: RequiredField[]): boolean {
  const missing = fields.filter((field) => !field.valid);
  if (!missing.length) {
    toast.dismiss("challenge-required-fields");
    return true;
  }
  toast.error("Nhóm cần bổ sung trước khi tiếp tục", {
    id: "challenge-required-fields",
    duration: 10000,
    description: (
      <ul className="challenge-toast-errors">
        {missing.map((field) => (
          <li key={field.selector}>{field.message}</li>
        ))}
      </ul>
    ),
  });
  const target = document.querySelector<HTMLElement>(missing[0].selector);
  let ancestor = target?.parentElement;
  while (ancestor) {
    if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
    ancestor = ancestor.parentElement;
  }
  target?.focus();
  return false;
}
