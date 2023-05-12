import { useEffect, useState } from 'react';
import authService from '@/http/userAPI';
import { DeleteFn } from '@/types/uiTypes';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/context/StoreContext';
import { Button } from '@/components/ui';
import styles from './UsersModule.module.scss';
import UserField from '../UserField/UserField';
import AdminRegistration from '../AdminRegistration/AdminRegistration';
import makeErrorMsg from '../utils/makeErrorMsg';

const UsersModule = observer(() => {
  const { user, adminErrors } = useRootStore();
  const [active, setActive] = useState(false);

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
          {user.users.map((oneUser) => (
            <UserField key={oneUser.id} user={oneUser} onDelete={handleRemove} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default UsersModule;
