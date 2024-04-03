import React from 'react';
import { HttpResponse } from '../interfaces/HttpResponse';
import { Alert } from 'reactstrap';

interface StatusCheckProps {
  response: HttpResponse | null;
}

const StatusCheck: React.FC<StatusCheckProps> = ({ response }) => {
  if (!response) {
    return null;
  }

  if (response.status === 200) {
    return (
      <Alert color="success">
        Success! Data fetched successfully.
      </Alert>
    );
  } else if (response.status === 422) {
    return (
      <Alert color="warning">
        Operation canceled. This operation would exceed the warehouse's capacity.
      </Alert>
    );
  } else {
    return (
      <Alert color="danger">
        Error! Status Code: {response.status}, Message: {response.statusText}
      </Alert>
    );
  }
};

export default StatusCheck;
