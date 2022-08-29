const displayMessage = (text, isError = true) => {

   const message = document.createElement("div");
   message.classList.add("action-status");
   message.id = "actionStatus";

   const para = document.createElement("p");
   para.className = "message";
   para.textContent = text;

   message.appendChild(para);
  
   document.body.appendChild(message);
   const backgroundColor = isError ? "red" : "green";
   message.classList.add(backgroundColor, "active");

   setTimeout(() => {
      message.classList.remove("active", backgroundColor);
      message.remove();
   }, 4000);

   console.log(message);
};

export default displayMessage;
