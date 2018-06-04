class Helper {
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

    static stringDateToSeconds(date) {
        
    }
}

export default Helper;