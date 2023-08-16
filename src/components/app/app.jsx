import React from 'react'
import styles from "./app.module.css";
import { data } from "../../utils/data";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../AppHeader/AppHeader";

function App() {
  return (
    <div className={styles.app}>
        <AppHeader></AppHeader>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
      	А Рита Крыса
      </pre>
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
            Нажми на меня
        </Button>
    </div>
  );
}

export default App;
