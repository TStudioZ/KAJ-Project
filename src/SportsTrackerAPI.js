class SportsTrackerAPI {

    static init() {
        SportsTrackerAPI.user = {username: "User", weight: 0.0};
    }

    static createPromise(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 500);
        });
    }

    static updateUser(user) {
        SportsTrackerAPI.user = user;
        return SportsTrackerAPI.createPromise(true);
    }

    static loadUser() {
        return SportsTrackerAPI.createPromise(SportsTrackerAPI.user);
    }
}

SportsTrackerAPI.init();

export default SportsTrackerAPI;