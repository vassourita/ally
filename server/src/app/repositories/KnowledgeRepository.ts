import Repository from '@repositories/BaseRepository';

const KnowledgeRepository = new Repository('knowledge', {
  id: {
    primary: true,
    type: Number(),
  },
  name: { type: String() },
  knowledge_type_id: {
    returning: false,
    type: Number(),
  },
  user_id: {
    returning: false,
    type: Number(),
  },
  job_vacancy_id: {
    returning: false,
    type: Number(),
  },
  differential: { type: Boolean() },
});

export default KnowledgeRepository;
