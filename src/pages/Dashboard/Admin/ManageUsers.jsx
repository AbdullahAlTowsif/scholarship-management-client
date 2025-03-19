import { useQuery, useMutation } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filterRole, setFilterRole] = useState("all");

    // Fetch users
    const { data: users = [], isLoading, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/users");
            return data;
        }
    });

    // Update user role mutation
    const { mutate: updateUserRole } = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            return axiosSecure.patch(`/update-role/${userId}`, { role: newRole });
        },
        onSuccess: () => {
            refetch(); // Refresh users after role update
            Swal.fire("Success!", "User role updated successfully.", "success");
        },
        onError: () => {
            Swal.fire("Error!", "Failed to update role.", "error");
        }
    });

    // Delete user function
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/delete/${id}`);
                    if (res.status === 200) {
                        refetch();
                        Swal.fire("Deleted!", "User has been removed.", "success");
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire("Error!", "Failed to delete user.", "error");
                }
            }
        });
    };

    // Handle role change
    const handleRoleChange = (userId, newRole) => {
        updateUserRole({ userId, newRole });
    };

    // Filter users based on selected role
    const filteredUsers = filterRole === "all" ? users : users.filter(user => user.role === filterRole);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Failed to load users</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-[#890C25] mb-6">Manage Users</h1>

            {/* Filter Dropdown */}
            <div className="flex justify-end mb-4">
                <select
                    className="select select-bordered"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                >
                    <option value="all">All Users</option>
                    <option value="User">Users</option>
                    <option value="Moderator">Moderators</option>
                    <option value="Admin">Admins</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">User Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Role</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border hover:bg-base-300">
                                <td className="p-3 border">{user.name}</td>
                                <td className="p-3 border">{user.email}</td>
                                <td className="p-3 border">
                                    <select
                                        className="select select-bordered"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value="User">User</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-3 border flex justify-center">
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-error btn-sm">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
