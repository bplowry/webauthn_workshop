interface Database {
    users: {
        [username: string]: User;
    };
}

interface User {
    id: string;
    username: string;
    displayName: string;
    passwordHash: string;
}

const database: Database = {
    users: {}
};

export default database;
