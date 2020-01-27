export function setupFormValidation() {
  const form = document.getElementById("contact-form");
  const errorMsgArea = document.getElementById("error-message");

  const name = document.getElementById("name");
  const email = document.getElementById("email");

  form.addEventListener("submit", event => {
    let errorMessages = [];

    if (name.value === "" || name.value === null) {
      errorMessages.push("Please enter a valid name");
    }

    if (email.value === "" || email.value === null || email.type !== "email") {
      errorMessages.push("Please enter a valid email address");
    }

    if (errorMessages.length > 0) {
      event.preventDefault();
      errorMsgArea.textContent = errorMessages.join(`\n`);
    }
  });
}
