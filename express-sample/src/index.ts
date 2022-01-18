import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import express from 'express'
import { DBConnect } from './database/db-connect'

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.name = "Timber";
    user.email = "aaa@ccc.com";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CROS対応（というか完全無防備：本番環境ではだめ絶対）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.listen(3000, () => {
    console.log("Start on port 3000.")
});

const users: User[] = [
    { id: 1, name: "User12", email: "user1@test.local" },
    { id: 2, name: "User2", email: "user2@test.local" },
    { id: 3, name: "User3", email: "user3@test.local" }
];

//一覧取得
app.get('/users', (req: express.Request, res: express.Response) => {
    var dbconnect = new DBConnect;
    dbconnect.SELECT("select * from users");
    res.send(JSON.stringify(users))
});
