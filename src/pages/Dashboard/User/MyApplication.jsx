// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import SweetAlert from 'sweetalert2';
// import { toast } from 'react-hot-toast';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import LoadingSpinner from '../../../components/common/LoadingSpinner';

// const fetchScholarships = async (userEmail, axiosSecure) => {
//   const response = await axiosSecure.get(`/applied-scholarship/${userEmail}`);
//   return response.data;
// };

// const cancelScholarship = async (scholarshipId, axiosSecure) => {
//   const response = await axiosSecure.delete(`/applied-scholarship/${scholarshipId}`);
//   return response.data;
// };

// const MyApplication = () => {
//   const { user } = useAuth(); // Get the current authenticated user's details
//   const axiosSecure = useAxiosSecure(); // Get the axios instance with secure headers

//   const { data: scholarships = [], isLoading, error } = useQuery({
//     queryKey: ['applied-scholarships', user?.email], // Fetch data only if user is authenticated
//     queryFn: () => fetchScholarships(user?.email, axiosSecure),
//     enabled: !!user?.email, // Only run the query if the user is logged in
//   });

//   const cancelMutation = useMutation({
//     mutationFn: (scholarshipId) => cancelScholarship(scholarshipId, axiosSecure),
//     onSuccess: () => {
//       toast.success('Application canceled successfully');
//     },
//     onError: () => {
//       toast.error('Failed to cancel application');
//     },
//   });

//   const handleEdit = (status) => {
//     if (status === 'processing') {
//       SweetAlert.fire({
//         icon: 'error',
//         title: 'Cannot Edit',
//         text: 'This application is currently being processed and cannot be edited.',
//       });
//     } else {
//       console.log('Editing application');
//     }
//   };

//   const handleCancel = (scholarshipId) => {
//     cancelMutation.mutate(scholarshipId);
//   };

//   if (isLoading) return <LoadingSpinner></LoadingSpinner>
//   if (error) return <div>Error loading scholarships</div>;

//   return (
//     <div className="my-8 px-4">
//       <h1 className="text-2xl font-semibold mb-4">My Applied Scholarships</h1>
//       <table className="table-auto w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">University Name</th>
//             <th className="px-4 py-2 border">University Address</th>
//             <th className="px-4 py-2 border">Application Feedback</th>
//             <th className="px-4 py-2 border">Subject Category</th>
//             <th className="px-4 py-2 border">Applied Degree</th>
//             <th className="px-4 py-2 border">Application Fees</th>
//             <th className="px-4 py-2 border">Service Charge</th>
//             <th className="px-4 py-2 border">Application Status</th>
//             <th className="px-4 py-2 border">Actions</th>
//             <th className="px-4 py-2 border">Add Review</th>
//           </tr>
//         </thead>
//         <tbody>
//           {scholarships.map((scholarship) => (
//             <tr key={scholarship._id}>
//               <td className="px-4 py-2 border">{scholarship.universityName}</td>
//               <td className="px-4 py-2 border">{scholarship.universityAddress}</td>
//               <td className="px-4 py-2 border">{scholarship.applicationFeedback || 'N/A'}</td>
//               <td className="px-4 py-2 border">{scholarship.subjectCategory}</td>
//               <td className="px-4 py-2 border">{scholarship.degree}</td>
//               <td className="px-4 py-2 border">${scholarship.aplicationFees}</td>
//               <td className="px-4 py-2 border">${scholarship.serviceCharge}</td>
//               <td className="px-4 py-2 border">
//                 <span
//                   className={`px-2 py-1 rounded-full ${
//                     scholarship.status === 'pending'
//                       ? 'bg-yellow-400 text-black'
//                       : scholarship.status === 'processing'
//                       ? 'bg-blue-400 text-white'
//                       : scholarship.status === 'completed'
//                       ? 'bg-green-400 text-white'
//                       : 'bg-red-400 text-white'
//                   }`}
//                 >
//                   {scholarship.status}
//                 </span>
//               </td>
//               <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => window.location.href = `/scholarship-details/${scholarship._id}`}
//                   className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
//                 >
//                   Details
//                 </button>
//                 <button
//                   onClick={() => handleEdit(scholarship.status)}
//                   disabled={scholarship.status === 'processing'}
//                   className={`px-3 py-1 bg-yellow-500 text-white rounded-md mr-2 ${
//                     scholarship.status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleCancel(scholarship._id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </td>
//               <td className="px-4 py-2 border">
//                 <button
//                   onClick={() => window.location.href = `/add-review/${scholarship._id}`}
//                   className="px-3 py-1 bg-green-500 text-white rounded-md"
//                 >
//                   Add Review
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyApplication;


