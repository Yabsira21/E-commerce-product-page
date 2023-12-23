let thumbnails = document.querySelectorAll(".thumbnails");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".close-btn");
let picture = document.querySelector(".modal-item-hero");
let leftBtn = document.querySelector(".left-container");
let rightBtn = document.querySelector(".right-container");
let currentPic = 0;
let counter = 0;
let itemCount = document.querySelector(".counter");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");

let del = document.querySelectorAll(".del");

let spanDollar = document.querySelector(".span-dollar");
let spanCount = document.querySelector(".span-count");

let someItem = false;

let cartPic = document.querySelector(".nav-cart-img");
let cartContainer = document.querySelector(".nav-cart-items");

let toCart = document.querySelector(".item-action-btn");

let empty = "<span>Your cart is empty.</span>";

// PICTURE NAVIGATION
for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    if (i >= 4) i -= 4;
    picture.style.backgroundImage = `url(images/image-product-${i + 1}.jpg)`;
    currentPic = i + 1;
  });
}

leftBtn.addEventListener("click", function () {
  currentPic--;
  currentPic <= 0 ? (currentPic = 4) : "";
  picture.style.backgroundImage = `url(images/image-product-${currentPic}.jpg)`;
});

rightBtn.addEventListener("click", function () {
  currentPic++;
  currentPic > 4 ? (currentPic = 1) : "";
  picture.style.backgroundImage = `url(images/image-product-${currentPic}.jpg)`;
});

/* MODAL */
overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

closeBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

/* ITEM COUNT */
minus.addEventListener("click", function () {
  if (counter > 0) {
    counter--;
    itemCount.textContent = counter;
  }
});

plus.addEventListener("click", function () {
  counter++;
  itemCount.textContent = counter;
});

/* adding item to the cart */
toCart.addEventListener("click", function () {
  if (counter >= 1) {
    if (!someItem) {
      someItem = true;
      cartContainer.removeChild(cartContainer.firstElementChild);
      let itemTimesdollar = parseFloat(counter * 125.0).toFixed(2);
      let html = ` <div class="nav-cart-desc">
        <img src="images/image-product-1-thumbnail.jpg" alt="" />
        <h5>
          Fall Limited Edition Sneakers $125.00 x <span class="span-count">${counter}</span>
          <span class="span-dollar">${itemTimesdollar}</span>
        </h5>
        <img class="del" src="images/icon-delete.svg" alt="" />
        </div>
        <h3 class="checkout">Checkout</h3>`;
      cartContainer.insertAdjacentHTML("afterbegin", html);
      document.querySelector(".items-count").textContent = counter;
      document.querySelector(".items-count").style.display = "block";
    } else if (someItem) {
      document.querySelector(".span-count").textContent = counter;
      document.querySelector(".span-dollar").textContent = parseFloat(
        counter * 125.0
      ).toFixed(2);
      document.querySelector(".items-count").textContent = counter;
    }
  }
});

cartPic.addEventListener("click", function () {
  document.querySelector(".nav-cart").classList.toggle("hidden");
});

function attachDeleteButtonListener() {
  const deleteButtons = document.querySelectorAll(".del");

  deleteButtons.forEach(function (deleteButton) {
    if (!deleteButton.hasAttribute("data-clicked")) {
      deleteButton.addEventListener("click", function (event) {
        document.querySelector(".items-count").style.display = "none";
        cartContainer.innerHTML = "";
        let html2 = "<span>Your cart is empty.</span>";
        cartContainer.insertAdjacentHTML("afterbegin", html2);
        counter = 0;
        someItem = false;
      });

      deleteButton.setAttribute("data-clicked", "true");
    }
  });

  setTimeout(attachDeleteButtonListener, 100);
}

attachDeleteButtonListener();

//MOBILE

let menu = document.querySelector(".hamburger");
let nav_container = document.querySelector(".nav-links-container");
let isOpen = false;
menu.addEventListener("click", function (params) {
  nav_container.classList.toggle("mobile-hidden");
  overlay.classList.toggle("hidden");
  menu.src = isOpen ? `images/icon-menu.svg` : `images/icon-close.svg`;
  document.body.style.overflowY = isOpen ? "auto" : "hidden";
  isOpen = !isOpen;
});
