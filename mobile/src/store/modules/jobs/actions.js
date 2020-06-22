export const setJobs = jobs => {
  return {
    type: 'SET_JOBS',
    data: { jobs },
  };
};

export const updateJob = (id, updated) => {
  return {
    type: 'UPDATE_JOB',
    data: { id, updated },
  };
};

export const removeJob = id => {
  return {
    type: 'REMOVE_JOB',
    data: { id },
  };
};

export const addJob = job => {
  return {
    type: 'ADD_JOBS',
    data: { job },
  };
};
