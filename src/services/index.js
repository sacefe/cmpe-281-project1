import axios from 'axios';
import { getFile, getAllFiles, deleteFile, updateFile, createFile} from './user-files.services';
import { createUser, getUser, updateUser, getAllUser, deleteUser, login } from './users.services';

const ajax = axios.create({
    baseURL: 'http://localhost:3030',
//    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export {ajax, getFile, getAllFiles, deleteFile, updateFile, createFile, createUser,
        getUser, updateUser, getAllUser, deleteUser, login };
 