import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validateForm(e);
    });
  }

  validateForm(element) {
    const target = element.target;
    const emailInput = target.querySelector('input[name="email"]');
    const passwordInput = target.querySelector('input[name="password"]');

    let formError = false;

    if (!validator.isEmail(emailInput.value)) {
      alert("Invalid email");
      formError = true;
    }
    if (passwordInput.value.length < 3 || passwordInput.value.length > 20) {
      alert("Password needs to have between 8 and 20 characters");
      formError = true;
    }

    if (!formError) target.submit();
  }
}
