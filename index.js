const groceryInput = document.querySelector("#grocery");
console.log(groceryInput);

const submitBtn = document.querySelector(".submit-btn");
console.log(submitBtn);

const list = document.querySelector(".grocery-list");
console.log(list);

submitBtn.addEventListener("click", addItem);

function addItem(event) {
  event.preventDefault();
  const inputValue = groceryInput.value;
  console.log(inputValue);
  const newGroceryList = `
  <div class="grocery-list">
    <article class="grocery-item">
      <p class="title">${inputValue}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div> <!-- clear button -->
    </article>
  </div>
  `;
  list.insertAdjacentHTML("afterend", newGroceryList);
}
