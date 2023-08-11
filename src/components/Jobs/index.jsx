import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import style from './jobs.module.scss';

import Category from '../Category';
const dummyData = [
  { id: uuid(), title: 'To do', jobs: [{ id: uuid(), title: 'test' }] },
  { id: uuid(), title: 'In Progress', jobs: [{ id: uuid(), title: 'test' }] },
  { id: uuid(), title: 'Completed', jobs: [{ id: uuid(), title: 'test' }] },
  { id: uuid(), title: 'Verify', jobs: [{ id: uuid(), title: 'test' }] },
];
const Jobs = () => {
  const [jobs, setJobs] = useState(dummyData);

  const handleDragEnd = (value) => {
    if (!value) return;
    const { source, destination } = value;
    if (destination !== null) {
      const sourceColIdx = jobs.findIndex((e) => e.id === source.droppableId);
      const destinationColIdx = jobs.findIndex((e) => e.id === destination.droppableId);

      if (source.droppableId === destination.droppableId) {
        const sourceRowIdx = source.index;
        const destinationRowIdx = destination.index;
        const sourceCol = jobs[sourceColIdx];

        const sourceTasks = sourceCol.jobs[sourceRowIdx];
        const destinationTasks = sourceCol.jobs[destinationRowIdx];

        jobs[sourceColIdx].jobs[destinationRowIdx] = sourceTasks;
        jobs[sourceColIdx].jobs[sourceRowIdx] = destinationTasks;

        setJobs(jobs);
      } else {
        const sourceCol = jobs[sourceColIdx];
        const destinationCol = jobs[destinationColIdx];

        const sourceTasks = [...sourceCol.jobs];
        const destinationTasks = [...destinationCol.jobs];

        const [removed] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, removed);

        jobs[sourceColIdx].jobs = sourceTasks;
        jobs[destinationColIdx].jobs = destinationTasks;
        setJobs(jobs);
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={style['job']}>
        {jobs &&
          jobs.map((section) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => <Category provided={provided} section={section} />}
            </Droppable>
          ))}
      </div>
    </DragDropContext>
  );
};

export default Jobs;
