const router = require("express").Router();
router.get("/sla", async (req, res) => {
    res.send('hello world')
});

module.exports = router;
