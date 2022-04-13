// Github : @riz4d/teleform

document
  .querySelector("form.contact__form")
  .addEventListener("submit", function (e) {
 
    e.preventDefault();

    var today = new Date();
    var date =
      "Server Date: " +
      today.getFullYear() +
      ":" +
      (today.getMonth() + 1) +
      ":" +
      today.getDate() +
      "%0AServer Time: " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    var nameInput = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var input_message = document.getElementById("message").value;
    var message = input_message.replace(/(\r\n|\n|\r|\n|\t)/gm, " "); 

    if (nameInput === "") {
      swal("Name !", "Invalid name", "error");
     
    } else if (nameInput.length < 2) {
      swal("Name !", "Invalid name", "error");
     
    } else if (mail === "") {
      swal("Mail !", "Invalid mail", "error");
     
    } else if (mail.length < 2) {
      swal("Mail !", "Invalid mail", "error");
     
    } else if (message === "") {
      swal("Message !", "Invalid message", "error");
  
    } else if (message.length < 2) {
      swal("Message !", "Invalid message", "error");
  
    } else {
      var send_message =
        date +
        "%0A%0A<b>Name:</b> " +
        nameInput +
        "%0A<b>E-mail:</b> " +
        mail +
        "%0A<b>Message:</b> " +
        message +
        "%0A%0AQueries : @riz4d";

  
      var bot_token = "12345678:AAAAAABBBBCCCCC-ddddd45"; // your telegram bot token
      var chat_id = 987456321;//your telegram chat id

   
      var url =
        "https://api.telegram.org/bot" +
        bot_token +
        "/sendMessage?chat_id=" +
        chat_id +
        "&text=" +
        send_message +
        "&parse_mode=html";

  
      var xhttp = new XMLHttpRequest();

  
      xhttp.open("GET", url, true);
      xhttp.send();

   
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
    
          console.log("xhttp.readyState=", xhttp.readyState);
          console.log("xhttp.status=", xhttp.status);
          console.log("response=", xhttp.responseText);

        
          var data = JSON.parse(xhttp.responseText);
          var uploadResult = data["ok"];
          console.log("uploadResult=", uploadResult);

          if (uploadResult === true) {
            var sentMsg = document.getElementById("sent-message");
            sentMsg.style.display = "block";
            console.log("successfully uploaded file");
            document.querySelector(".contact__form").reset();
          } else {
            var errorMsg = document.getElementById("error-message");
            errorMsg.style.display = "block";
            console.log("failed to upload file");
            document.querySelector(".contact__form").reset();
          }
        }
      };
    }
  });
