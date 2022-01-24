import "reflect-metadata";
import express from 'express'
import { getCustomRepository, createConnection } from "typeorm";
import { UserRepository } from "./repository/UserRepository";
import { User } from "./entity/User";


createConnection().then(async connection => {
    const userRepository = getCustomRepository(UserRepository);

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

    //一覧取得
    app.get('/users', async (req: express.Request, res: express.Response) => {

        const users = await userRepository.find();
        console.log(users)
        res.send(users)
    });
    app.post('/users', async function(req, res) {
        console.log("post /users")
        res.end();
      });
    //ユーザ取得
    app.get('/users/:id', async (req: express.Request, res: express.Response) => {
        console.log("results")
        const results = await userRepository.findOne(req.params.id);
        console.log(results)
        return res.send(results);
    });

    //edit user
    app.post('/users/:id', async (req: express.Request, res: express.Response) => {
        const results = await userRepository.findOne(req.params.id);
        console.log(results)
        return res.send(results);
    });
});
