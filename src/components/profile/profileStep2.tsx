import { skills } from "../../bogusData/skills";
import Babysitting from "../../public/images/skills/babysitting.png";
import Cooking from "../../public/images/skills/cooking.png";
import Farming from "../../public/images/skills/farming.png";
import Carpentry from "../../public/images/skills/carpentry.png";
import EYE from '../../public/images/eye.png';

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
    root: {},
    content: {
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
    },
    card: {
        flex: "40%",
        border: "2px solid black",
        borderRadius: "10%",
        paddingBottom: "10px",
        cursor: "pointer",
    },
    selected: {
        opacity: 1,
        filter: 'drop-shadow(1px 1px 20px blue)',
    },
    unselected: {
        opacity: 0.6,
    },
    searchForm: {
       display: 'flex',
       flexDirection: 'column',
       width: '100%',
       gap: '20px',
       marginBottom: '10px',
    },
    field: {
        textAlign: 'start',
    },
    search: {
        borderRadius: '10px',
        width: '100%',
        border: '2px groove lightGray',
        minHeight: '35px',
        padding: '20px',
        "&:focus": {
        }
    },
    input: {
        position: 'relative',
    },
    magnifier: {
        width: '30px',
        height: '30px',
        position: 'absolute',
        zIndex: '3',
        top: '10px',
        right: '5px',
        "&:hover": {
         transform: `scale(1.5)`,
         cursor: 'pointer',
        }
    }
}));

const ProfileStep2 = ({ allUserValues, handleChange }) => {
    const classes = useStyles();

    const handleValuesChange = (val) => {
        handleChange && handleChange(val);
    };

    return (
        <div className={classes.content}>
            {skills.map((el, i) => {
                const rightImg =
                    el.name === "Baby-sitting"
                        ? Babysitting
                        : el.name === "Carpentry"
                            ? Carpentry
                            : el.name === "Cooking"
                                ? Cooking
                                : Farming;
                return (
                    <div
                        className={classes.card}
                        onClick={() => handleValuesChange(el.name)}
                    >
                        <p key={i}>{el.name}</p>
                        <img
                            src={rightImg}
                            className={
                                allUserValues.mySkills.includes(el.name)
                                    ? classes.selected
                                    : classes.unselected
                            }
                        />
                    </div>
                );
            })}
            <form className={classes.searchForm}>
                <label className={classes.field}>OTHERS</label>
                <div className={classes.input}>
                <input type="search" name="search" className={classes.search} />
                {/* <img className={classes.magnifier} src={EYE} /> */}
                </div>
            </form>
        </div>
    );
};

export default ProfileStep2;
