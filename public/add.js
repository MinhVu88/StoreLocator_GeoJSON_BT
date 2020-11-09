const storeForm = document.querySelector("#store-form");
const storeId = document.querySelector("#store-id");
const storeAddress = document.querySelector("#store-address");

storeForm.addEventListener("submit", async e => {
  e.preventDefault();

  if (storeId.value === "" || storeAddress.value === "") {
    alert("Store ID & Address are required");
  }

  try {
    const response = await fetch("/api/v1/stores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storeId: storeId.value,
        address: storeAddress.value
      })
    });

    if (response.status === 400) throw Error("Store already exists");

    alert("Store Added");

    window.location.href = "/index.html";
  } catch (error) {
    alert(error.message);

    return;
  }
});
