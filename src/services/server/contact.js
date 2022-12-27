import Http from "./config";
import resolve from "./resolve";

const Contact = {
	create: async (data) => {
		return await resolve(Http.post("/contact", data).then((res) => res.data));
	},
	get: async (skip, take) => {
		return await resolve(
			Http.get(`/contact?skip=${skip}&take=${take}`).then((res) => res.data)
		);
	},
	delete: async (id) => {
		return await resolve(Http.delete(`/contact/${id}`).then((res) => res.data));
	},
	update: async (id, data) => {
		return await resolve(
			Http.patch(`/contact/${id}`, data).then((res) => res.data)
		);
	},
};

export default Contact;
