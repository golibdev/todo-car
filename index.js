const carNameInput = document.getElementById('carName')
const carModelInput = document.getElementById('carModel')
const carYearInput = document.getElementById('carYear')
const plusBtn = document.getElementById('plusBtn');
const tbody = document.querySelector('tbody');
let row = '';
let cars = [];
// display data
function displayData(cars) {
   if(cars.length == 0) {
      row = `<tr>
         <td colspan="7">
            <p class='text-danger'>Mashinalar mavjud emas</p>
         </td>
      </tr>`
   } else {
      row = ''
      const fulDate = getDate()
      cars.forEach((item) => {
         row+=`
         <tr>
            <td>
               <input type="checkbox" class="form-check-input">
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
               <button class="btn btn-warning">
                  <i class="bi bi-pencil-square"></i>
               </button>
            </td>
         </tr>
         `
      })
   }
   
   tbody.innerHTML = row
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

// call display data
displayData(cars.reverse())

// delete car
function deleteCar(id) {
   const filter = cars.filter(car => car.id !== id)
   cars = filter;
   displayData(cars)
}