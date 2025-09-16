import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PatientManagement } from './components/PatientManagement';
import { Appointments } from './components/Appointments';
import { StaffManagement } from './components/StaffManagement';
import { MedicalRecords } from './components/MedicalRecords';
import { Billing } from './components/Billing';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Button } from './components/ui/button';
import { 
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  FileText,
  CreditCard,
  Menu
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Patients', icon: Users, id: 'patients' },
  { name: 'Appointments', icon: Calendar, id: 'appointments' },
  { name: 'Staff', icon: UserCheck, id: 'staff' },
  { name: 'Medical Records', icon: FileText, id: 'records' },
  { name: 'Billing', icon: CreditCard, id: 'billing' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <Appointments />;
      case 'staff':
        return <StaffManagement />;
      case 'records':
        return <MedicalRecords />;
      case 'billing':
        return <Billing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-6 border-b">
              <h1 className="text-xl font-semibold text-primary">Noill Hospitals</h1>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        className="w-full justify-start"
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b px-6 py-4 flex items-center">
            <SidebarTrigger className="lg:hidden mr-4" />
            <h2 className="text-lg font-medium text-gray-900">
              {navigation.find(item => item.id === activeTab)?.name}
            </h2>
          </header>
          
          <main className="flex-1 overflow-auto bg-gray-50">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}