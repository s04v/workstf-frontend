import Http from "./config";
import resolve from "./resolve";

const Account = {
	getInfo: async () => {
		return await resolve(Http.get("/user").then((res) => res.data));
	},
};

export default Account;
