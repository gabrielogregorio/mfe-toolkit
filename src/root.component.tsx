import type { ReactElement } from 'react';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TasksPage } from '@/tasks/index';
import { FinancingPage } from '@/financing/index';

export const Root = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/remaining-money" element={<FinancingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
