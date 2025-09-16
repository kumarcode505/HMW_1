import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Users, Calendar, TrendingUp } from 'lucide-react';

const mockStats = {
  totalPatients: 1247,
  todayAppointments: 23,
  activeStaff: 45,
  monthlyRevenue: 125400
};

const recentActivities = [
  { id: 1, type: 'appointment', patient: 'John Smith', time: '10:30 AM', status: 'completed' },
  { id: 2, type: 'admission', patient: 'Sarah Johnson', time: '09:15 AM', status: 'active' },
  { id: 3, type: 'discharge', patient: 'Mike Wilson', time: '08:45 AM', status: 'completed' },
  { id: 4, type: 'appointment', patient: 'Emily Davis', time: '11:00 AM', status: 'scheduled' },
  { id: 5, type: 'emergency', patient: 'Robert Brown', time: '07:30 AM', status: 'urgent' }
];

const upcomingAppointments = [
  { id: 1, patient: 'Alice Cooper', doctor: 'Dr. Smith', time: '2:00 PM', type: 'Consultation' },
  { id: 2, patient: 'Bob Martin', doctor: 'Dr. Johnson', time: '2:30 PM', type: 'Follow-up' },
  { id: 3, patient: 'Carol Lee', doctor: 'Dr. Wilson', time: '3:00 PM', type: 'Surgery' },
  { id: 4, patient: 'David Kim', doctor: 'Dr. Davis', time: '3:30 PM', type: 'Checkup' }
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">3 completed, 20 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeStaff}</div>
            <p className="text-xs text-muted-foreground">32 doctors, 13 nurses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex flex-col">
                    <p className="font-medium">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} - {activity.time}</p>
                  </div>
                  <Badge 
                    variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'urgent' ? 'destructive' :
                      activity.status === 'active' ? 'secondary' : 'outline'
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex flex-col">
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.doctor} - {appointment.type}</p>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {appointment.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}