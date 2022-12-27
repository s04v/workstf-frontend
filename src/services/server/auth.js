import Http from "./config";
import resolve from "./resolve";

const Auth = {
	signIn: async (data) => {
		return await resolve(
			Http.post("/auth/signin", data).then((res) => res.data)
		);
	},
	signUp: async (data) => {
		const res = await resolve(
			Http.post("/auth/signup", data).then((res) => res.data)
		);
		console.log(res);
		return res;
	},
};

export default Auth;
