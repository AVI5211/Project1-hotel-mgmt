import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Cake,
  Globe,
  Home,
  Mail,
  Phone,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import GuestNavbar from "./GuestNavbar";

// Types remain the same
interface GuestData {
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  language: string;
  work: string;
  address: string;
}

interface ProfileFieldProps {
  label: string;
  icon: LucideIcon;
  field: keyof GuestData;
  value: string;
  onChangeHandler: (field: keyof GuestData, value: string) => void;
  isEditing: boolean;
}

// API configuration remains the same
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const fetchGuestData = async (): Promise<GuestData> => {
  try {
    const response = await api.get<{ guestDetails: GuestData }>(
      "/guest/profile"
    );
    return response.data.guestDetails;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Please login again");
    }
    throw error;
  }
};

const updateGuestData = async (userData: GuestData): Promise<GuestData> => {
  try {
    const response = await api.put<{ guestDetails: GuestData }>(
      "/guest/profile",
      userData
    );
    return response.data.guestDetails;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Please login again");
    }
    throw error;
  }
};

const ProfileField = ({
  label,
  icon: Icon,
  field,
  value,
  onChangeHandler,
  isEditing,
}: ProfileFieldProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold  text-muted-foreground  ">
        {label}
      </Label>
      <div className="flex items-center space-x-2 text-pink-800">
        <Icon className="w-4 h-4 text-muted-foreground " />
        {isEditing && field !== "email" ? (
          <Input
            value={value}
            onChange={(e) => onChangeHandler(field, e.target.value)}
            className="flex-1"
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};

export default function GuestProfile(): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<GuestData | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<GuestData, Error>({
    queryKey: ["guestData"],
    queryFn: fetchGuestData,
  });

  useEffect(() => {
    if (userData && !editedData) {
      setEditedData({ ...userData });
    }
  }, [userData]);

  const mutation = useMutation<GuestData, Error, GuestData>({
    mutationFn: updateGuestData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guestData"] });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      if (error.message === "Please login again") {
        navigate("/login");
      }
    },
  });

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Loading guest details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-600">Error: {error?.message}</p>
      </div>
    );
  }

  const handleEdit = (): void => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = (): void => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const handleSave = (): void => {
    if (editedData) {
      mutation.mutate(editedData);
    }
  };

  const handleChange = (field: keyof GuestData, value: string): void => {
    setEditedData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const displayData = editedData || userData;
  const formattedDateOfBirth = new Date(
    displayData.dateOfBirth
  ).toLocaleDateString();

  return (
    <div>
      <div className=" flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={displayData.name}
                />
                <AvatarFallback>{displayData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold text-blue-700">
              {isEditing ? (
                <Input
                  value={displayData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="text-center text-3xl font-bold "
                />
              ) : (
                displayData.name
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileField
                label="Email"
                icon={Mail}
                field="email"
                value={displayData.email}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
              <ProfileField
                label="Phone"
                icon={Phone}
                field="phoneNumber"
                value={displayData.phoneNumber}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
              <ProfileField
                label="Date of Birth"
                icon={Cake}
                field="dateOfBirth"
                value={formattedDateOfBirth}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
              <ProfileField
                label="Language"
                icon={Globe}
                field="language"
                value={displayData.language}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
              <ProfileField
                label="Work"
                icon={Wrench}
                field="work"
                value={displayData.work}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
              <ProfileField
                label="Address"
                icon={Home}
                field="address"
                value={displayData.address}
                onChangeHandler={handleChange}
                isEditing={isEditing}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button onClick={handleEdit} className="ml-auto">
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
