import { useEffect, useState } from 'react';
import AdminRegistration from '../AdminRegistration/AdminRegistration';
import authService from '@/http/userAPI';
import UserField from '../UserField/UserField';
import { DeleteFn } from '@/types/uiTypes';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/context/StoreContext';
import styles from './UsersModule.module.scss';
import { Button } from '@/components/ui';
import makeErrorMsg from '../utils/makeErrorMsg';

const UsersModule = observer(() => {
  const { user, adminErrors } = useRootStore();
  const [active, setActive] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await authService.getUsers();
        user.setUsers(data);
      } catch (error: unknown) {
        if (!(error instanceof Error)) {
          return;
        }
        const errorMsg = makeErrorMsg(error);
        adminErrors.setError(errorMsg);
      }
    })();
  }, [user]);

  const handleRemove: DeleteFn = async (id) => {
    const data = await authService.removeUser(id);
    console.log(data);
  };
  return (
    <div>
      <Button appearance="primary" onClick={() => setActive(!active)}>
        Показать пользователей
      </Button>
      <div data-show-users={active} className={styles.container}>
        <div className={styles.inside}>
          <AdminRegistration />
          {user.users.map((user) => (
            <UserField key={user.id} user={user} onDelete={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default UsersModule;
