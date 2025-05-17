import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { format } from 'date-fns';
import { Badge } from '../components/ui/Badge';
import { Calendar, Check, X, Clock, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

// Mock data for students
const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: 'S2023001',
    class: '10',
    section: 'A',
    profileUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    rollNumber: 'S2023002',
    class: '10',
    section: 'A',
    profileUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    rollNumber: 'S2023003',
    class: '10',
    section: 'B',
    profileUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    rollNumber: 'S2023004',
    class: '10',
    section: 'B',
    profileUrl: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    firstName: 'William',
    lastName: 'Davis',
    rollNumber: 'S2023005',
    class: '9',
    section: 'A',
    profileUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Mock data for attendance - would be from API in real app
const initialAttendance = {
  '1': 'present',
  '2': 'present',
  '3': 'absent',
  '4': 'late',
  '5': 'excused',
};

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(initialAttendance);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  // Filter students based on class and section
  const filteredStudents = mockStudents.filter(
    student => student.class === selectedClass && student.section === selectedSection
  );

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handlePrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const renderStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <Badge variant="success">Present</Badge>;
      case 'absent':
        return <Badge variant="danger">Absent</Badge>;
      case 'late':
        return <Badge variant="warning">Late</Badge>;
      case 'excused':
        return <Badge variant="info">Excused</Badge>;
      default:
        return null;
    }
  };

  const renderAttendanceButtons = (studentId: string) => {
    return (
      <div className="flex space-x-2">
        <button
          className={`p-2 rounded-full ${
            attendance[studentId] === 'present'
              ? 'bg-green-100 text-green-600'
              : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'
          }`}
          onClick={() => handleAttendanceChange(studentId, 'present')}
          aria-label="Present"
        >
          <Check size={16} />
        </button>
        <button
          className={`p-2 rounded-full ${
            attendance[studentId] === 'absent'
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600'
          }`}
          onClick={() => handleAttendanceChange(studentId, 'absent')}
          aria-label="Absent"
        >
          <X size={16} />
        </button>
        <button
          className={`p-2 rounded-full ${
            attendance[studentId] === 'late'
              ? 'bg-amber-100 text-amber-600'
              : 'bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600'
          }`}
          onClick={() => handleAttendanceChange(studentId, 'late')}
          aria-label="Late"
        >
          <Clock size={16} />
        </button>
        <button
          className={`p-2 rounded-full ${
            attendance[studentId] === 'excused'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
          }`}
          onClick={() => handleAttendanceChange(studentId, 'excused')}
          aria-label="Excused"
        >
          <FileText size={16} />
        </button>
      </div>
    );
  };

  return (
    <PageLayout title="Attendance">
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Attendance Register</h2>
              <p className="text-sm text-gray-600">
                Mark and view student attendance records
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={handlePrevDay}
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
                  <Calendar size={16} className="text-gray-600 mr-2" />
                  <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  rightIcon={<ArrowRight size={16} />}
                  onClick={handleNextDay}
                >
                  Next
                </Button>
              </div>
              <Button 
                variant={mode === 'view' ? 'primary' : 'success'} 
                onClick={() => setMode(mode === 'view' ? 'edit' : 'view')}
              >
                {mode === 'view' ? 'Edit Attendance' : 'Save Changes'}
              </Button>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Student</TableHeaderCell>
                  <TableHeaderCell>Roll No.</TableHeaderCell>
                  <TableHeaderCell>Class</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  {mode === 'edit' && <TableHeaderCell>Mark Attendance</TableHeaderCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar src={student.profileUrl} name={`${student.firstName} ${student.lastName}`} size="sm" />
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{`${student.firstName} ${student.lastName}`}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{`${student.class}-${student.section}`}</TableCell>
                    <TableCell>{renderStatusBadge(attendance[student.id] || 'absent')}</TableCell>
                    {mode === 'edit' && (
                      <TableCell>{renderAttendanceButtons(student.id)}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
};