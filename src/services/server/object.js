import Http from './config';
import resolve from './resolve';

const Object = {
    create: async (data) => {
      return await resolve(Http.post('/object', data).then(res => res.data));
    },
    getByAppName: async (appName) => {
      return await resolve(Http.get(`/object/${appName}`).then(res => res.data));
    },
    getList: async () => {
      return await resolve(Http.get('/object').then(res => res.data));
    },
    get: async (id) => {
      return await resolve(Http.get(`/object/App/${id}`)).then(res => res.data);
    },
    delete: async (appName, id) => {
      return await resolve(Http.delete(`/object/${id}`).then(res => res.data));
    },
    createField: async (objectId, data) => {
      return await resolve(Http.post(`/object/${objectId}/field`, data).then(res => res.data));
    },
    updateField: async (objectId, data) => {
      return await resolve(Http.patch(`/object/${objectId}/field`, data).then(res => res.data));
    },
    deleteField: async (objectId, id) => {
      return await resolve(Http.delete(`/object/${objectId}/field/${id}`).then(res => res.data));
    },
    createRecord: async (objectId, data) => {
      return await resolve(Http.post(`/object/${objectId}/record`, data).then(res => res.data));
    },
    getRecords: async (objectId, skip = 0, take = 5) => {
      return await resolve(Http.get(`/object/${objectId}/record?skip=${skip}&take=${take}`).then(res => res.data));
    },
    updateRecord: async (objectId, data) => {
      return await resolve(Http.patch(`/object/${objectId}/record`, data).then(res => res.data));
    },
    deleteRecord: async (objectId, id) => {
      return await resolve(Http.delete(`/object/${objectId}/record/${id}`).then(res => res.data));
    }
    // update: async (id, data) => {
    //   return await resolve(Http.patch(`/object/${appName}/${id}`).then(res => res.data));
    // }
} 

export default Object;