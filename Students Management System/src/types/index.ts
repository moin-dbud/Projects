export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileUrl?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  class: string;
  section: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  contactNumber?: string;
  address?: string;
  parentId?: string;
  profileUrl?: string;
  createdAt: string;
}

export interface Teacher {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  subjects: string[];
  contactNumber?: string;
  profileUrl?: string;
  createdAt: string;
}

export interface Parent {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  studentIds: string[];
  profileUrl?: string;
  createdAt: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  academicYear: string;
  teacherId: string;
  studentIds: string[];
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  classIds: string[];
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  classId: string;
  examType: 'quiz' | 'test' | 'midterm' | 'final';
  marks: number;
  totalMarks: number;
  percentage: number;
  remarks?: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  audience: UserRole[];
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: UserRole;
}