
import React from 'react';
import AppShell from '@/components/AppShell';

const TabletIndex = () => {
  const handleStartNewVisit = () => {
    console.log('Inizia nuova visita');
  };

  const handlePatientSelected = (patientName?: string) => {
    console.log('Paziente selezionato:', patientName);
  };

  const handleExamCompleted = () => {
    console.log('Esame completato');
  };

  const handleReportCompleted = () => {
    console.log('Referto completato');
  };

  const handleReportShared = () => {
    console.log('Referto condiviso');
  };

  return (
    <AppShell
      onStartNewVisit={handleStartNewVisit}
      onPatientSelected={handlePatientSelected}
      onExamCompleted={handleExamCompleted}
      onReportCompleted={handleReportCompleted}
      onReportShared={handleReportShared}
    />
  );
};

export default TabletIndex;
