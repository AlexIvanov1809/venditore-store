import { useState } from 'react';
import { FnOnChange } from '@/types/uiTypes';
import httpService from '@/http/productAPI';
import styles from './EntitiesEditor.module.css';
import { Button, TextInput } from '../../ui';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import EntityEditorProps from './EntityEditor.props';

function EntitiesEditor({ onDelete, label, onHide, item, endpoint }: EntityEditorProps) {
  const [value, setValue] = useState<{ name: string }>({ name: item ? item.name : '' });

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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.main_entity}>
      <div className={styles.entity_container}>
        <h5>{label}</h5>
        <div className={styles.entity_form}>
          <TextInput name="name" value={value.name} onChange={changeHandle} type="text" placeholder="Enter value" />
          <div className={styles.buttons}>
            {item && <DeleteBtn onDelete={onDelete} id={item.id} />}
            <Button appearance="danger" onClick={() => onHide(false)}>
              Close
            </Button>
            <Button appearance="primary" onClick={onSubmit}>
              {item ? 'Обновить' : 'Создать'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntitiesEditor;
