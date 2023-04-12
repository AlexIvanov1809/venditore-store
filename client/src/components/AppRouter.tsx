import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authRoutes, publicRoutes } from '../routes';
import { useRootStore } from '@/context/StoreContext';

const AppRouter = observer(() => {
  const { user } = useRootStore();
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
});

export default AppRouter;
