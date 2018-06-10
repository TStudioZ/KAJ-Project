import Helper from './Helper';

/**
 * Represents a mock API for saving and retrieving data.
 * Uses the Local Storage API for JSON-represented user data.
 */
class SportsTrackerAPI {

    /**
     * Prepares support attributes and structures.
     */
    static init() {
        SportsTrackerAPI.currentActivityId = 1; // generated id for activities
        SportsTrackerAPI.activities = new Map(); // {id, activity} pairs
        SportsTrackerAPI.sportTypes = ["Running", "Cycling", "Inline"];
    }

    /**
     * Inserts mock data.
     */
    static insertMockData() {
        if (!localStorage.getItem("user")) {
            // insert basic user data if no found in local storage
            localStorage.setItem("user", JSON.stringify({username: "User", age: 18, weight: 50.0, height: 160}));
        }

        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 1), 727, 2.77));
        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 6), 1561, 5.75));
        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 7), 766, 2.78));

        let today = new Date();
        today.setHours(0, 0, 0, 0);

        const day = new Date();
        day.setHours(0, 0, 0, 0);
        day.setDate(today.getDate() - 1);
        this.addActivity(new SportActivity(-1, "Cycling", day, 4321, 34.36));
    }

    /**
     * Creates a Promise resolved after a specified delay.
     */
    static createPromise(data, timeout = 250) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), timeout);
        });
    }

    // API methods return Promise and simulate a delay

    static updateUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
        return SportsTrackerAPI.createPromise(true);
    }

    static loadUser() {
        const user = JSON.parse(localStorage.getItem("user"));
        return SportsTrackerAPI.createPromise(user);
    }

    static addActivity(activity) {
        activity.id = SportsTrackerAPI.currentActivityId++;
        SportsTrackerAPI.activities.set(activity.id.toString(), activity);
        return SportsTrackerAPI.createPromise(true);
    }

    static updateActivity(activity) {
        if (!SportsTrackerAPI.activities.has(activity.id))
            return SportsTrackerAPI.createPromise(false);
        SportsTrackerAPI.activities.set(activity.id, activity);
        return SportsTrackerAPI.createPromise(true);
    }

    static deleteActivity(activityId) {
        const res = SportsTrackerAPI.activities.delete(activityId);
        return SportsTrackerAPI.createPromise(res);
    }

    static getActivity(activityId) {
        const activity = SportsTrackerAPI.activities.get(activityId.toString());
        return SportsTrackerAPI.createPromise(activity, 1000);
    }

    static getActivites() {
        return SportsTrackerAPI.createPromise(
            Array.from(SportsTrackerAPI.activities.values()));
    }

    static getSportTypes() {
        return SportsTrackerAPI.sportTypes;
    }

    static getTotalDistance() {
        const activities = SportsTrackerAPI.activities.values();
        let distance = 0;
        for (let a of activities) {
            distance += a.distance;
        }
        distance = Math.round(distance * 100) / 100;
        return SportsTrackerAPI.createPromise(distance, 500);
    }

    static getTotalTime() {
        const activities = SportsTrackerAPI.activities.values();
        let time = 0;
        for (let a of activities) {
            time += a.time;
        }
        return SportsTrackerAPI.createPromise(time, 500);
    }
}

/**
 * Represents the sport activity object and holds all activity data.
 */
export class SportActivity {

    constructor(id, sportType, date, time, distance) {
        this.id = id;
        this.sportType = sportType;
        this.date = date;
        this.time = time;
        this.distance = distance;
    }

    getTimeString() {
        return Helper.toTimeString(this.time);
    }
}

SportsTrackerAPI.init();
SportsTrackerAPI.insertMockData();

export default SportsTrackerAPI;