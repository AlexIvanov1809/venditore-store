import { useState } from 'react';
import { DeleteFn } from '@/types/uiTypes';
import styles from './DeleteBtn.module.scss';
import { CheckBox, IconButton } from '../../ui';

interface DeleteBtn {
  onDelete: DeleteFn;
  id: string | number;
}

function DeleteBtn({ onDelete, id }: DeleteBtn) {
  const [confirm, setConfirm] = useState(false);

  const removeHandler = () => {
    setConfirm(!confirm);
  };

  return (
    <div className={styles.remove_btn}>
      <CheckBox name="del" value={confirm} onChange={removeHandler}>
        Подтверждение удаления
      </CheckBox>
      <IconButton appearance="danger" onClick={() => onDelete(id)} icon="Delete" disabled={!confirm} />
    </div>
  );
}

export default DeleteBtn;
