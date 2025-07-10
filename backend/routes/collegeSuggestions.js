const express = require("express");
const router = express.Router();

router.post("/college-suggestions", async (req, res) => {
    const { rank, caste } = req.body;

    // College suggestion logic
    function getColleges(rank, caste) {
        let colleges = [];
        if (rank <= 100) {
            colleges.push("IIT");
        } else if (rank <= 700) {
            colleges.push("NIT", "OU");
        } else if (rank <= 1000) {
            colleges.push("CBIT", "JNTUH");
        } else if (rank <= 2000) {
            colleges.push("GITAM", "HITAM", "VNR");
        } else if (rank <= 9000) {
            colleges.push("GITAM", "HITAM", "VNR", "GRRR");
        } else if (rank <= 15000) {
            colleges.push("MRUH", "HITAM", "VNR", "GRRR", "VASAVI");
        } else if (rank <= 25000) {
            colleges.push("BVRIT", "VASAVI", "GRRR");
        } else {
            colleges.push("Other Local Colleges");
        }
        return colleges;
    }

    const suggestedColleges = getColleges(parseInt(rank), caste);
    res.status(200).json({ suggestions: suggestedColleges });
});

module.exports = router;
