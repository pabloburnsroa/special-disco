import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { Landing } from "../components/landing/Landing";
import Home from "../pages/home/Home";

<Routes>
  <Route path="/" element={<Navigation />}>
    {/* Protected route? If user logged in - return Home */}
    <Route index element={user ? <Home /> : <Navigate to="/auth" />} />
    {/* <Route path="/landing" element={<Landing />} /> */}
    <Route
      path="/auth"
      element={!user ? <Authentication /> : <Navigate to="/" />}
    />
  </Route>
</Routes>;

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const protectedRoutes = [
  {
    path: "/app/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

const publicRoutes = [
    {
        path: '/auth/*',
        
    }
]

export const AppRoutes = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const commonRoutes = [{ path: "/", element: <Landing /> }];
  const routes = user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <>{element}</>;
};
