const databaseImage = {
    "participants": [
        "id",
        "name"
    ],
    "positions": [
        "id",
        "name"
    ],
    "positionsOfParticipants": [
        "participantId",
        "listPositionsId"
    ],
    "busyParticipants": [
        "id"
    ],
    "priorityParticipants": [
        "id",
    ],
    "dayScheme": [
        "positionId",
        "participantId"
    ]
};
const database = {
    "participants": [
        {
            "id": "1",
            "name": "Мокиенко А"
        },
        {
            "id": "2",
            "name": "Черкас Вл"
        },
        {
            "id": "3",
            "name": "Алексеенко А"
        },
        {
            "id": "4",
            "name": "Булавин А"
        }
    ],
    "positions": [
        {
            "id": "1",
            "name": "Звук 1"
        },
        {
            "id": "2",
            "name": "Звук 2"
        },
        {
            "id": "3",
            "name": "Видео 1"
        },
        {
            "id": "4",
            "name": "Видео 2"
        }
    ],
    "positionsOfParticipants": [
        {
            "participantId": "1",
            "listPositionsId": "1 2 3"
        },
        {
            "participantId": "2",
            "listPositionsId": "1 2 3 4"
        },
        {
            "participantId": "3",
            "listPositionsId": "4"
        },
        {
            "participantId": "4",
            "listPositionsId": "1 2 3"
        }
    ],
    "busyParticipants": [
        {
            "id": "1"
        },
        {
            "id": "2"
        },
        {
            "id": "3"
        },
        {
            "id": "4"
        }
    ],
    "priorityParticipants": [
        {
            "id": "4"
        },
        {
            "id": "7"
        }
    ],
    "dayScheme": [
        {
            "positionId": "1",
            "participantId": "6"
        },
        {
            "positionId": "2",
            "participantId": "2"
        },
        {
            "positionId": "3",
            "participantId": "7"
        },
        {
            "positionId": "4",
            "participantId": "4"
        }
    ]
};
class ConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionError';
    }
}
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}
class Connection {
    constructor(tableName) {
        this.tableName = tableName;
        if (databaseImage[this.tableName] == undefined) {
            throw new ConnectionError('Table no exist: "' + tableName + '"');
        }
        this.columns = databaseImage[this.tableName];
    }
}
class Database extends Connection {
    constructor(tableName) {
        super(tableName);
    }
    insert(col) {
        const id = this.getUniqueID(col);
        let row = {};
        databaseImage[this.tableName].forEach(c => {
            if (c == col) {
                row[c] = id;
            } else {
                row[c] = '';
            }
        });
        database[this.tableName].push(row);
        return id;
    }
    read(col, val) {
        this.#throwIfNoExistColumn(col);
        let found;
        database[this.tableName].forEach(row => {
            if (row[col] == val) {
                found = row;
            }
        });
        return found;
    }
    delete(columnName, value) {
        if (!this.#isExistColumn(columnName)) {
            throw new DatabaseError('In table "' + this.tableName + '" no exist column "' + columnName + '"');
        }
        database[this.tableName] = database[this.tableName].filter(row => row[columnName] != value);
    }
    update(columnNameTarget, valueTarget, columnNameUpdate, valueUpdate) {
        this.#throwIfNoExistColumn(columnNameTarget);
        this.#throwIfNoExistColumn(columnNameUpdate);
        database[this.tableName].forEach(row => {
            if (row[columnNameTarget] == valueTarget) {
                row[columnNameUpdate] = valueUpdate;
            }
        });
    }
    getUniqueID(col='id') {
        this.#throwIfNoExistColumn(col);
        // Pull out identifiers current table
        let ids = [];
        database[this.tableName].forEach(row => {
            if (row[col] == '') {
                throw new DatabaseError(`In database "${this.tableName}" in column "${col}" detected bad ID: "${row[col]}"`);
            }
            ids.push(row[col]);
        });
        // Initiate unique id
        const set = new Set(ids.map(Number));
        let candidate = 1;
        while (set.has(candidate)) {
            candidate++;
        }
        return String(candidate);
    }
    #isExistColumn(columnName) {
        return databaseImage[this.tableName].includes(columnName);
    }
    #throwIfNoExistColumn(col) {
        if (!this.#isExistColumn(col)) {
            throw new DatabaseError('In table "' + this.tableName + '" no exist column "' + col + '"');
        }
    }
}