import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { useAuthStore } from '../store/authStore';
import { Users, BookOpen, Calendar, FileText } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  // Sample chart data - in a real app, this would come from the backend
  const attendanceData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Present',
        data: [42, 45, 40, 46, 44],
        backgroundColor: 'rgba(5, 150, 105, 0.6)',
      },
      {
        label: 'Absent',
        data: [8, 5, 10, 4, 6],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
      },
    ],
  };

  const gradesData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [
      {
        label: 'Average Grade (%)',
        data: [78, 82, 88, 74, 92],
        backgroundColor: 'rgba(30, 64, 175, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Stats cards content based on user role
  const getStatsCards = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: '1,254', icon: <Users className="text-blue-800" size={24} /> },
          { title: 'Total Teachers', value: '78', icon: <BookOpen className="text-green-600" size={24} /> },
          { title: 'Classes', value: '42', icon: <Calendar className="text-amber-500" size={24} /> },
          { title: 'Attendance Rate', value: '92%', icon: <FileText className="text-red-500" size={24} /> },
        ];
      case 'teacher':
        return [
          { title: 'My Students', value: '158', icon: <Users className="text-blue-800" size={24} /> },
          { title: 'My Classes', value: '6', icon: <BookOpen className="text-green-600" size={24} /> },
          { title: 'Today\'s Attendance', value: '95%', icon: <Calendar className="text-amber-500" size={24} /> },
          { title: 'Class Average', value: '78%', icon: <FileText className="text-red-500" size={24} /> },
        ];
      case 'student':
      case 'parent':
        return [
          { title: 'Attendance', value: '95%', icon: <Calendar className="text-blue-800" size={24} /> },
          { title: 'Average Grade', value: '82%', icon: <FileText className="text-green-600" size={24} /> },
          { title: 'Classes', value: '8', icon: <BookOpen className="text-amber-500" size={24} /> },
          { title: 'New Messages', value: '4', icon: <Users className="text-red-500" size={24} /> },
        ];
      default:
        return [];
    }
  };

  // Recent activities - these would be dynamic in a real app
  const recentActivities = [
    { time: '2 hours ago', description: 'New announcement: "Parent-Teacher Conference"' },
    { time: '5 hours ago', description: 'Math quiz grades updated' },
    { time: '1 day ago', description: 'Science assignment due date changed' },
    { time: '2 days ago', description: 'New student enrolled in Class 10A' },
  ];

  return (
    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {getStatsCards().map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="rounded-full p-3 bg-gray-100">
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Weekly Attendance</h3>
          </CardHeader>
          <CardBody className="p-4">
            <div className="h-80">
              <Bar data={attendanceData} options={chartOptions} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y">
              {recentActivities.map((activity, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Subject Performance</h3>
          </CardHeader>
          <CardBody className="p-4">
            <div className="h-80">
              <Bar data={gradesData} options={chartOptions} />
            </div>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
};