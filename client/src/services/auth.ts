import api from "@/services/api";

export default {
    // get fish from online api: http://acnhapi.com
    getFish() {
        return api().get("fish");
    },

    // get fish from user_fish table
    getUserFish(userid: any) {
        return api().get(`fish/${userid}`);
    },

    // make a change to user_fish table
    postChangeToUserFish(data: any) {
        return api().post("fish", data);
    },

    // get bugs from online api: http://acnhapi.com
    getBugs() {
        return api().get("bugs");
    },

    // post the user data to backend to check db
    // if no user with same nickname or email exists
    // create new user
    postSignup(data: any) {
        return api().post("signup", data);
    }
}
