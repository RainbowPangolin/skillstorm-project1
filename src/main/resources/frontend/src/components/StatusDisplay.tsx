import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';

interface StatusCheckProps {
  response: Response | null;
}

const StatusCheck: React.FC<StatusCheckProps> = ({ response }) => {
  const [alertContent, setAlertContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const getMessage = async () => {
      if (response) {
        try {
          const message = await response.text();
          return message;
        } catch (error) {
          console.error("Error getting message:", error);
          return "Error retrieving message";
        }
      }
    };

    const renderAlert = async () => {
      const message = await getMessage();
      if (response && message) {
        if (response.ok) {
          setAlertContent(
            <Alert color="success">
              Success! {message}
            </Alert>
          );
        } else if (response.status === 422) {
          setAlertContent(
            <Alert color="warning">
              {message}
            </Alert>
          );
        } else {
          setAlertContent(
            <Alert color="danger">
              Error! Status Code: {response.status}, Message: {message}
            </Alert>
          );
        }
      }
    };

    renderAlert();

    // Cleanup function to clear alert content if response changes or component unmounts
    return () => {
      setAlertContent(null);
    };
  }, [response]);

  return <div>{alertContent}</div>;
};

export default StatusCheck;
