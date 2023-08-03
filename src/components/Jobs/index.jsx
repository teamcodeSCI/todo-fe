import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
const dummyData = [
  { id: uuid(), title: 'To do', jobs: [] },
  { id: uuid(), title: 'In Progress', jobs: [] },
  { id: uuid(), title: 'Completed', jobs: [] },
  { id: uuid(), title: 'Verify', jobs: [] },
];
const Jobs = () => {
  const [job, setJobs] = useState();
  return <div>Jobs</div>;
};

export default Jobs;
