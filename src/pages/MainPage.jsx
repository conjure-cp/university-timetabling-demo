import * as React from 'react';
import AutoComplete from "../components/AutoComplete/AutoComplete";
import TextField from "../components/TextField/TextField";
import Button from '../components/Button/Button';

import styles from "../assets/pages/GeneratePage.module.css";

const MainPage = () => {
    const [text, setText] = React.useState("");

    return (
        <div>Main
            <div>
                <AutoComplete
                    label="Module ID"
                    options={["hi", "hello"]}
                    autocompleteHanlder={() => console.log("hi")}
                />
                <TextField
                    type="string"
                    value={text}
                    onChangeHandler={(value) => setText(value)}
                />
                <Button
                    label="heelo"
                    styles={styles.addButton}
                />
            </div>
        </div>
    )
}

export default MainPage;