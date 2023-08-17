import React from 'react';

import { ExpandLess, ExpandMore } from "@mui/icons-material";

import IconButton from "@mui/material/IconButton";

import styles from "../../assets/pages/EditPage.module.css";

const ExpandableSection = ({ title, expandKey, onExpand, expandedState, renderFn }) => {
  
  let shrinkStyle = styles.shrink;
  let expandStyle = styles.expand;

  if (expandKey === 'activities'|| expandKey === 'lecturers'|| expandKey === 'rooms') {
    shrinkStyle = styles.shrinkActivity;
    expandStyle = styles.expandActivity;
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{title}</div>
      <IconButton
        className={styles.iconButton}
        onClick={() => onExpand(expandKey)}
        aria-label="delete"
      >
        {expandedState[expandKey] ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <div className={expandedState[expandKey] ? expandStyle : shrinkStyle}>
        {renderFn()}
      </div>
    </div>
  );
};

export default ExpandableSection;