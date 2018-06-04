class SportsTrackerAPI {

    static init() {
        SportsTrackerAPI.user = {username: "User", weight: 0.0};

        SportsTrackerAPI.currentActivityId = 1; // generated id for activities
        SportsTrackerAPI.activities = new Map(); // {id, activity} pairs
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
}

export class SportActivity {

    // constructor() {
    //     this.id = -1;
    //     this.sportType = null;
    //     this.date = null;
    //     this.distance = 0.0;
    //     this.time = 0;
    // }

    constructor(id, sportType, date, time, distance) {
        this.id = id;
        this.sportType = sportType;
        this.date = date;
        this.time = time;
        this.distance = distance;
    }

    getTimeString() {
        const time = this.time;
        const hours = parseInt(time / 3600, 10);
        const hoursString = hours > 0 ? hours + ":" : "";
        const minutes = parseInt((time - hours * 3600) / 60, 10);
        const seconds = parseInt(time - hours * 3600 - minutes * 60, 10);
        return `${hoursString}${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }
}

SportsTrackerAPI.init();
SportsTrackerAPI.insertMockData();

export default SportsTrackerAPI;