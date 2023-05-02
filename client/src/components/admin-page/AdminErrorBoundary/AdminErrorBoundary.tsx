import { useEffect, useState } from 'react';
import { useRootStore } from '@/context/StoreContext';
import { observer } from 'mobx-react-lite';
import styles from './AdminErrorBoundary.module.scss';

const AdminErrorBoundary = observer((): JSX.Element => {
  const { adminErrors } = useRootStore();
  const [error, setError] = useState(false);

  useEffect(() => {
    let firstTO: ReturnType<typeof setTimeout> | null = null;
    let secondTO: ReturnType<typeof setTimeout> | null = null;
    if (adminErrors.error) {
      setError(true);
      firstTO = setTimeout(() => {
        setError(false);
      }, 5000);
      secondTO = setTimeout(() => {
        adminErrors.setError('');
      }, 5300);
    }

    return () => {
      if (firstTO && secondTO) {
        clearTimeout(firstTO);
        clearTimeout(secondTO);
      }
    };
  }, [adminErrors.error]);

  return (
    <div data-error={error} className={styles.container}>
      {adminErrors.error}
    </div>
  );
});

export default AdminErrorBoundary;
