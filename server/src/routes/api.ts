import express from "express";
import database from "../database";
import { randomBytes } from "crypto";
const router = express.Router();

router.get("/health", async (_req, res) => {
    res.json({
        status: "ok"
    });
});

router.post("/register", async (req, res) => {
    const { username, displayName, password } = req.body;
    if (!username || !displayName || !password) {
        res.status(400);
        return;
    }

    if (password.length < 8) {
        res.status(400);
        return;
    }

    const id = randomBytes(16).toString();
    database.users[username] = {
        id,
        username,
        displayName,
        passwordHash: hash(password)
    };

    res.json({
        id: id,
        displayName: displayName
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        return;
    }

    const user = database.users[username];
    if (!user || hash(password) !== user.passwordHash) {
        res.status(401);
        return;
    }

    res.json({
        id: user.id,
        displayName: user.displayName
    });
});

function hash(plainText: string): string {
    return plainText + "_hash";
}

export default router;
