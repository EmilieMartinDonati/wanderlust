import { createUseStyles } from "react-jss";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';

import ProfileStep1 from "./profileStep1";
import ProfileStep2 from "./profileStep2";
import ProfileStep3 from "./profileStep3";

import { saveUserInformation } from "../../actions/users";

const useStyles = createUseStyles((theme) => ({
    content: {
        minHeight: "400px",
        paddingBottom: "10px",
    },
    buttonDisabled: {
        padding: "10px",
        background: "slateblue",
        fontWeight: 500,
        cursor: "disabled",
        color: "white",
        borderRadius: "10px",
        border: "none",
        opacity: 0.5,
    },
    buttonAbled: {
        padding: "10px",
        background: "slateblue",
        fontWeight: 500,
        cursor: "pointer",
        color: "white",
        borderRadius: "10px",
        border: "none",
        opacity: 1,
    },
}));

const ProfileContent = ({ step = 1, setStep }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [isSavedAbled, setisSavedAbled] = useState(false);

    const [allUserValues, setAllUserValues] = useState({
        firstName: "",
        lastName: "",
        presentation: "",
        age: 0,
        mySkills: [],
    });

    useEffect(() => {
        setisSavedAbled(false);
    }, [step]);

    useEffect(() => {
    }, [allUserValues, step])

    const _handleValuesChange = (...vals) => {
        setisSavedAbled(true);
        if (step === 1) {
            let key = vals[0];
            let value = vals[1];
            key === "presentation"
                ? setAllUserValues({
                    ...allUserValues,
                    presentation: value,
                })
                : key === "firstName"
                    ? setAllUserValues({
                        ...allUserValues,
                        firstName: value,
                    })
                    : setAllUserValues({
                        ...allUserValues,
                        lastName: value,
                    });
        } else if (step === 2) {
            let formattedVal = vals[0];
            setAllUserValues({
                ...allUserValues,
                mySkills: allUserValues.mySkills.includes(formattedVal)
                    ? allUserValues.mySkills.filter((skill) => skill !== formattedVal)
                    : [...allUserValues.mySkills].concat([formattedVal]),
            });
        }
    };

    const _onSave = (e) => {
        e.preventDefault();
        saveUserInformation(allUserValues);

        // Back end logic should go there;
        // Should be something rather big
        // Maybe I need to save everything into the state to begin with xP;
        // With Parse Server or something else ?
        setStep(step === 3 ? 0 : step + 1);
    };

    return (
        <div>
            <div className={classes.content}>
                {step === 1 && (
                    <ProfileStep1
                        setAllUserValues={setAllUserValues}
                        allUserValues={allUserValues}
                        handleChange={_handleValuesChange}
                    />
                )}
                {step === 2 && (
                    <ProfileStep2
                        setAllUserValues={setAllUserValues}
                        allUserValues={allUserValues}
                        handleChange={_handleValuesChange}
                    />
                )}
                {step === 3 && (
                    <ProfileStep3
                        setAllUserValues={setAllUserValues}
                        allUserValues={allUserValues}
                    />
                )}
            </div>
            <button
                className={isSavedAbled ? classes.buttonAbled : classes.buttonDisabled}
                onClick={(e) => _onSave(e)}
            >
                SAVE
            </button>
        </div>
    );
};

export default ProfileContent;
