
import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Star, Award, TrendingUp, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const TrainingModule = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: 'Ecocardiografia Base',
      description: 'Principi fondamentali dell\'ecocardiografia veterinaria',
      duration: '45 min',
      modules: 6,
      progress: 80,
      difficulty: 'Intermedio',
      rating: 4.8,
      students: 234,
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Ecografia Addominale Avanzata',
      description: 'Tecniche avanzate per diagnosi gastroenteriche',
      duration: '60 min',
      modules: 8,
      progress: 0,
      difficulty: 'Avanzato',
      rating: 4.9,
      students: 156,
      status: 'available'
    },
    {
      id: 3,
      title: 'Interpretazione AI',
      description: 'Come utilizzare al meglio gli algoritmi di OneSight',
      duration: '30 min',
      modules: 4,
      progress: 100,
      difficulty: 'Base',
      rating: 4.7,
      students: 512,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Casi Clinici Pratici',
      description: 'Analisi di casi reali con diagnosi differenziali',
      duration: '90 min',
      modules: 12,
      progress: 25,
      difficulty: 'Avanzato',
      rating: 4.9,
      students: 89,
      status: 'in-progress'
    }
  ];

  const achievements = [
    { name: 'Primo Esame', icon: Star, earned: true },
    { name: 'Specialista Cuore', icon: Award, earned: true },
    { name: 'AI Master', icon: TrendingUp, earned: false },
    { name: 'Formatore', icon: BookOpen, earned: false }
  ];

  const recentActivity = [
    { course: 'Ecocardiografia Base', module: 'Valutazione Valvolare', time: '2 ore fa', status: 'completed' },
    { course: 'Casi Clinici Pratici', module: 'Cardiomiopatia Ipertrofica', time: '1 giorno fa', status: 'in-progress' },
    { course: 'Interpretazione AI', module: 'Quiz Finale', time: '3 giorni fa', status: 'completed' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Corsi Completati</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Ore di Studio</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Clock className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Certificazioni</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Award className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Punteggio Medio</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Corsi Disponibili</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{course.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{course.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration}
                        </span>
                        <span>{course.modules} moduli</span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {course.rating}
                        </span>
                        <span>{course.students} studenti</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant="outline"
                        className={
                          course.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' :
                          course.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-slate-50 text-slate-700 border-slate-200'
                        }
                      >
                        {course.status === 'completed' ? 'Completato' :
                         course.status === 'in-progress' ? 'In corso' : 'Disponibile'}
                      </Badge>
                      
                      <Badge variant="secondary" className="text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Learning */}
          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-teal-800">Quick Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded border border-teal-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">Quiz del Giorno</span>
                  <Badge className="bg-teal-500 text-white text-xs">5 min</Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Anatomia cardiaca: identificazione delle camere
                </p>
                <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                  <Play className="w-3 h-3 mr-2" />
                  Inizia Quiz
                </Button>
              </div>
              
              <div className="p-3 bg-white rounded border border-teal-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">Video Breve</span>
                  <Badge className="bg-teal-500 text-white text-xs">3 min</Badge>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Tecnica di posizionamento sonda addominale
                </p>
                <Button size="sm" variant="outline" className="w-full border-teal-200">
                  <Video className="w-3 h-3 mr-2" />
                  Guarda Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">I Miei Riconoscimenti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <achievement.icon className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-xs font-medium">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Attività Recente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded">
                  <p className="text-sm font-medium text-slate-800">{activity.course}</p>
                  <p className="text-xs text-slate-600">{activity.module}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{activity.time}</span>
                    <CheckCircle className={`w-3 h-3 ${
                      activity.status === 'completed' ? 'text-green-500' : 'text-slate-400'
                    }`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
