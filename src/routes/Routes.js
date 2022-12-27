import BasePage from "@src/layouts/base";
import Settings from "@src/layouts/settings";
import Apps from "@src/screens/apps";
import FieldSettings from "@src/screens/fieldSettings";
import ObjectSettings from "@src/screens/objectSettings";
import Signin from "@src/screens/signin";
import Signup from "@src/screens/signup";

const routes = [
	{
		path: "/signin",
		exact: true,
		Component: Signin,
	},
	{
		path: "/signup",
		exact: true,
		Component: Signup,
	},
	{
		path: "/home",
		auth: true,
		exact: true,
		Component: () => <div></div>,
		Layout: BasePage,
	},
	{
		path: "/:appName/:userId",
		auth: true,
		exact: true,
		Component: Apps,
		Layout: BasePage,
	},
	{
		path: "/:appName/:userId/:id",
		auth: true,
		exact: true,
		Component: Apps,
		Layout: BasePage,
	},
	{
		path: "/settings",
		auth: true,
		exact: true,
		Component: ObjectSettings,
		Layout: ({ children }) => (
			<BasePage>
				<Settings>{children}</Settings>
			</BasePage>
		),
	},
	{
		path: "/settings/:id",
		auth: true,
		exact: true,
		Component: FieldSettings,
		Layout: ({ children }) => (
			<BasePage>
				<Settings>{children}</Settings>
			</BasePage>
		),
	},
];

export default routes;
