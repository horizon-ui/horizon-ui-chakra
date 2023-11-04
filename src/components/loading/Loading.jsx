import styles from './Loading.module.scss'
function Loading() {
  return (
    <div className={styles.loading_wrapper}>
      <div className={styles.load}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}

export default Loading;
