// ELEMENTS
const searchContainer = document.querySelector(".search-container");
const employeesGallery = document.getElementById("gallery");

// GLOBAL VARIABLES
let employeesArray = [];
let currentEmployeeIndex = 0;

// INIZIALIZATION
getEmployees();

// FETCH FUNCTIONS
// Fetch 12 employees from the Random User API
async function getEmployees() {
  try {
    const results = await fetch("https://randomuser.me/api/?results=12");
    const data = await results.json();
    employeesArray = data.results;
    displayEmployees();
  } catch (error) {
    console.error(error);
  }
}

// UI HELPER FUNCTIONS
// Render all employee cards in the gallery
function displayEmployees() {
  let employeesHTML = "";
  employeesArray.forEach((employee, index) => {
    const { name, picture, location, email } = employee;
    const fullName = `${name.first} ${name.last}`;
    const cityState = `${location.city}, ${location.state}`;

    employeesHTML += `
         <div class="card" data-index=${index}>
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
  const { name, location, picture, email, cell, dob } = employee;
  const birthday = new Date(dob.date);
  const month = birthday.getMonth() + 1;
  const day = birthday.getDate();
  const year = birthday.getFullYear();
  const formattedBirthday = `${month}/${day}/${year}`;
  const fullName = name.first + " " + name.last;
  const fullAddress = ` ${location.street.number} ${location.street.name}, ${location.city}, ${location.state} ${location.postcode}
`;
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
                        <p class="modal-text">Birthday: ${formattedBirthday}</p>
                    </div>
                </div>

            
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
  `;
  document.body.insertAdjacentHTML("beforeend", employeeModal);
  const newModalContainer = document.querySelector(".modal-container");
  const closeButton = document.getElementById("modal-close-btn");
  // Close the modal when the X button is clicked
  closeButton.addEventListener("click", () => {
    newModalContainer.remove();
  });
}
