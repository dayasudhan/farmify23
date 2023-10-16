import Head from 'next/head';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <Head>
      <title>Layouts Example</title>
      <main className={styles.main}>{children}</main>
    </Head>
  );
}
