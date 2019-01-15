document.addEventListener("DOMContentLoaded", () => {

  const burgerMenu = document.getElementById("burger-menu");
  const orderList = document.getElementById("order-list");
  const customBurgerForm = document.getElementById("custom-burger");


  //get request
  fetch("http://localhost:3000/burgers")
    .then(res => res.json())
    .then(data => renderBurgers(data))

  //creates single burgers
    function burgerMaker(burger) {
      const singleBurger = document.createElement("div");
      singleBurger.dataset.id = burger.id;

      const burgerTitle = document.createElement("h3");
      burgerTitle.innerText = burger.name;
      burgerTitle.setAttribute("class", "burger_title");

      const burgerImage = document.createElement("img");
      burgerImage.src = burger.image;

      const burgerDescription = document.createElement("p");
      burgerDescription.setAttribute("class", "burger_description");
      burgerDescription.innerText = burger.description;

      const addToOrderButton = document.createElement("button");
      addToOrderButton.setAttribute("class", "button");
      addToOrderButton.innerText = "Add to Order";

      singleBurger.append(burgerTitle, burgerImage, burgerDescription, addToOrderButton);

      return singleBurger;
    }

// renders one burger @ a time from burgerMaker & slaps it on the dom
    function renderBurger(burger){
      let newBurger = burgerMaker(burger)
      burgerMenu.append(newBurger);
    }

// renders all burgers together. each gets slapped on the dom by renderBurger
    function renderBurgers(burgerData){
        burgerData.forEach(burger => {
          renderBurger(burger);
        });
    }

//add to order button will append name in an li in the your order section

  function appendToYourOrder(burgerTitle){
    const burgerOrder = document.createElement("li");
    burgerOrder.innerText = burgerTitle;
    orderList.append(burgerOrder);
  }
    burgerMenu.addEventListener("click", function(event) {
      if(event.target.className === "button"){
        //alert("does the thing");
          const burgerTitle = event.target.parentNode.querySelector(".burger_title").innerText;
          appendToYourOrder(burgerTitle);
      }
    });

//form will fetch submission info (POST) and render to the menu. will also append name to 'your order' list

    customBurgerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let nameInput = customBurgerForm.querySelector('input[id="burger-name"]').value
      appendToYourOrder(nameInput);

      // let nameInput = customBurgerForm[0].value;
      let descriptionInput = customBurgerForm.querySelector(`input[id="burger-description"]`).value

      let imageInput = customBurgerForm.querySelector(`input[id="burger-image"]`).value


      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: nameInput, description: descriptionInput, image: imageInput})
        //remember! body must by json.stringify & inputs must be in key/value pairs in an object
      }
      fetch("http://localhost:3000/burgers", options)
        .then(res => res.json())
        .then(data => renderBurger(data))
      //console.log(nameInput, descriptionInput, imageInput);
    });




});
