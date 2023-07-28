import * as React from 'react';
import Timeslot from '../components/Timeslot/Timeslot';
import styles from "../assets/pages/MainPage.module.css";

const MainPage = () => {
    const timeslot = {
        allowed: [
            ["1","9"], ["1","10"], ["1","11"], ["1","12"], ["1","13"], ["1","14"], ["1","15"], ["1","16"], 
            ["2","9"], ["2","10"], ["2","11"], ["2","12"], ["2","13"], ["2","14"], ["2","15"], ["2","16"], 
            ["4","9"], ["4","10"], ["4","11"], ["4","12"], ["4","13"], ["4","14"], ["4","15"], ["4","16"], 
            ["5","9"], ["5","10"], ["5","11"], ["5","12"], ["5","13"], ["5","14"], ["5","15"], ["5","16"]
          ],
          preferred: [
            ["3","9"], ["3","10"], ["3","11"], ["3","12"], ["3","13"], ["3","14"], ["3","15"], ["3","16"]
          ]
    };
    return (
        <div>
            <Timeslot timeslot={timeslot} />
            <div className={styles.curtton} />
            <div className={styles.title}>
                Simple Timetable with Simble
            </div>
            <div className={styles.subtitle}>
                Powered by Conjure
            </div>
        </div>
    )
}

export default MainPage;