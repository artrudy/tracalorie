class Calorietracker {
    constructor(){
        this._calorieLimit = 2000;
        this._totalcalorie = 0;
        this._meals = [];
        this._workouts = [];
    }

    addMeals (meal){
        this._meals.push(meal);
        this._totalcalories += meal.calories;
    }

    addWorkout (workout){
        this.workout.push(workout);
        this._totalcalories -= workout.calories;
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