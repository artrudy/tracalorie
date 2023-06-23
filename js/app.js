class Calorietracker {
    constructor(){
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalcalorie = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCalorieProgress();
    }

    //Public methods //API

    addMeals (meal){
        this._meals.push(meal);
        this._totalcalories += meal.calories;
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout (workout){
        this.workout.push(workout);
        this._totalcalories -= workout.calories;
        this._displayNewWorkout(workout);
        this._render();
    }

    reset(){
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        this._render();
    }

    setLimit(calorieLimit){
        this._calorieLimit = calorieLimit;
        Storage.setCalorieLimit(calorieLimit);
        this._displayCaloriesLimit();
        this._render();
    }




    removeMeal(id){
        const index = this._meals.findIndex((meal) => meal.id === id);

        if (index !== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            this._meals.splice(index, 1);
            this._render();
            
        }
    }


    removeWorkout(id){
        const index = this._workouts.findIndex((workout) => workout.id === id);

        if (index !== -1) {
            const workout = this._workouts[index];
            this._totalCalories -= workout.calories;
            this.workout.splice(index, 1);
            this._render();
            
        }
    }


    //Private methods 
    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalcalories;
    }

    _displayCaloriesLimit(){
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calorie-consumed');
        const consumed  = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calorie-burned');
        const burned  = this.workout.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining(){
        const caloriesRemainingEl = document.getElementById('calories-remaining');

        const progressEl = document.getElementById('calorie-progress')
        const remaining = this._calorieLimit - this._totalcalorie;
        caloriesRemainingEl.innerHTML = remaining;

        if (remaining <= 0 ) {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');  
            
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');

        } else {
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');  


            progressEl.classList.add('bg-success');
            progressEl.classList.remove('bg-danger');
        }

    }

    _displayCelorieProgress(){
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalcalories / this._displayCaloriesLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;


    }

    _displayNewMeal(meal){
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `

        <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>        
        `;
        mealsEl.appendChild(mealEl);


        _displayNewWorkout(workout){
            const workoutsEl = document.getElementById('workout-items');
            const workoutEl = document.createElement('div');
            workoutEl.classList.add('card', 'my-2');
            v.setAttribute('data-id', workout.id);
            workoutEl.innerHTML = `
    
            <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h4 class="mx-1">${workout.name}</h4>
                      <div
                        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                      >
                        ${workout.calories}
                      </div>
                      <button class="delete btn btn-danger btn-sm mx-2">
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>            
            `;
           workoutsElEl.appendChild(workoutEl);

    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();  
        this._displayCaloriesRemaining();
        this._displayCelorieProgress();
    }
}
class Workout {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Meal {
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Storage {
    static getCalorieLimit(defaultLimit = 2000){
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null){
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit')
        }
        return calorieLomit;
    }
    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit)

    }

}

class App {
    constructor(){
        this._tracker = new Calorietracker();

        document
        .getElementById('meal-form')
        .addEventListener('submit', this._newItem.bind(this, 'meal'))

        document
        .getElementById('workout-form')
        .addEventListener('submit', this._newItem.bind(this, 'workout'))

        document
        .getElementById('meal-item')
        .addEventListener('click', this._removeItems.bind(this, 'meal')) 

        document
        .getElementById('workout-item')
        .addEventListener('click', this._removeItems.bind(this, 'workout')) 

        document.getElementById('filter-meals')
            .addEventListener('keyup', this._filterOItems.bind(this, 'meals'))

        document.getElementById('filter-workouts')
            .addEventListener('keyup', this._filterOItems.bind(this, 'workout'))

        document.getElementById('reset')
            .addEventListener('keyuclick', this._reset.bind(this));

        document.getElementById('limit-form')
            .addEventListener('submit', this._setLimit.bind(this));



    }

    _newItem(type, e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        //Validate input

        if (name.value === '' || calories.value === '') {
            alert('Please fill all fields');
            return;
        }

        if(type === 'meal'){
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeals(meal);
        } else {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }
        
        name.value = '';
        calories.value = '';

        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collpse(collapseItem, {
            toggle: true
        });
    }

    _removeItem(type, e){
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if (confirm('Are you sure?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                type === 'meal'
                    ?this._tracker.removeMeal(id)
                    : this._tracker.removeWorkout(id);

                e.target.closest('.card').remove();                
            }            
        }
    }

    _filterItems(type, e){
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#{yype}-items.card`).forEach(item => 
            {
                const name = fisrstElementChild.fisrstElementChild.textContent;

                if(name.toLowerCase().indexOf(text) !== -1){
                    item.style.display = 'block'
                } else {
                    item.style.display = 'none';
                }
            })
    }


    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _setLimit(e){
        e.preventDefault();
        const limit = document.getElementById('limit');

        if (limit.value === '') {
            alert('please add limit');
            return;           
        }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = bootstrap.Modal.getInstance('modalEl');
    modal.hide();
    }
}
const app = new App();