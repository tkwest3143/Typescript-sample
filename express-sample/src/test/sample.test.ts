import request from 'supertest'
import { App } from '../app'
import { Chat } from "../entity/Chat";
import { User } from '../entity/User';

const server = new App();

test('post /chats/post', async() => {
    const user: User = new User();
    user.id = 1;
    const chat: Chat = new Chat();
    chat.comment = "test comment";
    chat.contributor = user;
    console.log(JSON.stringify(chat));
    return request(server.app)
        .post('/chats/post')
        .send(JSON.stringify(chat))
        .then((response) => {
            expect(response.status).toEqual(200);
        });
});
test('get /users', () => {
    return request(server.app)
        .get('/users')
        .then((response) => {
            expect(response.status).toEqual(200);
        });
});

