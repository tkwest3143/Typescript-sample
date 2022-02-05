import 'reflect-metadata';
import express from 'express';
import { getCustomRepository, createConnection } from 'typeorm';
import { UserRepository } from './repository/UserRepository';
import { Chat } from './entity/Chat';
import bodyParser from 'body-parser';
import { Room } from './entity/Room';
import { OperatorSite } from './puppeteer/OperatorSite';

import site from '../site.config.json';
import { Site } from './entity/Site';
export class App {
  public app: express.Express = express();
  constructor() {
    this.setupHeader();
    this.router();
  }
  public setupHeader() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*'); // セキュリティリスク有り
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }
  public router() {
    this.app.get(
      '/web-search/:siteId',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const siteRepository = connection.getRepository(Site);
        const site = (await siteRepository.findOne(req.params.siteId)) as Site;
        console.log(req.params);
        const operator = new OperatorSite(site);
        const results = await operator.getResult(req.params.siteId);
        connection.close();
        return res.send(results);
      }
    );
    // get all users
    this.app.get(
      '/users',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const userRepository = getCustomRepository(UserRepository);
        const users = await userRepository.find();
        console.log(users);
        connection.close();
        return res.send(users);
      }
    );
    this.app.post('/users', async function (req, res) {
      console.log('post /users');
      return res.end();
    });

    // get login user infomation
    this.app.get(
      '/users/:id',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const userRepository = getCustomRepository(UserRepository);
        const results = await userRepository.findOne(req.params.id);
        console.log(results);
        connection.close();
        return res.send(results);
      }
    );

    //edit user
    this.app.post(
      '/users/:id',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const userRepository = getCustomRepository(UserRepository);
        const results = await userRepository.findOne(req.params.id);
        console.log(results);
        connection.close();
        return res.send(results);
      }
    );

    // get Chat by room id
    this.app.get(
      '/chats/:id',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const chatRepository = connection.getRepository(Chat);
        const results = await chatRepository.find({
          where: [
            {
              room: { id: req.params.id },
            },
          ],
          relations: ['contributor', 'room'],
          order: {
            createdAt: 'ASC',
          },
        });
        connection.close();
        console.log(results);
        return res.send(results);
      }
    );

    // post chat
    this.app.post('/chats/post', async (req, res) => {
      console.log('chat body' + req.body);
      const connection = await createConnection();
      const chatRepository = connection.getRepository(Chat);

      const chat = await chatRepository.create(req.body);
      const results = await chatRepository.save(chat);
      console.log(results);
      connection.close();
      return res.send(results);
    });

    // get room by room id
    this.app.get(
      '/room/:id',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const roomRepository = connection.getRepository(Room);
        const results = await roomRepository.find({
          where: [
            {
              id: req.params.id,
            },
          ],
          relations: ['manager', 'participant'],
        });
        connection.close();
        console.log(results);
        return res.send(results);
      }
    );

    // create room
    this.app.get(
      '/room/create',
      async (req: express.Request, res: express.Response) => {
        const connection = await createConnection();
        const roomRepository = connection.getRepository(Room);
        console.log('chat body' + req.body);
        const room = await roomRepository.create(req.body);
        const results = await roomRepository.save(room);
        console.log(results);
        connection.close();
        return res.send(results);
      }
    );
  }
}
