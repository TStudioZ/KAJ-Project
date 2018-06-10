/**
 * Contains helper methods for the app.
 */
class Helper {

    /**
     * Converts a date to user-friendly string.
     */
    static getStringDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0'+dd
        } 
        if (mm < 10) {
            mm = '0'+mm
        }
        const dateString = `${yyyy}-${mm}-${dd}`;
        return dateString;
    }

    /**
     * Converts a time in seconds to a user-friendly string.
     */
    static toTimeString(time) {
        const hours = parseInt(time / 3600, 10);
        const hoursString = hours > 0 ? hours + ":" : "";
        const minutes = parseInt((time - hours * 3600) / 60, 10);
        const seconds = parseInt(time - hours * 3600 - minutes * 60, 10);
        return `${hoursString}${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }
}

export default Helper;