import AuthProvider from "@src/providers/auth";
import { Route, Routes } from "react-router-dom";

export const RouteCombiner = ({ routes }) => {
	const RoutesMap = routes.map(
		({
			auth = false,
			exact = true,
			Layout = ({ children }) => <>{children}</>,
			Component,
			path,
		}) => {
			const ComponentWithLayout = () => {
				return auth ? (
					<Layout>
						<Component />
					</Layout>
				) : (
					<AuthProvider>
						<Layout>
							<Component />
						</Layout>
					</AuthProvider>
				);
			};

			return (
				<Route
					key={path}
					exact={exact}
					element={<ComponentWithLayout />}
					path={path}
				/>
			);
		}
	);
	return <Routes>{RoutesMap}</Routes>;
};
