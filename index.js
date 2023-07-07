document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.querySelector(".results-container");

    // Fetch mobile phone data from db.json
    fetch("db.json")
      .then(response => response.json())
      .then(data => {
        const mobilePhones = data.mobilePhones;

        searchInput.addEventListener("input", function () {
          const searchTerm = searchInput.value.toLowerCase();
          const filteredPhones = mobilePhones.filter(phone =>
            phone.brand.toLowerCase().includes(searchTerm) ||
            phone.model.toLowerCase().includes(searchTerm)
          );

          displayResults(filteredPhones);
        });
      })
      .catch(error => console.error(error));

    function displayResults(results) {
      resultsContainer.innerHTML = "";

      if (results.length === 0) {
        const noResultsElement = document.createElement("p");
        noResultsElement.classList.add("no-results");
        noResultsElement.textContent = "No results found.";
        resultsContainer.appendChild(noResultsElement);
        return;
      }

      results.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList.add("phone-card");
        phoneCard.innerHTML = `
          <h3>${phone.brand} ${phone.model}</h3>
          <img src="${phone.image}" alt="${phone.brand} ${phone.model}">
          <p>${phone.description}</p>
          <ul>
            <li><strong>Display:</strong> ${phone.specs.display}</li>
            <li><strong>Processor:</strong> ${phone.specs.processor}</li>
            <li><strong>RAM:</strong> ${phone.specs.ram}</li>
            <li><strong>Storage:</strong> ${phone.specs.storage}</li>
            <li><strong>Battery:</strong> ${phone.specs.battery}</li>
            <li><strong>Camera:</strong> ${phone.specs.camera}</li>
          </ul>
        `;
        resultsContainer.appendChild(phoneCard);
      });
    }
  });
