const carNameInput = document.getElementById('carName')
const carModelInput = document.getElementById('carModel')
const carYearInput = document.getElementById('carYear')
const plusBtn = document.getElementById('plusBtn');
const updateBtn = document.getElementById('updateBtn');
const todo = document.querySelector('#todo');
const successTodo = document.querySelector('#success-todo');
let row = '';
let cars = [];
let successData = [];
// display data
function displayData(cars) {
   if(cars.length == 0) {
      row = `<tr>
         <td colspan="7">
            <p class='text-danger'>Mashinalar mavjud emas</p>
         </td>
      </tr>`
      todo.innerHTML = row
   } else {
      row = ''
      const fulDate = getDate()
      cars.forEach((item) => {
      row+=`
         <tr>
            <td>
               <input type="checkbox" class="form-check-input" onclick="successTodoData(${item.id})">
            </td>
            <td>
               ${item.carName}
            </td>
            <td>
               ${item.carModel}
            </td>
            <td>
               ${item.carYear}
            </td>
            <td>
               ${fulDate}
            </td>
            <td>
               <button onclick="deleteCar(${item.id})" class="btn btn-danger">
                  <i class="bi bi-trash"></i>
               </button>
            </td>
            <td>
               <button class="btn btn-warning" onclick="updateData(${item.id})">
                  <i class="bi bi-pencil-square"></i>
               </button>
            </td>
         </tr>
         `
      })
      todo.innerHTML = row;
   }
}

function displaySuccesData(success) {
   if(success.length == 0) {
      row = `<tr>
         <td colspan="7">
            <p class='text-danger'>Mashinalar mavjud emas</p>
         </td>
      </tr>`
      successTodo.innerHTML = row
   } else {
      row = ''
      const fulDate = getDate()
      success.forEach((item) => {
         row+=`
            <tr>
               <td>
                  ${item.carName}
               </td>
               <td>
                  ${item.carModel}
               </td>
               <td>
                  ${item.carYear}
               </td>
               <td>
                  ${fulDate}
               </td>
               <td>
                  <button onclick="deleteCar(${item.id})" class="btn btn-danger">
                     <i class="bi bi-trash"></i>
                  </button>
               </td>
            </tr>
         `
      })
      successTodo.innerHTML = row;
   }
}

// plus btn
plusBtn.addEventListener('click', createNewCar)

// create function
function createNewCar(e) {
   e.preventDefault()
   let car = {
      id: new Date().getTime(),
      carName: carNameInput.value,
      carModel: carModelInput.value,
      carYear: carYearInput.value
   };

   if(car.carName.trim().length == 0 || car.carModel.trim().length == 0 || car.carYear.trim().length == 0) {
      return alert("Barcha maydonlarni to'ldiring!")
   }

   cars.push(car)
   car = {}
   displayData(cars.reverse())
   carModelInput.value = ''
   carNameInput.value = ''
   carYearInput.value = ''
}

// time settings
function getDate() {
   const date = new Date();
   const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
   const month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
   const year = date.getFullYear();

   return `${day}.${month}.${year}`
}

// delete car
function deleteCar(id) {
   const filter = cars.filter(car => car.id !== id)
   const filterSuccessData = cars.filter(car => car.id !== id)
   cars = filter;
   successData = filterSuccessData
   displayData(cars)
   displaySuccesData(successData)
}

// success data function
function successTodoData(id) {
   successData = cars.filter(item => item.id == id);
   cars = cars.filter(item => item.id !== id)
   displayData(cars)
   displaySuccesData(successData)
}

// update data function
function updateData(id){
   const filter = cars.find(item => item.id === id)
   carNameInput.value = filter.carName;
   carModelInput.value = filter.carModel;
   carYearInput.value = filter.carYear;
   const index = cars.findIndex(item => item.id == id);
   localStorage.setItem('id', id)
   localStorage.setItem('index', index)
}

updateBtn.addEventListener('click', saveUpdateData)

function saveUpdateData(e) {
   e.preventDefault()
   const id = +localStorage.getItem('id')
   const index = +localStorage.getItem('index')
   const car = {
      carModel: carModelInput.value,
      carName: carNameInput.value,
      carYear: carYearInput.value,
      id
   }

   cars[index] = car;
   

   displayData(cars)
   
   carNameInput.value = ""
   carModelInput.value = ""
   carYearInput.value = ""
   localStorage.clear()
}

// call display data
displayData(cars.reverse())
displaySuccesData(successData.reverse())