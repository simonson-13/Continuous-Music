import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
}));

// WIP

export default function ProgressBar(props) {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        function progress() {
                setCompleted((oldCompleted) => {
                if (oldCompleted === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            });
        }
        
        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <span className={classes.root}>
            <LinearProgress variant="determinate" value={completed} />
        </span>
    );
}