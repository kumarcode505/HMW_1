import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Search, Plus, FileText, Download, Eye } from 'lucide-react';

const mockRecords = [
  {
    id: 1,
    patientName: 'John Smith',
    patientId: 'P001',
    recordType: 'Diagnosis',
    date: '2024-01-20',
    doctor: 'Dr. Sarah Wilson',
    description: 'Hypertension follow-up',
    status: 'Active',
    files: ['blood_test_results.pdf', 'ecg_report.pdf']
  },
  {
    id: 2,
    patientName: 'Emily Johnson',
    patientId: 'P002',
    recordType: 'Surgery',
    date: '2024-01-18',
    doctor: 'Dr. Michael Brown',
    description: 'Knee replacement surgery',
    status: 'Completed',
    files: ['surgery_notes.pdf', 'post_op_xray.jpg']
  },
  {
    id: 3,
    patientName: 'Robert Davis',
    patientId: 'P003',
    recordType: 'Lab Report',
    date: '2024-01-22',
    doctor: 'Dr. Lisa Chen',
    description: 'Comprehensive metabolic panel',
    status: 'Pending Review',
    files: ['lab_results.pdf']
  },
  {
    id: 4,
    patientName: 'Maria Garcia',
    patientId: 'P004',
    recordType: 'Prescription',
    date: '2024-01-19',
    doctor: 'Dr. James Miller',
    description: 'Diabetes medication adjustment',
    status: 'Active',
    files: ['prescription.pdf']
  }
];

const patientHistory = [
  {
    id: 1,
    date: '2024-01-20',
    type: 'Visit',
    description: 'Regular checkup - Blood pressure monitoring',
    doctor: 'Dr. Sarah Wilson',
    vitals: { bp: '140/90', pulse: '72', temp: '98.6°F', weight: '180 lbs' }
  },
  {
    id: 2,
    date: '2024-01-15',
    type: 'Lab',
    description: 'Blood work - Lipid panel',
    doctor: 'Dr. Sarah Wilson',
    results: 'Cholesterol: 220 mg/dL (High), HDL: 45 mg/dL'
  },
  {
    id: 3,
    date: '2024-01-10',
    type: 'Prescription',
    description: 'Lisinopril 10mg daily for hypertension',
    doctor: 'Dr. Sarah Wilson',
    instructions: 'Take once daily in the morning'
  }
];

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('P001');

  const filteredRecords = mockRecords.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'pending review': return 'outline';
      case 'archived': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Medical Records</h2>
          <p className="text-muted-foreground">Manage patient medical records and history</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medical Record</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Medical record creation form would go here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList>
          <TabsTrigger value="records">All Records</TabsTrigger>
          <TabsTrigger value="history">Patient History</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search records by patient name, ID, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Records ({filteredRecords.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.patientName}</p>
                          <p className="text-sm text-muted-foreground">{record.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.recordType}</Badge>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Medical Record Details</DialogTitle>
                              </DialogHeader>
                              <RecordDetails record={record} />
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Patient Selector */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Select Patient:</label>
                <select 
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="P001">John Smith (P001)</option>
                  <option value="P002">Emily Johnson (P002)</option>
                  <option value="P003">Robert Davis (P003)</option>
                  <option value="P004">Maria Garcia (P004)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Patient Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Patient History - John Smith</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patientHistory.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    {index !== patientHistory.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{entry.description}</h3>
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">By {entry.doctor}</p>
                        <Badge variant="secondary" className="text-xs">
                          {entry.type}
                        </Badge>
                        {entry.vitals && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <h4 className="text-sm font-medium mb-2">Vital Signs</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                              <div>BP: {entry.vitals.bp}</div>
                              <div>Pulse: {entry.vitals.pulse}</div>
                              <div>Temp: {entry.vitals.temp}</div>
                              <div>Weight: {entry.vitals.weight}</div>
                            </div>
                          </div>
                        )}
                        {entry.results && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <h4 className="text-sm font-medium mb-2">Results</h4>
                            <p className="text-sm">{entry.results}</p>
                          </div>
                        )}
                        {entry.instructions && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <h4 className="text-sm font-medium mb-2">Instructions</h4>
                            <p className="text-sm">{entry.instructions}</p>
                          </div>
                        )}
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

function RecordDetails({ record }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Patient Information</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {record.patientName}</p>
            <p><span className="font-medium">Patient ID:</span> {record.patientId}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Record Information</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Type:</span> {record.recordType}</p>
            <p><span className="font-medium">Date:</span> {record.date}</p>
            <p><span className="font-medium">Doctor:</span> {record.doctor}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-sm">{record.description}</p>
      </div>

      {record.files && record.files.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Attached Files</h3>
          <div className="space-y-2">
            {record.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">{file}</span>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}