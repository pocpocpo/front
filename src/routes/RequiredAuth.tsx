import React, { FunctionComponent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/Auth';

const RequiredAuth = ({
  PatientView,
  DoctorView,
}: {
  PatientView?: FunctionComponent;
  DoctorView?: FunctionComponent;
}) => {
  const { role, user } = useAuth();
  const location = useLocation();

  if (!user || !role) {
    return (
      <Navigate
        to={{
          pathname: '/login',
        }}
        state={{ from: location }}
      />
    );
  }

  if (
    (!PatientView && role === 'Patient') ||
    (!DoctorView && role === 'Doctor')
  ) {
    return (
      <Navigate
        to={{
          pathname: '/',
        }}
        state={{ from: location }}
      />
    );
  }

  if (role === 'Patient' && PatientView) {
    return <PatientView />;
  }

  if (role === 'Doctor' && DoctorView) {
    return <DoctorView />;
  }

  return (
    <Navigate
      to={{
        pathname: '/',
      }}
      state={{ from: location }}
    />
  );
};

export default RequiredAuth;
