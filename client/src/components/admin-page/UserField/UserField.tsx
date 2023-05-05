import { UserData } from '@/types/userType';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import { DeleteFn } from '@/types/uiTypes';

interface Props {
  user: UserData;
  onRemove: DeleteFn;
}

const UserField = ({ user, onRemove }: Props) => {
  return (
    <div>
      <span>{user.email}</span> <DeleteBtn onDelete={onRemove} id={user.id} />
    </div>
  );
};

export default UserField;
