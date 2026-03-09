// ELEMENTS
const searchContainer = document.querySelector(".search-container");
const employeesGallery = document.getElementById("gallery");

// GLOBAL VARIABLES
let employeesArray = [];
let currentEmployeeIndex = 0;

// UTILITY FUNCTIONS
function employeeFullname(employee) {
  const { name } = employee;
  return `${name.first} ${name.last}`;
}

function employeeBirthday(employee) {
  const { dob } = employee;
  const birthday = new Date(dob.date);
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();
  const year = birthday.getFullYear();
  return `${month}/${day}/${year}`;
}

function employeeAddress(employee) {
  const { location } = employee;
  return `${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}
`;
}

// INIZIALIZATION
getEmployees();
displaySearch();

// FETCH FUNCTIONS
// Fetch 12 employees from the Random User API
async function getEmployees() {
  try {
    const results = await fetch(
      "https://randomuser.me/api/?results=12&nat=us,ca,gb,au",
    );
    const data = await results.json();
    employeesArray = data.results;
    displayEmployees(employeesArray);
  } catch (error) {
    console.error(error);
  }
}

// UI HELPER FUNCTIONS
// Render all employee cards in the gallery
function displayEmployees(arr) {
  employeesGallery.innerHTML = " ";
  let employeesHTML = "";
  arr.forEach((employee, index) => {
    const { picture, location, email } = employee;
    const fullName = employeeFullname(employee);
    const cityState = `${location.city}, ${location.state}`;
    const realIndex = employeesArray.indexOf(employee);
    employeesHTML += `
         <div class="card" data-index=${realIndex}>
                    <div class="card-img-container">
                        <img class="card-img" src="${picture.medium}" alt="employee's picture">
                    </div>
                    <div class="card-info-container">
                        <h3 class="card-name cap">${fullName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${cityState}</p>
                    </div>
                </div>
        `;
  });
  employeesGallery.insertAdjacentHTML("beforeend", employeesHTML);
}

// EVENT LISTENERS
// Open employee modal when a card is clicked
employeesGallery.addEventListener("click", (e) => {
  const galleryCard = e.target.closest(".card");
  if (!galleryCard) {
    return;
  } else {
    currentEmployeeIndex = parseInt(galleryCard.dataset.index);
    showEmployeeModal(currentEmployeeIndex);
  }
});

// Create and display the employee modal
function showEmployeeModal(index) {
  // Remove existing modal if one is already open
  document.querySelector(".modal-container")?.remove();
  const employee = employeesArray[index];
  const { picture, email, cell, location } = employee;
  const fullName = employeeFullname(employee);
  const birthday = employeeBirthday(employee);

  const fullAddress = employeeAddress(employee);
  const modalLocation = location.city;

  const employeeModal = `
   <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.large}" alt="employee's picture">
                        <h3  class="modal-name cap">${fullName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${modalLocation}</p>
                        <hr>
                        <p class="modal-text">${cell}</p>
                        <p class="modal-text">${fullAddress} </p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>

            
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
  `;
  document.body.insertAdjacentHTML("beforeend", employeeModal);

  // MODAL TOGGLE
  const prevButton = document.getElementById("modal-prev");
  const nextButton = document.getElementById("modal-next");
  if (currentEmployeeIndex === 0) {
    prevButton.style.display = "none";
  }
  if (currentEmployeeIndex === employeesArray.length - 1) {
    nextButton.style.display = "none";
  }
  prevButton.addEventListener("click", () => {
    if (currentEmployeeIndex > 0) {
      currentEmployeeIndex--;
      showEmployeeModal(currentEmployeeIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentEmployeeIndex < employeesArray.length - 1) {
      currentEmployeeIndex++;
      showEmployeeModal(currentEmployeeIndex);
    }
  });

  const newModalContainer = document.querySelector(".modal-container");
  const closeButton = document.getElementById("modal-close-btn");
  // Close the modal when the X button is clicked
  closeButton.addEventListener("click", () => {
    newModalContainer.remove();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal-container");
      if (modal) {
        modal.remove();
      }
    }
  });

  newModalContainer.addEventListener("click", (e) => {
    if (e.target === newModalContainer) {
      newModalContainer.remove();
    }
  });
}
// SEARCH FUNCTIONALITY

// Create and display the search form
function displaySearch() {
  const formSearch = `
     <form>
                            <input type="text" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>
    `;

  searchContainer.insertAdjacentHTML("beforeend", formSearch);
}

// Return employees whose name matches the search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase().trim();
  const filteredEmployees = getFilteredEmployees(searchValue);
  renderSearchResults(filteredEmployees);
});

function getFilteredEmployees(searchValue) {
  return employeesArray.filter((employee) =>
    employeeFullname(employee).toLowerCase().includes(searchValue),
  );
}

// Render filtered employees or display an empty state
function renderSearchResults(arr) {
  if (arr.length === 0) {
    employeesGallery.innerHTML = "";
    const emptyStateMessage = document.createElement("h3");
    emptyStateMessage.textContent = "No employees found.";
    employeesGallery.appendChild(emptyStateMessage);
  } else {
    displayEmployees(arr);
  }
}

// Prevent form submission from refreshing the page
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
