"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    if (id === "67aa3381a4bb15c913d384c3") {
      toast.error("This user's role cannot be changed.");
      return;
    }

    try {
      const res = await axiosInstance.put(`/auth/user/${id}`, {
        role: newRole,
      });

      if (res?.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, role: newRole } : user,
          ),
        );
        toast.success("User role updated successfully");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (id === "67aa3381a4bb15c913d384c3") {
      toast.error("This user cannot be deleted.");
      return;
    }

    try {
      const res = await axiosInstance.delete(`/auth/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

      if (res?.status === 200) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto mt-6 max-w-5xl">
      <div className="rounded-lg border bg-card p-4 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">User Management</h2>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-500 border-t-gray-300 dark:border-gray-700 dark:border-t-gray-100"></div>
          </div>
        ) : (
          <div className="max-h-[70vh] w-full overflow-auto overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id} className="hover:bg-accent">
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          handleRoleChange(user._id, value)
                        }
                        disabled={user._id === "67aa3381a4bb15c913d384c3"}
                      >
                        <SelectTrigger
                          className={`w-28 ${
                            user._id === "67aa3381a4bb15c913d384c3"
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span>
                        {new Date(user?.createdAt).toLocaleDateString()}
                      </span>
                      <span className="ml-2">
                        {new Date(user?.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className={`text-red-600 hover:text-red-800 ${
                          user._id === "67aa3381a4bb15c913d384c3"
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        disabled={user._id === "67aa3381a4bb15c913d384c3"}
                      >
                        <Trash size={20} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
