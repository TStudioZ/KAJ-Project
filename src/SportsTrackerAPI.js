class SportsTrackerAPI {

    static init() {
        SportsTrackerAPI.user = {username: "User", weight: 0.0};
        SportsTrackerAPI.activities = [];
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

    }

    static updateActivity(activity) {
        
    }

    static deleteActivity(activityId) {

    }

    static getActivity(activityId) {

    }

    static getActivites() {

    }
}

class SportActivity {

    constructor() {
        this.sportType = null;
        this.name = null;
        this.date = null;
        this.distance = 0.0;
        this.time = 0;
    }
}

SportsTrackerAPI.init();

export default SportsTrackerAPI;