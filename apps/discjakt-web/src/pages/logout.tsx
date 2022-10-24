import useUser from "src/frontend/hooks/use-user";

const LogoutPage = () => {
  const { logout } = useUser();

  logout();

  return null;
};

export default LogoutPage;
