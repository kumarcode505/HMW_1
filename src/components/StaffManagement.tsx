import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Phone, Mail, Clock, Calendar } from 'lucide-react';

const mockStaff = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    role: 'Doctor',
    department: 'Cardiology',
    phone: '+1 (555) 123-4567',
    email: 'sarah.wilson@hospital.com',
    status: 'Available',
    shift: 'Morning',
    experience: '8 years',
    specialization: 'Cardiac Surgery'
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    role: 'Doctor',
    department: 'Orthopedics',
    phone: '+1 (555) 234-5678',
    email: 'michael.brown@hospital.com',
    status: 'In Surgery',
    shift: 'Full Day',
    experience: '12 years',
    specialization: 'Joint Replacement'
  },
  {
    id: 3,
    name: 'Nurse Jennifer Davis',
    role: 'Nurse',
    department: 'Emergency',
    phone: '+1 (555) 345-6789',
    email: 'jennifer.davis@hospital.com',
    status: 'Available',
    shift: 'Night',
    experience: '5 years',
    specialization: 'Emergency Care'
  },
  {
    id: 4,
    name: 'Dr. Lisa Chen',
    role: 'Doctor',
    department: 'Pediatrics',
    phone: '+1 (555) 456-7890',
    email: 'lisa.chen@hospital.com',
    status: 'Off Duty',
    shift: 'Evening',
    experience: '6 years',
    specialization: 'Child Healthcare'
  },
  {
    id: 5,
    name: 'Nurse Robert Johnson',
    role: 'Nurse',
    department: 'ICU',
    phone: '+1 (555) 567-8901',
    email: 'robert.johnson@hospital.com',
    status: 'Available',
    shift: 'Morning',
    experience: '10 years',
    specialization: 'Critical Care'
  }
];

const scheduleData = [
  { day: 'Monday', morning: 'Dr. Wilson, Nurse Davis', evening: 'Dr. Chen, Nurse Johnson', night: 'Dr. Brown' },
  { day: 'Tuesday', morning: 'Dr. Brown, Nurse Johnson', evening: 'Dr. Wilson, Nurse Davis', night: 'Dr. Chen' },
  { day: 'Wednesday', morning: 'Dr. Chen, Nurse Davis', evening: 'Dr. Brown, Nurse Johnson', night: 'Dr. Wilson' },
  { day: 'Thursday', morning: 'Dr. Wilson, Nurse Johnson', evening: 'Dr. Chen, Nurse Davis', night: 'Dr. Brown' },
  { day: 'Friday', morning: 'Dr. Brown, Nurse Davis', evening: 'Dr. Wilson, Nurse Johnson', night: 'Dr. Chen' }
];

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || staff.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'default';
      case 'in surgery': return 'secondary';
      case 'off duty': return 'outline';
      case 'on leave': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Staff Management</h2>
          <p className="text-muted-foreground">Manage hospital staff and schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Staff registration form would go here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, department, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={roleFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRoleFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={roleFilter === 'doctor' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRoleFilter('doctor')}
                  >
                    Doctors
                  </Button>
                  <Button
                    variant={roleFilter === 'nurse' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setRoleFilter('nurse')}
                  >
                    Nurses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{staff.role} - {staff.department}</p>
                      <Badge variant={getStatusColor(staff.status)} className="mt-1">
                        {staff.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{staff.shift} Shift</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Experience:</span> {staff.experience}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Specialization:</span> {staff.specialization}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData.map((day) => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{day.day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Morning (6 AM - 2 PM)</h4>
                        <p className="text-sm">{day.morning}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Evening (2 PM - 10 PM)</h4>
                        <p className="text-sm">{day.evening}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Night (10 PM - 6 AM)</h4>
                        <p className="text-sm">{day.night}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}