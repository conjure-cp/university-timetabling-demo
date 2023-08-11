import React from 'react';

import styles from "../../assets/pages/EditPage.module.css";

const TabSection = ({ expandKey, renderFn }) => {

    let expandStyle = styles.expand;
  
    if (expandKey === 'activities'|| expandKey === 'lecturers'|| expandKey === 'rooms') {
      expandStyle = styles.expandActivity;
    }
  
    return (
        <div className={expandStyle}>
          {renderFn()}
        </div>
    );
};

export default TabSection;