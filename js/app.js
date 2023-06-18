class Calorietracker {
    constructor(){
        this._calorieLimit = 2000;
        this._totalcalorie = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
    }

    //Public methods //API

    addMeals (meal){
        this._meals.push(meal);
        this._totalcalories += meal.calories;
        this._render();
    }

    addWorkout (workout){
        this.workout.push(workout);
        this._totalcalories -= workout.calories;
        this._render();
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
        const remaining = this._calorieLimit - this._totalcalorie;
        caloriesRemainingEl.innerHTML = remaining;

    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();  
        this._displayCaloriesRemaining();
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

const tracker = new Calorietracker();

const breakfast = new Meal('Breakfast', 400);
tracker.addMeals(breakfast);

const run = new Workout('morning Run', 300);
tracker.addWorkout(run)