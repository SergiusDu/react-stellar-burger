import React from 'react'
import styles from "./app.module.css";
import { data } from "../../utils/data";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
      	Измените src/components/app/app.jsx и сохраните для обновления.
      </pre>
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
            Нажми на меня
        </Button>
    </div>
  );
}

export default App;
