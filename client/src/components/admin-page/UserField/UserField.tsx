import { UserData } from '@/types/userType';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import { DeleteFn } from '@/types/uiTypes';
import styles from './UserField.module.scss';

interface Props {
  user: UserData;
  onDelete: DeleteFn;
}

const UserField = ({ user, onDelete }: Props) => {
  return (
    <div className={styles.user}>
      <span className={styles.user_name}>{user.email}</span> <DeleteBtn onDelete={onDelete} id={user.id} />
    </div>
  );
};

export default UserField;
