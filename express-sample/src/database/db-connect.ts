import * as mysql from "promise-mysql";
import dbConfig from "./db-config";

export class DBConnect {

    connection = async () => {
        return await mysql.createConnection(dbConfig.db);
    };

    SELECT(query: string): void {
        var result = this.connection().then((conn) => {
            const result = conn.query(query);
            conn.end();
            result.then((rows: any[]) => {
                console.log(rows);
                let num = 0;
                rows.forEach(row => {
                    num++;
                    console.log(num);
                    console.log(row.RowDataPacket);
                    row.RowDataPacket;
                });
            })
            console.log(result.value);
            return result;
        });
        console.log(result.then);
    }
}