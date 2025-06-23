
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center mb-2">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
        <p className="text-sm text-gray-500 ml-12">Manage your account and settings</p>
      </header>

      <div className="px-6 py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Profile Management Coming Soon
          </h2>
          <p className="text-gray-600">
            We're building comprehensive profile management features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
