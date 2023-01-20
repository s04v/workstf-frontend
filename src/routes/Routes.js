import BasePage from "@src/layouts/base";
import SettingsLayout from "@src/layouts/settingsLayout";
import Apps from "@src/screens/apps";
import Settings from "@src/screens/settings";
import FieldSettings from "@src/screens/fieldSettings";
import Home from "@src/screens/home";
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
		Component: Home,
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
		Component: Settings,
		Layout: ({ children }) => (
			<BasePage>
				<SettingsLayout>{children}</SettingsLayout>
			</BasePage>
		),
	},
	// {
	// 	path: "/settings/:id",
	// 	auth: true,
	// 	exact: true,
	// 	Component: FieldSettings,
	// 	Layout: ({ children }) => (
	// 		<BasePage>
	// 			<SettingsLayout>{children}</SettingsLayout>
	// 		</BasePage>
	// 	),
	// },
];

export default routes;
