import Helper from './Helper';

class SportsTrackerAPI {

    static init() {
        SportsTrackerAPI.user = {username: "User", age: 18, weight: 50.0, height: 160};

        SportsTrackerAPI.currentActivityId = 1; // generated id for activities
        SportsTrackerAPI.activities = new Map(); // {id, activity} pairs
        SportsTrackerAPI.sportTypes = ["Running", "Cycling", "Inline"];
    }

    static insertMockData() {
        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 1), 727, 2.77));
        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 6), 1561, 5.75));
        this.addActivity(new SportActivity(-1, "Running", new Date(2018, 3, 7), 766, 2.78));
    }

    static createPromise(data, timeout = 250) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), timeout);
        });
    }

    static updateUser(user) {
        SportsTrackerAPI.user = user;
        return SportsTrackerAPI.createPromise(true);
    }

    static loadUser() {
        return SportsTrackerAPI.createPromise(SportsTrackerAPI.user);
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