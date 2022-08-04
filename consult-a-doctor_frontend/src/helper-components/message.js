
const displayMessage = (text, backgroundColor) => {
  const message = document.getElementById("actionStatus");

  message.textContent = text
  message.classList.add(backgroundColor, "active")
  setTimeout(() => {
     message.classList.remove("active", backgroundColor)
  }, 8000);
}


export default displayMessage