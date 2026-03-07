// ELEMENTS
const search = document.querySelector(".search-container");
const employeesGallery = document.getElementById("gallery");

// GLOBAL VARIABLES
let employeesArray = [];
let employeesIndex = 0;

// INIZIALIZATION
getEmployees();

// FETCH FUNCTIONS
async function getEmployees() {
  try {
    const results = await fetch("https://randomuser.me/api/?results=12");
    const data = await results.json();
    employeesArray = data.results;
    displayEmployees();
  } catch (error) {
    console.error(error);
  } /*finally {
  }*/
}

// UI HELPER FUNCTIONS
function displayEmployees() {
  employeesArray.forEach((employee, index) => {
    const employeeInfo = `
         <div class="card" data-index=${index}>
                    <div class="card-img-container">
                        <img class="card-img" src="${employee.picture.medium}" alt="employee's picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee.name.first + " " + employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>
                </div>
        `;
    employeesGallery.insertAdjacentHTML("beforeend", employeeInfo);
  });
}

// EVENT LISTENERS
employeesGallery.addEventListener("click", (e) => {
  const galleryCard = e.target.closest(".card");
  if (!galleryCard) {
    return;
  } else {
    employeesIndex = parseInt(galleryCard.dataset.index);
    showEmployeeModal(employeesIndex);
  }
});

function showEmployeeModal(index) {
  const modalContainer = document.querySelector(".modal-container");

  if (modalContainer) {
    modalContainer.remove();
  }
  const employee = employeesArray[index];
  const employeeModal = `
   <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.large}" alt="employee's picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first + " " + employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode} </p>
                        <p class="modal-text">Birthday: ${employee.dob.date}</p>
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
  closeButton.addEventListener("click", () => {
    newModalContainer.remove();
  });
}
