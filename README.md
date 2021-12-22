# CHAT-APP DOCUMENTATION

| METHOD | EndPoint                 | Description                                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| POST   | /api/register            | Register user                                                                                          |
| POST   | /api/login               | login user to get token for authentication                                                             |
| POST   | /api/chat                | Create message and send to another user                                                                |
| POST   | /api/chat/:recId         | Reply user message, recId should be id of user that will recieve a reply message                       |
| GET    | /api/chat/:sendId/:recId | Display all chat between two user, sendId=id user who send a message,recId=user that recieve a message |
| GET    | /api/chat/               | Display list message of user(if user A has been chat with B and C, list message should be A-B and A-C) |

# NOTE

All endpoint except register and login required token to access, make sure you have register and login first and paste token to header

# HOW TO RUN

in root folder

```bash
$ npm install
$ npm start
```

# FEATURE API

```
1. Users can send a message to another user
2. Can list all message between two users
3. User can reply message from another user
4. User that has been login can list all their message history ( if user A has been chat with user B and D, the list should be list  message    A-B and A-D) and the message display will be the last message between user
```
