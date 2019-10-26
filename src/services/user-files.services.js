import {ajax} from './index';

export const getFile = (id) => {
    return ajax.get(`/user-files/${id}`);
}

export const getAllFiles = () => {
    return ajax.get('/user-files'); 
}

export const deleteFile = (id) => {
    return ajax.delete(`/user-files/${id}`);
}

export const createFile = (userFile) => {
    return ajax.post(`/user-files`, {
        userFile
    });
}

export const updateFile = (id, fileUpdates) => {
    return ajax.patch(`/user-files/${id}`,{
       fileUpdates 
    });
}
