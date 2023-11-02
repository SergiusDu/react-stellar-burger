import styles from './profile-layout.module.css';
import PropTypes from 'prop-types';

export function ProfileLayout({children}) {
    return (<main className={`${styles.layout}`}>
            {children}
        </main >);
}

ProfileLayout.propTypes = {
    children: PropTypes.node.isRequired,
};