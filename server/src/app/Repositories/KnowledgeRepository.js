import Repository from '../Data/Repository';

const KnowledgeRepository = new Repository('knowledge', {
  id: {
    primary: true,
  },
  name: {},
  knowledge_type_id: {
    returning: false,
  },
  user_id: {
    returning: false,
  },
  job_vacancy_id: {
    returning: false,
  },
  differential: {},
});

export default KnowledgeRepository;
