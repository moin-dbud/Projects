import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';

// Mock data - in a real app, this would come from the API
const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    rollNumber: 'S2023001',
    class: '10',
    section: 'A',
    gender: 'male',
    contactNumber: '555-1234',
    parentName: 'Robert Doe',
    profileUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    rollNumber: 'S2023002',
    class: '10',
    section: 'A',
    gender: 'female',
    contactNumber: '555-5678',
    parentName: 'Sarah Smith',
    profileUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    rollNumber: 'S2023003',
    class: '10',
    section: 'B',
    gender: 'male',
    contactNumber: '555-9012',
    parentName: 'David Johnson',
    profileUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    rollNumber: 'S2023004',
    class: '10',
    section: 'B',
    gender: 'female',
    contactNumber: '555-3456',
    parentName: 'Linda Brown',
    profileUrl: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    firstName: 'William',
    lastName: 'Davis',
    rollNumber: 'S2023005',
    class: '9',
    section: 'A',
    gender: 'male',
    contactNumber: '555-7890',
    parentName: 'James Davis',
    profileUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  
  // Filter students based on search query and filters
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSection = selectedSection === 'all' || student.section === selectedSection;
    
    return matchesSearch && matchesClass && matchesSection;
  });
  
  return (
    <PageLayout title="Students">
      <div className="mb-6">
        <Card>
          <CardHeader className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">Student Directory</h2>
              <p className="text-sm text-gray-600">View and manage student information</p>
            </div>
            <Button 
              leftIcon={<Plus size={16} />}
              variant="primary"
            >
              Add Student
            </Button>
          </CardHeader>
          <CardBody>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or roll number"
                  leftIcon={<Search size={18} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="all">All Classes</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="all">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
                <Button 
                  leftIcon={<Filter size={16} />}
                  variant="outline"
                >
                  More Filters
                </Button>
              </div>
            </div>
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Student</TableHeaderCell>
                  <TableHeaderCell>Roll No.</TableHeaderCell>
                  <TableHeaderCell>Class</TableHeaderCell>
                  <TableHeaderCell>Contact</TableHeaderCell>
                  <TableHeaderCell>Parent</TableHeaderCell>
                  <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar src={student.profileUrl} name={`${student.firstName} ${student.lastName}`} size="sm" />
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{`${student.firstName} ${student.lastName}`}</p>
                          <Badge variant={student.gender === 'male' ? 'primary' : 'secondary'}>
                            {student.gender}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{`${student.class}-${student.section}`}</TableCell>
                    <TableCell>{student.contactNumber}</TableCell>
                    <TableCell>{student.parentName}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" leftIcon={<Edit size={14} />}>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" leftIcon={<Trash2 size={14} />}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No students found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
};