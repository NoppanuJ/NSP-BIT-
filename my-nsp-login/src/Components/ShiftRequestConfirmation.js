import React from 'react';
import '../CssComponents/ShiftRequestConfirmation.css';

const ShiftRequestConfirmation = () => {
    return (
        <div className="confirmation-container">
            <div className="confirmation-content">
                <div className="checkmark-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="green"
                        className="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM12.97 6.03a.75.75 0 0 0-1.06-1.06L7.5 9.44 5.53 7.47a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5z" />
                    </svg>
                </div>
                <h1>REQUEST SEND!</h1>
                <div className="home-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-house-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 .75l-7 7v7.25a.75.75 0 0 0 .75.75h4.5A.75.75 0 0 0 7 15V9.5h2V15a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V7.75l-7-7zm0 1.5L1.75 8.5V14h3V9.5A.75.75 0 0 1 5.5 8.75h5a.75.75 0 0 1 .75.75V14h3V8.5L8 2.25z"
                        />
                    </svg>
                </div>
                <button className="back-button">Back to Dashboard</button>
            </div>
        </div>
    );
};

export default ShiftRequestConfirmation;
