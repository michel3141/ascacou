import axios from 'axios';
//https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

const myAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',

  },
});

const Collection = path => {
  const target = id => Resource(`${path}/${id}`);
  target.get = (params = {}) => myAxios.get(path, {params}).then(x=>x.data);
  return target;
}

const Resource = path => {
  const target = function(){};
  target.path = path;
  target.get = (params = {}) => myAxios.get(path, {params}).then(x=>x.data);
  target.set = (resource, params = {}) => myAxios.put(path, resource, {params}).then(x=>x.data);
  target.delete = (params = {}) => myAxios.delete(path, {params}).then(x=>x.data);
  target.update = (resource={}, params = {}) => myAxios.patch(path, resource, {params}).then(x=>x.data);
  target.post = (resource = {}, params = {}) => myAxios.post(path, resource, {params}).then(x=>x.data);
  return new Proxy(target, {
    get: (target, collection) => {
      if(typeof target[collection] === 'function') {
        return target[collection];
      } else {
        return Collection(`${target.path}/${collection}`);
      }
    }
  })
}

const Service = path => new Proxy({},
  {
    get: (target, collection) => Collection(`${path}/${collection}`),
  }
);

export default Service;