import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import SweetAlert from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing React Icons
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const fetchScholarships = async (userEmail, axiosSecure) => {
  const response = await axiosSecure.get(`/applied-scholarship/${userEmail}`);
  return response.data;
};

const cancelScholarship = async (scholarshipId, axiosSecure) => {
  const response = await axiosSecure.delete(`/applied-scholarship/${scholarshipId}`);
  return response.data;
};

const MyApplication = () => {
  const { user } = useAuth(); // Get the current authenticated user's details
  const axiosSecure = useAxiosSecure(); // Get the axios instance with secure headers

  const { data: scholarships = [], isLoading, error, refetch } = useQuery({
    queryKey: ['applied-scholarships', user?.email], // Fetch data only if user is authenticated
    queryFn: () => fetchScholarships(user?.email, axiosSecure),
    enabled: !!user?.email, // Only run the query if the user is logged in
  });

  const cancelMutation = useMutation({
    mutationFn: (scholarshipId) => cancelScholarship(scholarshipId, axiosSecure),
    onSuccess: () => {
      toast.success('Application canceled successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to cancel application');
    },
  });

  const handleEdit = (status) => {
    if (status === 'processing') {
      SweetAlert.fire({
        icon: 'error',
        title: 'Cannot Edit',
        text: 'This application is currently being processed and cannot be edited.',
      });
    } else {
      console.log('Editing application');
    }
  };

  const handleCancel = (scholarshipId) => {
    cancelMutation.mutate(scholarshipId);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <div>Error loading scholarships</div>;

  return (
    <div className="my-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">My Applied Scholarships</h1>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">University Name</th>
            <th className="px-4 py-2 border">University Address</th>
            <th className="px-4 py-2 border">Application Feedback</th>
            <th className="px-4 py-2 border">Subject Category</th>
            <th className="px-4 py-2 border">Applied Degree</th>
            <th className="px-4 py-2 border">Application Fees</th>
            <th className="px-4 py-2 border">Service Charge</th>
            <th className="px-4 py-2 border">Application Status</th>
            <th className="px-4 py-2 border">Actions</th>
            <th className="px-4 py-2 border">Add Review</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship) => (
            <tr key={scholarship._id}>
              <td className="px-4 py-2 border">{scholarship.universityName}</td>
              <td className="px-4 py-2 border">{scholarship.universityAddress}</td>
              <td className="px-4 py-2 border">{scholarship.applicationFeedback || 'N/A'}</td>
              <td className="px-4 py-2 border">{scholarship.subjectCategory}</td>
              <td className="px-4 py-2 border">{scholarship.degree}</td>
              <td className="px-4 py-2 border">${scholarship.aplicationFees}</td>
              <td className="px-4 py-2 border">${scholarship.serviceCharge}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded-full ${
                    scholarship.status === 'pending'
                      ? 'bg-yellow-400 text-black'
                      : scholarship.status === 'processing'
                      ? 'bg-blue-400 text-white'
                      : scholarship.status === 'completed'
                      ? 'bg-green-400 text-white'
                      : 'bg-red-400 text-white'
                  }`}
                >
                  {scholarship.status}
                </span>
              </td>
              <td className="px-4 py-2 border flex space-x-2">
                <button
                  onClick={() => window.location.href = `/scholarship-details/${scholarship._id}`}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md"
                >
                  <FaEye /> {/* View Icon */}
                </button>
                <button
                  onClick={() => handleEdit(scholarship.status)}
                  disabled={scholarship.status === 'processing'}
                  className={`px-3 py-2 bg-yellow-500 text-white rounded-md ${scholarship.status === 'processing' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaEdit /> {/* Edit Icon */}
                </button>
                <button
                  onClick={() => handleCancel(scholarship._id)}
                  className="px-3 py-4 bg-red-500 text-white rounded-md"
                >
                  <FaTrashAlt /> {/* Trash Icon */}
                </button>
              </td>
              <td className="px-4 py-1 border">
                <button
                  onClick={() => window.location.href = `/add-review/${scholarship._id}`}
                  className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                  Add Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplication;
