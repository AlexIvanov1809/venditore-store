import { useState } from 'react';
import { FnOnChange } from '@/types/uiTypes';
import httpService from '@/http/productAPI';
import styles from './EntitiesEditor.module.scss';
import { Button, TextInput } from '../../ui';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import EntityEditorProps from './EntityEditor.props';
import useValidation from '@/hooks/useValidation';
import { VALIDATOR_CONFIG } from '@/constants/configConstants';
import { useRootStore } from '@/context/StoreContext';

function EntitiesEditor({ onDelete, label, onHide, item, endpoint }: EntityEditorProps) {
  const { adminErrors } = useRootStore();
  const [value, setValue] = useState<{ name: string }>({ name: item ? item.name : '' });
  const error = useValidation(value.name, VALIDATOR_CONFIG.required);

  const changeHandle: FnOnChange = ({ value }) => {
    if (typeof value === 'string') {
      setValue({ name: value });
    }
  };

  const onSubmit = async () => {
    try {
      if (item) {
        await httpService.editEntityItem(endpoint, item.id, value);
      } else {
        await httpService.createEntityItem(endpoint, value);
      }
      onHide(false);
    } catch (e: any) {
      const errorMsg = typeof e.response.data === 'string' ? e.response.data : e.response.data.message;
      adminErrors.setError(errorMsg);
    }
  };

  return (
    <div className={styles.main_entity}>
      <div className={styles.entity_container}>
        <h5>{label}</h5>
        <div className={styles.entity_form}>
          <TextInput
            error={error}
            name="name"
            value={value.name}
            onChange={changeHandle}
            type="text"
            placeholder="Enter value"
          />
          <div className={styles.buttons}>
            {item && <DeleteBtn onDelete={onDelete} id={item.id} />}
            <Button appearance="danger" onClick={() => onHide(false)}>
              Close
            </Button>
            <Button disabled={!!error} appearance="primary" onClick={onSubmit}>
              {item ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntitiesEditor;
