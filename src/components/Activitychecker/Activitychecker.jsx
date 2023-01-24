import { TextField, Checkbox, ThemeProvider, ListItem, ListItemText, ListItemIcon, List, Modal, Button } from "@mui/material";


const Activitychecker = (props) => {
    return (
        <List
            sx={{
                width: 400,
                height: 230,
                bgcolor: '#F8F8F8',
                overflow: 'auto',
            }}
            dense
            component="div"
            role="list"
        >
            {activities.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                    <ListItem
                        key={value}
                        role="listitem"
                        button
                        onClick={() => handleToggle(value)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                                sx={{
                                    color: 'black',
                                    '&.Mui-checked': {
                                        color: 'black',
                                    },
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                    </ListItem>
                );
            })}

            <ListItem
                role="listitem"
                button
                onClick={handleOpen}
            >
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText id="AddNew" primary="Add new Activity" />
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.modal}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Name for new Activity"
                            variant="standard"
                            className={styles.input}
                            onChange={activityNameHandler}
                        />
                    </ThemeProvider>
                    <div className={styles.buttonContainer}>
                        <ThemeProvider theme={theme}>

                            <Button
                                color="gray"
                                className={styles.closeButton}
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="gray"
                                className={styles.addButton}
                                variant="contained"
                                onClick={() => addNewActivity(activityName)}
                            >
                                Add
                            </Button>
                        </ThemeProvider>

                    </div>
                </div>

            </Modal>
            {/* <ListItem /> */}
        </List>
    )
}