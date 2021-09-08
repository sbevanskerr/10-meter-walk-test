import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import './Data.css'

const Data = () => {
    //main state, used to store inputted data
    const [data, setData] = useState({
        fName: { label: "Enter the patient's first name: ", v: "" },
        lName: { label: "Enter the patient's last name: ", v: "" },

        normal1: { label: "Comfortable Trial 1 (seconds): ", v: "" },
        normal2: { label: "Comfortable Trial 2 (seconds): ", v: "" },
        normal3: { label: "Comfortable Trial 3 (seconds): ", v: "" },

        fast1: { label: "Fast Trial 1 (seconds): ", v: "" },
        fast2: { label: "Fast Trial 2 (seconds): ", v: "" },
        fast3: { label: "Fast Trial 2 (seconds): ", v: "" }
    });

    //submission state, used to display once the submit button is hit
    const [submittedData, setSubmittedData] = useState({
        fName: "",
        lName: "",

        normal1: "",
        normal2: "",
        normal3: "",

        fast1: "",
        fast2: "",
        fast3: ""
    })

    //sets state equal to inputted data
    const onChange = (id, value) => {
        setData({ ...data, [id]: { ...data[id], value } });
    };

    //sets submitted data equal to the main state, thus rendering the data
    //also goes ahead and divides the inputted numbers by 6, to account for only 6 of the 10 meters being timed  
    const handleSubmit = (e) => {
        setSubmittedData({
            fName: data.fName.value, lName: data.lName.value,
            normal1: data.normal1.value / 6, normal2: data.normal2.value / 6, normal3: data.normal3.value / 6,
            fast1: data.fast1.value / 6, fast2: data.fast2.value / 6, fast3: data.fast3.value / 6
        })
    };

    //state for copying, along with small function to display text to verify copy 
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    //simple averaging function
    function average(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }

    //displays left and right sides of screen. 
    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Please Enter the Patient's Data:</h3>
                    <br/>

                    {Object.keys(data).map((key) => (
                        <>
                            <label>{data[key].label}</label> {"   "}
                            <input key={key} onChange={(e) => onChange(key, e.target.value)} />
                            <div></div>
                        </>
                    ))}
                    <button type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                <div class="col">
                    <h3>Copyable Data:</h3>
                    <br/>
                    <div className="container">
                        <div className="code-snippet">
                            <div className="code-section">
                                <pre>
                                    <h5>Name: {submittedData.fName}{" "}{submittedData.lName}</h5>
                                    <h5>Date: {new Date().toLocaleString() + ""} </h5>
                                    <br></br>
                                    <h6>Comfortable Trial 1: {parseFloat(submittedData.normal1).toFixed(2)} m/s</h6>
                                    <h6>Comfortable Trial 2: {parseFloat(submittedData.normal2).toFixed(2)} m/s</h6>
                                    <h6>Comfortable Trial 3: {parseFloat(submittedData.normal3).toFixed(2)} m/s</h6>
                                    <h6>Comfortable Trial Avg: {average([+submittedData.normal1, +submittedData.normal2, +submittedData.normal3]).toFixed(2)} m/s</h6>
                                    <br></br>
                                    <h6>Fast Trial 1: {parseFloat(submittedData.fast1).toFixed(2)} m/s</h6>
                                    <h6>Fast Trial 2: {parseFloat(submittedData.fast2).toFixed(2)} m/s</h6>
                                    <h6>Fast Trial 3: {parseFloat(submittedData.fast3).toFixed(2)} m/s</h6>
                                    <h6>Fast Trial Avg: {average([+submittedData.fast1, +submittedData.fast2, +submittedData.fast3]).toFixed(2)} m/s</h6>
                                </pre>

                                <CopyToClipboard
                                    text={`${submittedData.fName} ` + `${submittedData.lName} \n` + `${new Date().toLocaleString() + ""} \n`
                                        + `${parseFloat(submittedData.normal1).toFixed(2)} m/s \n` + `${parseFloat(submittedData.normal2).toFixed(2)} m/s \n` +
                                        `${parseFloat(submittedData.normal3).toFixed(2)} m/s \n` +
                                        `${average([+submittedData.normal1, +submittedData.normal2, +submittedData.normal3]).toFixed(2)} m/s \n` +
                                        `${parseFloat(submittedData.fast1).toFixed(2)} m/s \n` + `${parseFloat(submittedData.fast2).toFixed(2)} m/s \n` + `${parseFloat(submittedData.fast3).toFixed(2)} m/s \n` +
                                        `${average([+submittedData.fast1, +submittedData.fast2, +submittedData.fast3]).toFixed(2)} m/s`}
                                    onCopy={onCopyText}>
                                    <h5>Copy Data:  {isCopied ? "Copied!" : <MdContentCopy />}</h5>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Data;
