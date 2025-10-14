import React from 'react';
import Table from './Table/page';
import { ToastContainer } from 'react-toastify';

const page = () => {
  return (
    <div>
      <Table />
      <ToastContainer />
    </div>
  );
};

export default page;