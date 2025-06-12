import { FormGroup } from "@angular/forms";

export function getFieldErrorMessage(formGroup: FormGroup, controlName: string): string | null {
    const control = formGroup.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      }
      if (control.errors['minlength']) {
        const { requiredLength, actualLength } = control.errors['minlength'];
        return `Minimum ${requiredLength} characters required.`;
      }
      if (control.errors['maxlength']) {
        return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed.`;
      }
      if (control.errors['min']) {
        return `Minimum value is ${control.errors['min'].min}.`
      }
      if (control.errors['max']) {
        return `Maximum value is ${control.errors['max'].max}.`
      }
      if (control.errors['email']) {
        return `Invalid email format`
      }
      if (control.errors['pattern']) {
        return 'Invalid format.';
      }
    }
    return null;
  }