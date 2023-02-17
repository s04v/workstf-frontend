import { DataArrayOutlined } from "@mui/icons-material";
import Http from "./config";
import resolve from "./resolve";

const App = {
  create: async (data) => {
		return await resolve(Http.post("/custom-app", data).then((res) => res.data));
	},
  get: async (id) => {
		return await resolve(Http.get(`/custom-app/${id}`).then((res) => res.data));
	},
  getList: async () => {
		return await resolve(Http.get(`/custom-app`).then((res) => res.data));
	},
	delete: async (id) => {
		return await resolve(Http.delete(`/custom-app/${id}`).then((res) => res.data));
	},
  update: async (id, data) => {
		return await resolve(Http.patch(`/custom-app/${id}`, data).then((res) => res.data));
	},
  createAssociation: async (id, object) => {
		return await resolve(Http.post(`/custom-app/${id}/association`, { object }).then((res) => res.data));
	},
  removeAssociation: async (id, object) => {
		return await resolve(Http.delete(`/custom-app/${id}/association`, { data: { object } }).then((res) => res.data));
	},
}

export default App;