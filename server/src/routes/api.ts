import express from "express";
const router = express.Router();

router.get("/health", async (_req, res) => {
    res.json({
        status: "ok"
    });
});

export default router;
