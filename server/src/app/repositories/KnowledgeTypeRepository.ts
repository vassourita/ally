import Repository from './BaseRepository';

const KnowledgeTypeRepository = new Repository('knowledge_type', {
  id: {
    primary: true,
    type: Number(),
  },
  name: { type: String() },
});

export default KnowledgeTypeRepository;
