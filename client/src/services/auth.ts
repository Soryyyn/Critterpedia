import api from "@/services/api";

export default {
    getFish() {
        return api().get("fish");
    },
    getBugs() {
        return api().get("bugs");
    },
}
