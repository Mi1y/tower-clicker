// backend/server.js
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');

const floors = require(path.join(__dirname, '..', 'data', 'floors'));
const machinesData = require(path.join(__dirname, '..', 'data', 'machines'));

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'your_username',
    password: 'your_password;',
    server: 'localhost',
    database: 'your_database',
    options: {
        trustServerCertificate: true
    }
};

let poolPromise = null;
async function getPool() {
    if (!poolPromise) {
        poolPromise = sql.connect(dbConfig).catch(err => {
            console.error('Błąd przy łączeniu z bazą:', err);
            poolPromise = null;
            throw err;
        });
    }
    return poolPromise;
}

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
        const pool = await getPool();
        const result = await pool.request()
            .input('id', sql.Int, 1)
            .query(`
        SELECT clicks, currentFloor, currentBoss,
               unlockedFloors, defeatedBosses,
               machines
        FROM Game
        WHERE id = @id
      `);
        if (result.recordset.length > 0) {
            const row = result.recordset[0];
            // Parsujemy kolumny JSON-owe
            let state = {};
            try {
                state.clicks = row.clicks;
                state.currentFloor = row.currentFloor;
                state.currentBoss = row.currentBoss;
                state.unlockedFloors = JSON.parse(row.unlockedFloors);
                state.defeatedBosses = JSON.parse(row.defeatedBosses);
                state.machines = JSON.parse(row.machines);
            } catch (e) {
                console.warn('Błąd parsowania JSON z bazy, wrzucam default:', e);
                state = defaultGameState();
            }
            res.json(state);
        } else {
            // brak wiersza w tabeli -> zwracamy default
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
    const unlockedFloorsJSON = JSON.stringify(gameObj.unlockedFloors || []);
    const defeatedBossesJSON = JSON.stringify(gameObj.defeatedBosses || []);
    const machinesJSON = JSON.stringify(gameObj.machines || []);
    const currentBoss = (typeof gameObj.currentBoss === 'string') ? gameObj.currentBoss : null;

    try {
        const pool = await getPool();
        await pool.request()
            .input('id', sql.Int, 1)
            .input('clicks', sql.Int, gameObj.clicks)
            .input('currentFloor', sql.Int, gameObj.currentFloor)
            .input('currentBoss', sql.NVarChar(100), currentBoss)
            .input('unlockedFloors', sql.NVarChar(sql.MAX), unlockedFloorsJSON)
            .input('defeatedBosses', sql.NVarChar(sql.MAX), defeatedBossesJSON)
            .input('machines', sql.NVarChar(sql.MAX), machinesJSON)
            .query(`
          MERGE Game AS target
          USING (SELECT @id AS id) AS source
            ON (target.id = source.id)
          WHEN MATCHED THEN
            UPDATE SET 
              clicks = @clicks,
              currentFloor = @currentFloor,
              currentBoss = @currentBoss,
              unlockedFloors = @unlockedFloors,
              defeatedBosses = @defeatedBosses,
              machines = @machines
          WHEN NOT MATCHED THEN
            INSERT (id, clicks, currentFloor, currentBoss, unlockedFloors, defeatedBosses, machines)
            VALUES (@id, @clicks, @currentFloor, @currentBoss, @unlockedFloors, @defeatedBosses, @machines);
        `);
        res.send({ status: 'ok' });
    } catch (err) {
        console.error('POST /api/game error:', err);
        res.status(500).send('Błąd serwera przy zapisie stanu gry');
    }
});


// DELETE /api/game do resetu
app.delete('/api/game', async (req, res) => {
    try {
        const pool = await getPool();
        await pool.request()
            .input('id', sql.Int, 1)
            .query('DELETE FROM Game WHERE id = @id');
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
