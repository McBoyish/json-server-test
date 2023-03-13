async function updateStock(id, newStock) {
  const res = await fetch("http://localhost:3000/items/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stock: newStock,
    }),
  });
  const data = await res.json();
  const shoppingListDiv = document.getElementById("shoppingList");
  shoppingListDiv.childNodes.forEach((childNode) => {
    if (childNode.id == data.id) {
      childNode.replaceWith(getItemDiv(data));
    }
  });
}

async function fetchList() {
  const res = await fetch("http://localhost:3000/items", { method: "GET" });
  const data = await res.json();
  const shoppingListDiv = document.getElementById("shoppingList");
  for (let i = 0; i < data.length; ++i) {
    const div = getItemDiv(data[i]);
    shoppingListDiv.appendChild(div);
  }
}

function getItemDiv(item) {
  const div = document.createElement("DIV");
  div.id = item.id;
  div.innerHTML = `<text>${item.name}</text>
                    <img src="${item.imgUrl}" />
                    <text>Stock: ${item.stock}</text>
                    <text>${item.description}</text>
                    <text>${item.type}</text>
                    <button onClick="updateStock(${item.id}, ${
    item.stock - 1
  })">Decrease stock</button>`;
  return div;
}

fetchList();
