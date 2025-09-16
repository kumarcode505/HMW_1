import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Plus, Eye, Edit, Phone, Mail, MapPin } from 'lucide-react';

const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, City, State 12345',
    bloodGroup: 'O+',
    lastVisit: '2024-01-15',
    status: 'Active',
    emergencyContact: 'Jane Smith - +1 (555) 987-6543'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    phone: '+1 (555) 234-5678',
    email: 'sarah.johnson@email.com',
    address: '456 Oak Ave, City, State 12345',
    bloodGroup: 'A+',
    lastVisit: '2024-01-20',
    status: 'Active',
    emergencyContact: 'Mike Johnson - +1 (555) 876-5432'
  },
  {
    id: 3,
    name: 'Michael Davis',
    age: 28,
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    email: 'michael.davis@email.com',
    address: '789 Pine St, City, State 12345',
    bloodGroup: 'B+',
    lastVisit: '2024-01-10',
    status: 'Inactive',
    emergencyContact: 'Lisa Davis - +1 (555) 765-4321'
  }
];

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Patient Management</h2>
          <p className="text-muted-foreground">Manage patient records and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age} / {patient.gender}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodGroup}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Patient Details</DialogTitle>
                          </DialogHeader>
                          {selectedPatient && <PatientDetails patient={selectedPatient} />}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AddPatientForm({ onClose }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter full name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input id="age" type="number" placeholder="Enter age" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" placeholder="Male/Female/Other" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Input id="bloodGroup" placeholder="A+, B+, O+, etc." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="+1 (555) 123-4567" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="patient@email.com" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Full address" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="emergency">Emergency Contact</Label>
        <Input id="emergency" placeholder="Name - Phone number" />
      </div>
      <div className="md:col-span-2 flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Add Patient</Button>
      </div>
    </div>
  );
}

function PatientDetails({ patient }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Personal Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {patient.name}</p>
            <p><span className="font-medium">Age:</span> {patient.age}</p>
            <p><span className="font-medium">Gender:</span> {patient.gender}</p>
            <p><span className="font-medium">Blood Group:</span> {patient.bloodGroup}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1" />
              <span>{patient.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Emergency Contact</h3>
        <p>{patient.emergencyContact}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Medical Information</h3>
        <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
        <p><span className="font-medium">Status:</span> {patient.status}</p>
      </div>
    </div>
  );
}