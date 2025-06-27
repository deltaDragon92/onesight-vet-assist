
import React from 'react';
import ReportEditor from './ReportEditor';

interface ReportModuleProps {
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const ReportModule = ({ onReportCompleted, onReportShared }: ReportModuleProps) => {
  return (
    <ReportEditor 
      onReportCompleted={onReportCompleted}
      onReportShared={onReportShared}
    />
  );
};

export default ReportModule;
