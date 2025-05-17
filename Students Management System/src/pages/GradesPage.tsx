import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeaderCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { FileText, Edit, Plus } from 'lucide-react';

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

// Mock data for grades
const mockGrades = {
  '1': {
    'math': { marks: 85, total: 100, grade: 'A' },
    'science': { marks: 78, total: 100, grade: 'B' },
    'english': { marks: 92, total: 100, grade: 'A' },
    'history': { marks: 88, total: 100, grade: 'B' },
  },
  '2': {
    'math': { marks: 92, total: 100, grade: 'A' },
    'science': { marks: 85, total: 100, grade: 'A' },
    'english': { marks: 88, total: 100, grade: 'B' },
    'history': { marks: 90, total: 100, grade: 'A' },
  },
  '3': {
    'math': { marks: 68, total: 100, grade: 'C' },
    'science': { marks: 72, total: 100, grade: 'C' },
    'english': { marks: 82, total: 100, grade: 'B' },
    'history': { marks: 78, total: 100, grade: 'B' },
  },
  '4': {
    'math': { marks: 95, total: 100, grade: 'A' },
    'science': { marks: 90, total: 100, grade: 'A' },
    'english': { marks: 94, total: 100, grade: 'A' },
    'history': { marks: 92, total: 100, grade: 'A' },
  },
  '5': {
    'math': { marks: 75, total: 100, grade: 'B' },
    'science': { marks: 82, total: 100, grade: 'B' },
    'english': { marks: 79, total: 100, grade: 'B' },
    'history': { marks: 85, total: 100, grade: 'A' },
  },
};

// Mock data for subjects
const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
];

// Mock data for exam types
const examTypes = [
  { value: 'midterm', label: 'Midterm Exam' },
  { value: 'final', label: 'Final Exam' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'test', label: 'Unit Test' },
];

export const GradesPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedExamType, setSelectedExamType] = useState('midterm');
  
  // Filter students based on class and section
  const filteredStudents = mockStudents.filter(
    student => student.class === selectedClass && student.section === selectedSection
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'success';
      case 'B':
        return 'primary';
      case 'C':
        return 'warning';
      case 'D':
      case 'F':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <PageLayout title="Grades">
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Grade Records</h2>
              <p className="text-sm text-gray-600">
                View and manage student grades and performance
              </p>
            </div>
            <Button 
              leftIcon={<Plus size={16} />}
              variant="primary"
            >
              Add New Grades
            </Button>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select
                label="Class"
                options={[
                  { value: '9', label: 'Class 9' },
                  { value: '10', label: 'Class 10' },
                ]}
                value={selectedClass}
                onChange={(value) => setSelectedClass(value)}
              />
              <Select
                label="Section"
                options={[
                  { value: 'A', label: 'Section A' },
                  { value: 'B', label: 'Section B' },
                ]}
                value={selectedSection}
                onChange={(value) => setSelectedSection(value)}
              />
              <Select
                label="Subject"
                options={subjects}
                value={selectedSubject}
                onChange={(value) => setSelectedSubject(value)}
              />
              <Select
                label="Exam Type"
                options={examTypes}
                value={selectedExamType}
                onChange={(value) => setSelectedExamType(value)}
              />
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Student</TableHeaderCell>
                  <TableHeaderCell>Roll No.</TableHeaderCell>
                  <TableHeaderCell>Marks</TableHeaderCell>
                  <TableHeaderCell>Percentage</TableHeaderCell>
                  <TableHeaderCell>Grade</TableHeaderCell>
                  <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => {
                  const studentGrades = mockGrades[student.id as keyof typeof mockGrades] || {};
                  const subjectGrade = studentGrades[selectedSubject as keyof typeof studentGrades];
                  
                  if (!subjectGrade) return null;
                  
                  const percentage = Math.floor((subjectGrade.marks / subjectGrade.total) * 100);
                  
                  return (
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
                      <TableCell>{`${subjectGrade.marks}/${subjectGrade.total}`}</TableCell>
                      <TableCell>{`${percentage}%`}</TableCell>
                      <TableCell>
                        <Badge variant={getGradeColor(subjectGrade.grade)}>
                          {subjectGrade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" leftIcon={<Edit size={14} />}>
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" leftIcon={<FileText size={14} />}>
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
};