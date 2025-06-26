
import React, { useState } from 'react';
import { ShoppingCart, Star, Check, Play, Heart, Stethoscope, FileText, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const myPackages = [
    {
      id: 1,
      name: 'Ecocardiografia Pro',
      icon: Heart,
      status: 'active',
      type: 'premium',
      expiresIn: '8 mesi'
    },
    {
      id: 2,
      name: 'Interpretazione AI Base',
      icon: Stethoscope,
      status: 'active',
      type: 'included',
      expiresIn: 'Illimitato'
    }
  ];

  const availableModules = [
    {
      id: 3,
      name: 'Ecografia Addominale Pro',
      icon: Stethoscope,
      description: 'Diagnosi avanzata per patologie gastroenteriche e urinarie',
      price: '€89',
      type: 'one-time',
      category: 'diagnostic',
      rating: 4.9,
      students: 156,
      status: 'available',
      features: ['12 protocolli avanzati', 'AI per diagnosi differenziali', 'Supporto 24/7']
    },
    {
      id: 4,
      name: 'Refertazione Automatica',
      icon: FileText,
      description: 'Genera referti professionali con intelligenza artificiale',
      price: '€15',
      type: 'monthly',
      category: 'productivity',
      rating: 4.8,
      students: 312,
      status: 'trial',
      trialDays: 7,
      features: ['Template personalizzabili', 'Export PDF/DICOM', 'Integrazione cloud']
    },
    {
      id: 5,
      name: 'Storicizzazione Avanzata',
      icon: Award,
      description: 'Sistema completo per la gestione dei dati pazienti',
      price: '€129',
      type: 'one-time',
      category: 'management',
      rating: 4.7,
      students: 89,
      status: 'available',
      features: ['Database illimitato', 'Backup automatico', 'Analytics avanzati']
    },
    {
      id: 6,
      name: 'Simulatore Cardiaco 3D',
      icon: Heart,
      description: 'Training interattivo con modelli 3D realistici',
      price: '€199',
      type: 'one-time',
      category: 'training',
      rating: 5.0,
      students: 45,
      status: 'available',
      features: ['Modelli 3D interattivi', '50+ casi clinici', 'Certificazione inclusa']
    }
  ];

  const categories = [
    { id: 'all', name: 'Tutti', count: availableModules.length },
    { id: 'diagnostic', name: 'Diagnostica', count: availableModules.filter(m => m.category === 'diagnostic').length },
    { id: 'productivity', name: 'Produttività', count: availableModules.filter(m => m.category === 'productivity').length },
    { id: 'management', name: 'Gestione', count: availableModules.filter(m => m.category === 'management').length },
    { id: 'training', name: 'Formazione', count: availableModules.filter(m => m.category === 'training').length }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? availableModules 
    : availableModules.filter(module => module.category === selectedCategory);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Marketplace</h1>
          <p className="text-slate-600 dark:text-slate-300">Espandi le funzionalità di OneSight</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-sm text-slate-600 dark:text-slate-300">Filtri</span>
        </div>
      </div>

      <Tabs defaultValue="my-packages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-packages">I Miei Pacchetti</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="my-packages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myPackages.map((pkg) => (
              <Card key={pkg.id} className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-cyan-200 dark:border-cyan-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <pkg.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-slate-800 dark:text-slate-100">{pkg.name}</CardTitle>
                        <Badge 
                          className={
                            pkg.type === 'premium' 
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs'
                              : 'bg-green-100 text-green-800 text-xs'
                          }
                        >
                          {pkg.type === 'premium' ? 'Premium' : 'Incluso'}
                        </Badge>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Scade: {pkg.expiresIn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base text-slate-800 dark:text-slate-100">{module.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 ml-1">{module.rating}</span>
                          </div>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-600 dark:text-slate-300">{module.students} utenti</span>
                        </div>
                      </div>
                    </div>
                    {module.status === 'trial' && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Prova {module.trialDays}gg
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">{module.description}</p>
                  
                  <div className="space-y-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{module.price}</span>
                      <span className="text-xs text-slate-500 ml-1">
                        {module.type === 'monthly' ? '/mese' : 'una tantum'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {module.status === 'trial' && (
                        <Button size="sm" variant="outline" className="text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          Prova
                        </Button>
                      )}
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-xs">
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Acquista
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;
