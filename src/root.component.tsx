import type { ReactElement } from 'react';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TasksPage } from '@/tasks/index';
import { FinancingPage } from '@/financing/index';
import { UxGuidePage } from '@/uxGuide/index';
import { TaskProvider } from '@/tasks/contexts/taskContext';

export const Root = (): ReactElement => {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/remaining-money" element={<FinancingPage />} />
          <Route path="/ux" element={<UxGuidePage />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
};
