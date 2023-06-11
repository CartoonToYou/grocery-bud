const groceryInput = document.querySelector("#grocery");
console.log(groceryInput);

const submitBtn = document.querySelector(".submit-btn");
console.log(submitBtn);

const list = document.querySelector(".grocery-list");
console.log(list);

const alert = document.querySelector(".alert");
console.log(alert);

const clearBtn = document.querySelector(".clear-btn");
console.log(clearBtn);

submitBtn.addEventListener("click", addItem);

clearBtn.addEventListener("click", clearItems);

let editElement = null;
let editFlag = false;

function addItem(event) {
  event.preventDefault();
  const inputValue = groceryInput.value;
  console.log(inputValue);
  // const newGroceryList = `
  // <div class="grocery-list">
  //   <article class="grocery-item">
  //     <p class="title">${inputValue}</p>
  //     <div class="btn-container">
  //       <button type="button" class="edit-btn">
  //         <i class="fa-solid fa-pen-to-square"></i>
  //       </button>
  //       <button type="button" class="delete-btn">
  //         <i class="fa-solid fa-trash"></i>
  //       </button>
  //     </div> <!-- clear button -->
  //   </article>
  // </div>
  // `;
  // list.insertAdjacentHTML("afterend", newGroceryList);
  const element = document.createElement("article");

  let attribute = document.createAttribute("data-id");
  const id = new Date().getTime().toString();
  attribute.value = id;
  element.setAttributeNode(attribute);

  element.classList.add("grocery-item");
  element.innerHTML = `
    <p class="title">${inputValue}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);

  // Add item mode
  if (inputValue !== "" && !editFlag) {
    list.appendChild(element);

    const groceryObject = {
      id: id,
      value: inputValue,
    };
    console.log(groceryObject);
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("list"));

    console.log(itemsFromLocalStorage);

    if (!itemsFromLocalStorage) {
      itemsFromLocalStorage = [];
    }

    itemsFromLocalStorage.push(groceryObject);
    localStorage.setItem("list", JSON.stringify(itemsFromLocalStorage));

    groceryInput.value = "";

    alert.textContent = "item added to the list";
    alert.classList.add("alert-success");

    setTimeout(function () {
      console.log("alert will disappear!");
      alert.textContent = "";
      alert.classList.remove("alert-success");
    }, 3000);
  } else if (inputValue !== "" && editFlag) {
    editElement.innerHTML = inputValue;
  }
}

function deleteItem(event) {
  const element = event.currentTarget;
  console.log(element);
  const parentOfDeleteBtn = element.parentElement;
  console.log(parentOfDeleteBtn);
  const article = parentOfDeleteBtn.parentElement;
  console.log(article);
  list.removeChild(article);

  alert.textContent = "item removed";
  alert.classList.add("alert-danger");

  setTimeout(function () {
    console.log("alert will disappear!");
    alert.textContent = "";
    alert.classList.remove("alert-danger");
  }, 3000);
}

function editItem(event) {
  editElement = event.currentTarget.parentElement.previousElementSibling;
  groceryInput.value = editElement.innerHTML;
  console.log(editElement);
  submitBtn.textContent = "edit";
  editFlag = true;
}

function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  console.log(items);
  if (items.length > 0) {
    items.forEach(function (item) {
      console.log(item);
      list.removeChild(item);
    });
  }

  alert.textContent = "empty list";
  alert.classList.add("alert-danger");

  setTimeout(function () {
    console.log("alert will disappear!");
    alert.textContent = "";
    alert.classList.remove("alert-danger");
  }, 3000);
}

function setupItems() {
  let itemsFromLocalStorage = JSON.parse(localStorage.getItem("list"));

  itemsFromLocalStorage.forEach(function (item) {
    console.log("item:", item);
    const element = document.createElement("article");
    let attribute = document.createAttribute("data-id");
    attribute.value = item.id;
    element.setAttributeNode(attribute);
    element.classList.add("grocery-item");
    element.innerHTML = `
    <p class="title">${item.value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

    list.appendChild(element);
  });
}

window.addEventListener("DOMContentLoaded", setupItems);
