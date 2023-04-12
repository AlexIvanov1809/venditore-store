import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/context/StoreContext';
import { authRoutes, publicRoutes } from '../routes';

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
