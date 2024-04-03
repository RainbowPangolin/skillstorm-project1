import React from 'react';
import { HttpResponse } from '../interfaces/HttpResponse';

interface StatusCheckProps {
  response: HttpResponse | null;
}

const StatusCheck: React.FC<StatusCheckProps> = ({ response }) => {
  if (!response) {
    return <></>; 
  }

  if (response.status === 200) {
    return <div>Success! Data fetched successfully.</div>; 
  } else if (response.status === 422) {
    return (
        <div>
        Operation canceled. This operation would exceed the warehouse's capacity.
      </div>
    )
  } else {
    return (
      <div>
        Error! Status Code: {response.status}, Message: {response.statusText}
      </div>
    );
  }
};

export default StatusCheck;
