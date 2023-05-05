import { useEffect } from 'react';
import AdminRegistration from '../AdminRegistration/AdminRegistration';
import authService from '@/http/userAPI';
import UserField from '../UserField/userField';
import { DeleteFn } from '@/types/uiTypes';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/context/StoreContext';

const UserModule = observer(() => {
  const { user } = useRootStore();
  useEffect(() => {
    (async () => {
      try {
        const data = await authService.getUsers();
        user.setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  const handleRemove: DeleteFn = async (id) => {
    const data = await authService.removeUser(id);
    console.log(data);
  };
  return (
    <div>
      <AdminRegistration />
      {user.users.map((user) => (
        <UserField key={user.id} user={user} onRemove={handleRemove} />
      ))}
    </div>
  );
});

export default UserModule;
