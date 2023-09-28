import EventList from '../../components/EventList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.appContainer}>
      <EventList />
      <div className={styles.divider} />
      <EventList />
    </div>
  );
};

export default Dashboard;
