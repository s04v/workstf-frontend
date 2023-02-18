import BasePage from "@src/layouts/base";
import SettingsLayout from "@src/layouts/settingsLayout";
import Apps from "@src/screens/apps";
import Settings from "@src/screens/settings";
import FieldSettings from "@src/screens/fieldSettings";
import Home from "@src/screens/home";
import ObjectSettings from "@src/screens/objectSettings";
import Signin from "@src/screens/signin";
import Signup from "@src/screens/signup";
import AppSettings from "@src/screens/appSettings";
import SingleRecord from "@src/screens/singleRecord";
import { createBrowserRouter, Outlet } from "react-router-dom";

const routes = [
	
	{
		path: "/*",
		auth: true,
		Component: () => <div></div>,
		Layout: BasePage,
		nested: [ {
			path: "2",
			Component: () => <div>nested <Outlet /> </div>,
			Layout: ({ children }) => (
				<SettingsLayout>{children}</SettingsLayout>)
			},
			{
				path: "home",
				auth: true,
				exact: true,
				Component: Home,
			},
			{
				path: "/:appName/:userId",
				auth: true,
				exact: true,
				Component: Apps,
			},
			{
				path: "/:appName/:userId/:id",
				auth: true,
				exact: true,
				Component: Apps,
			},
			{
				path: "/:appName/:userId/:objectId/:recordId",
				auth: true,
				exact: true,
				Component: SingleRecord,
			},
			{
				path: "/settings/*",
				auth: true,
				// Component: Settings,
				Layout: ({ children }) => (
					<SettingsLayout>{children}</SettingsLayout>
				),
				nested: [
					{
						path: "/",
						auth: true,
						Component: Settings,
						
					},
					// {
					// 	path: "/fields",
					// 	auth: true,
					// 	Component: FieldSettings,
					// },
					{
						path: "/custom-app",
						auth: true,
						exact: true,
						Component: AppSettings,
					},
				]
			},
		]
	},
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
	
];

export default routes;