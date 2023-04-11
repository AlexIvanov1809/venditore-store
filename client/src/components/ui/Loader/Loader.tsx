import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loader_container}>
      <span className={styles.loader} />
    </div>
  );
}

export default Loader;
