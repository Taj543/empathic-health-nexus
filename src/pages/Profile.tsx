
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ArrowRight } from "lucide-react";

const Profile = () => {
  const menuItems = [
    { 
      icon: <User size={20} className="text-health-primary" />, 
      title: "Personal Information",
      description: "Manage your personal details" 
    },
    { 
      icon: <Settings size={20} className="text-health-primary" />, 
      title: "Settings",
      description: "App preferences and configurations" 
    },
    { 
      icon: <Bell size={20} className="text-health-primary" />, 
      title: "Notifications",
      description: "Manage alerts and reminders" 
    },
    { 
      icon: <Shield size={20} className="text-health-primary" />, 
      title: "Privacy & Security",
      description: "Control your data and privacy" 
    },
    { 
      icon: <HelpCircle size={20} className="text-health-primary" />, 
      title: "Help & Support",
      description: "Get assistance and FAQs" 
    }
  ];

  return (
    <div className="min-h-screen pb-16">
      <header className="px-6 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">Manage your account</p>
      </header>

      <div className="px-6 py-6 flex items-center">
        <div className="w-20 h-20 bg-health-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
          DU
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Demo User</h2>
          <p className="text-gray-500">demo.user@example.com</p>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="mr-4">{item.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>

        <button className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
          <LogOut size={18} className="mr-2" />
          Sign Out
        </button>

        <p className="text-center text-xs text-gray-500 mt-8">
          Empathic Health Nexus v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
