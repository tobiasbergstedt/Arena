import SubPage from 'components/SubPage/SubPage';
import { useLocation } from 'react-router-dom';
import styles from './NeedHelp.module.scss';

const NeedHelp = () => {
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  return (
    <SubPage label="Help" slugs={slugs}>
      <div className={styles.wrapper}>
        <h4>Help example page</h4>
      </div>
    </SubPage>
  );
};

export default NeedHelp;
