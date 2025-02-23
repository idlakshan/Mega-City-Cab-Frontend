import React, { useState, useEffect } from 'react';
import DriverTable from '../../../../components/DriverTable';
import { useDeleteDriverMutation, useGetDriversQuery } from '../../../../redux/features/driver/driverApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ManageDriver = () => {
  const [drivers, setDrivers] = useState([]);

  const {data: driverResponse,isLoading: isDriversLoading,isError: isDriverError, refetch} = useGetDriversQuery();
  const [deleteDriver]=useDeleteDriverMutation();
  console.log(driverResponse?.data[0]);
  //const driversData = driverResponse?.data?.vehicles || [];

  
  useEffect(()=>{
   refetch();
  },[refetch])

  console.log(driverResponse)
  useEffect(() => {
    if (driverResponse?.data) {
      setDrivers(driverResponse.data); 
    }
  }, [driverResponse]);

  const handleDelete = async(driverId) => {

    try {
          await deleteDriver(driverId).unwrap();
          toast.success('The Driver has been successfully deleted!')
          refetch();
        } catch (error) {
          toast.error('Failed to delete driver:', error)
          console.error('Failed to delete driver:', error);
        }
   
  };

 
  if (isDriversLoading) {
    return <div>Loading drivers...</div>;
  }


  if (isDriverError) {
    return <div>Error fetching drivers. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-black mb-6">Manage Drivers</h1>
      <DriverTable drivers={drivers} handleDelete={handleDelete} />
    </div>
  );
};

export default ManageDriver;