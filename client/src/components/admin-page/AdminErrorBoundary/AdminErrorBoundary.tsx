import { useEffect, useState } from 'react';
import styles from './AdminErrorBoundary.module.scss';
import { useRootStore } from '@/context/StoreContext';
import { observer } from 'mobx-react-lite';

const AdminErrorBoundary = observer(() => {
  const { adminErrors } = useRootStore();
  const [error, setError] = useState(false);

  useEffect(() => {
    let firstTO: any = null;
    let secondTO: any = null;
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
      clearTimeout(firstTO);
      clearTimeout(secondTO);
    };
  }, [adminErrors.error]);

  if (!adminErrors.error) {
    return <></>;
  }

  return (
    <div data-error={error} className={styles.container}>
      {adminErrors.error}
    </div>
  );
});

export default AdminErrorBoundary;
