import styles from "./profile-layout.module.css"
export function ProfileLayout(props) {
    return (
        <main className={`${styles.layout}`}>
            {props.children}
        </main>
    )
}
