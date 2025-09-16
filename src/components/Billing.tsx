import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Download, Eye, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const mockInvoices = [
  {
    id: 'INV-001',
    patientName: 'John Smith',
    patientId: 'P001',
    date: '2024-01-20',
    dueDate: '2024-02-20',
    amount: 1250.00,
    status: 'Paid',
    services: [
      { description: 'Consultation', amount: 150.00 },
      { description: 'Blood Test', amount: 100.00 },
      { description: 'ECG', amount: 200.00 },
      { description: 'Medication', amount: 800.00 }
    ]
  },
  {
    id: 'INV-002',
    patientName: 'Emily Johnson',
    patientId: 'P002',
    date: '2024-01-18',
    dueDate: '2024-02-18',
    amount: 5500.00,
    status: 'Pending',
    services: [
      { description: 'Surgery - Knee Replacement', amount: 5000.00 },
      { description: 'Anesthesia', amount: 300.00 },
      { description: 'Post-op care', amount: 200.00 }
    ]
  },
  {
    id: 'INV-003',
    patientName: 'Robert Davis',
    patientId: 'P003',
    date: '2024-01-22',
    dueDate: '2024-02-22',
    amount: 350.00,
    status: 'Overdue',
    services: [
      { description: 'Emergency Visit', amount: 200.00 },
      { description: 'X-Ray', amount: 150.00 }
    ]
  },
  {
    id: 'INV-004',
    patientName: 'Maria Garcia',
    patientId: 'P004',
    date: '2024-01-19',
    dueDate: '2024-02-19',
    amount: 750.00,
    status: 'Partially Paid',
    services: [
      { description: 'Diabetes Management', amount: 300.00 },
      { description: 'Lab Tests', amount: 250.00 },
      { description: 'Medication', amount: 200.00 }
    ]
  }
];

const paymentHistory = [
  { id: 1, date: '2024-01-21', patient: 'John Smith', amount: 1250.00, method: 'Credit Card', status: 'Completed' },
  { id: 2, date: '2024-01-20', patient: 'Maria Garcia', amount: 375.00, method: 'Insurance', status: 'Completed' },
  { id: 3, date: '2024-01-19', patient: 'Sarah Wilson', amount: 450.00, method: 'Cash', status: 'Completed' },
  { id: 4, date: '2024-01-18', patient: 'Michael Brown', amount: 800.00, method: 'Check', status: 'Pending' }
];

const billingStats = {
  totalRevenue: 125400,
  pendingPayments: 18750,
  overdueAmount: 5300,
  thisMonth: 28600
};

export function Billing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'partially paid': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Billing & Payments</h2>
          <p className="text-muted-foreground">Manage invoices, payments, and financial records</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Invoice creation form would go here</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingStats.pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">15 invoices pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${billingStats.overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">3 overdue invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingStats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by patient name, invoice ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === 'paid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('paid')}
                  >
                    Paid
                  </Button>
                  <Button
                    variant={statusFilter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={statusFilter === 'overdue' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('overdue')}
                  >
                    Overdue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card>
            <CardHeader>
              <CardTitle>Invoices ({filteredInvoices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{invoice.patientName}</p>
                          <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(invoice.status)}>
                          {invoice.status}
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
                                <DialogTitle>Invoice Details - {invoice.id}</DialogTitle>
                              </DialogHeader>
                              <InvoiceDetails invoice={invoice} />
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

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.patient}</TableCell>
                      <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === 'Completed' ? 'default' : 'secondary'}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InvoiceDetails({ invoice }) {
  const total = invoice.services.reduce((sum, service) => sum + service.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Invoice {invoice.id}</h3>
          <p className="text-sm text-muted-foreground">Patient: {invoice.patientName} ({invoice.patientId})</p>
        </div>
        <Badge variant={getStatusColor(invoice.status)} className="text-sm">
          {invoice.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Invoice Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Date:</span> {invoice.date}</p>
            <p><span className="font-medium">Due Date:</span> {invoice.dueDate}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Patient Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {invoice.patientName}</p>
            <p><span className="font-medium">Patient ID:</span> {invoice.patientId}</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Services</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.services.map((service, index) => (
              <TableRow key={index}>
                <TableCell>{service.description}</TableCell>
                <TableCell className="text-right">${service.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">${total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Send Reminder</Button>
        <Button variant="outline">Mark as Paid</Button>
        <Button>Download PDF</Button>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'paid': return 'default';
    case 'pending': return 'secondary';
    case 'partially paid': return 'outline';
    case 'overdue': return 'destructive';
    default: return 'default';
  }
}