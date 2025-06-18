const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const floors = require(path.join(__dirname, '..', 'data', 'floors'));
const machinesData = require(path.join(__dirname, '..', 'data', 'machines'));

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'your_username', 
    password: 'your_password', 
    host: 'localhost', 
    database: 'your_database', 
    port: 5432, 
};

const pool = new Pool(dbConfig);

function defaultGameState() {
    return {
        clicks: 0,
        machines: [],
        currentFloor: 1,
        unlockedFloors: [1],
        defeatedBosses: [],
        currentBoss: null,
    };
}

// Endpoints do danych statycznych
app.get('/api/floors', (req, res) => {
    res.json(floors);
});
app.get('/api/machines', (req, res) => {
    res.json(machinesData);
});

// GET /api/game
app.get('/api/game', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT clicks, currentFloor, currentBoss,
                   unlockedFloors, defeatedBosses,
                   machines
            FROM Game
            WHERE id = $1
        `, [1]);

        if (result.rows.length > 0) {
            const row = result.rows[0];
            let state = {};
            try {
                state.clicks = row.clicks;
                state.currentFloor = row.currentfloor;
                state.currentBoss = row.currentboss;
                state.unlockedFloors = row.unlockedfloors || [];
                state.defeatedBosses = row.defeatedbosses || [];
                state.machines = row.machines || [];
            } catch (e) {
                console.warn('Błąd parsowania JSON z bazy, wrzucam default:', e);
                state = defaultGameState();
            }
            res.json(state);
        } else {
            res.json(defaultGameState());
        }
    } catch (err) {
        console.error('GET /api/game error:', err);
        res.status(500).send('Błąd serwera przy pobieraniu stanu gry');
    }
});

// POST /api/game
app.post('/api/game', async (req, res) => {
    const gameObj = req.body;
    if (typeof gameObj.clicks !== 'number' || typeof gameObj.currentFloor !== 'number') {
        return res.status(400).send('Niepoprawny format stanu gry');
    }

    const currentBoss = (typeof gameObj.currentBoss === 'string') ? gameObj.currentBoss : null;

    try {
        await pool.query(`
            INSERT INTO Game (id, clicks, currentFloor, currentBoss, unlockedFloors, defeatedBosses, machines)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (id) DO UPDATE SET
                clicks = $2,
                currentFloor = $3,
                currentBoss = $4,
                unlockedFloors = $5,
                defeatedBosses = $6,
                machines = $7
        `, [
            1,
            Math.floor(gameObj.clicks),
            Math.floor(gameObj.currentFloor),
            currentBoss,
            JSON.stringify(gameObj.unlockedFloors || []),
            JSON.stringify(gameObj.defeatedBosses || []),
            JSON.stringify(gameObj.machines || [])
        ]);

        res.send({ status: 'ok' });
    } catch (err) {
        console.error('POST /api/game error:', err);
        res.status(500).send('Błąd serwera przy zapisie stanu gry');
    }
});

// DELETE /api/game do resetu
app.delete('/api/game', async (req, res) => {
    try {
        await pool.query('DELETE FROM Game WHERE id = $1', [1]);
        res.send({ status: 'deleted' });
    } catch (err) {
        console.error('DELETE /api/game error:', err);
        res.status(500).send('Błąd serwera przy usuwaniu stanu gry');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend działa na http://localhost:${PORT}`);
});