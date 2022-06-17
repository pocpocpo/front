import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import RequiredAuth from './RequiredAuth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Schedule from '../pages/Schedule';
import Appointment from '../pages/Appointment';
import PatientHome from '../pages/PatientHome';
import DoctorHome from '../pages/DoctorHome';
import FilterDoctorsBySpecialty from '../pages/Appointment/FilterDoctorsBySpecialty';
import CreateAppointment from '../pages/Appointment/CreateAppointment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/schedule" element={<RequiredAuth PatientView={Schedule} />} />
    {/* <Route path="/schedule/specialty" element={<Appointment />} /> */}
    <Route path="/schedule/specialty" element={<FilterDoctorsBySpecialty />} />
    <Route
      path="/schedule/specialty/appointment"
      element={<CreateAppointment />}
    />
    <Route
      path="/"
      element={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <RequiredAuth PatientView={PatientHome} DoctorView={DoctorHome} />
      }
    />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/*" element={<SignIn />} />
  </Switch>
);

export default Routes;
