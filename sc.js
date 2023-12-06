// docker run -p 5201:3306 --name webowe -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=test -d mysql:8.2.0

const mysql = require('mysql2');

let link = mysql.createConnection({
    host: 'localhost',
    port: '5201',
    user: 'root',
    password: 'root',
    database: 'test'
});

link.connect(function (err) {
    if (!!err) {
        console.log('Error');
    } else {
        console.log('Connected');

        // Zapytanie do usunięcia tabeli, jeśli istnieje
        const dropTableQuery = `
            DROP TABLE IF EXISTS mytable
        `;

        // Wykonaj zapytanie do usunięcia tabeli
        link.query(dropTableQuery, function (err, results, fields) {
            if (err) {
                console.log('Error dropping table:', err.message);
            } else {
                console.log('Table dropped if it existed');

                // Zapytanie do utworzenia tabeli
                const createTableQuery = `
                    CREATE TABLE mytable (
                        id INT PRIMARY KEY,
                        inted INT
                    )
                `;

                // Wykonaj zapytanie do utworzenia tabeli
                link.query(createTableQuery, function (err, results, fields) {
                    if (err) {
                        console.log('Error creating table:', err.message);
                    } else {
                        console.log('Table created');

                        // Zapytanie do dodania rekordów
                        const insertRecordsQuery = `
                            INSERT INTO mytable (id, inted) VALUES
                            (1, 100),
                            (2, 200)
                        `;

                        // Wykonaj zapytanie do dodania rekordów
                        link.query(insertRecordsQuery, function (err, results, fields) {
                            if (err) {
                                console.log('Error inserting records:', err.message);
                            } else {
                                console.log('Records inserted successfully');

                                // Zapytanie UPDATE do zmiany wartości inted na 8 dla rekordu o id równym 2
                                const updateRecordQuery = `
                                    UPDATE mytable SET inted = 8 WHERE id = 2
                                `;

                                // Wykonaj zapytanie UPDATE
                                link.query(updateRecordQuery, function (err, results, fields) {
                                    if (err) {
                                        console.log('Error updating record:', err.message);
                                    } else {
                                        console.log('Record updated successfully');

                                        // Zapytanie SELECT do pobrania wszystkich danych z tabeli
                                        const selectAllQuery = 'SELECT * FROM mytable';

                                        // Wykonaj zapytanie SELECT
                                        link.query(selectAllQuery, function (err, results, fields) {
                                            if (err) {
                                                console.log('Error selecting records:', err.message);
                                            } else {
                                                console.log('All records retrieved:');
                                                console.log(results);
                                            }

                                            // Zakończ połączenie po wykonaniu operacji
                                            link.end();
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});
