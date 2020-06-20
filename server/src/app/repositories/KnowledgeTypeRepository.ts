import Repository from '@repositories/BaseRepository';

const KnowledgeTypeRepository = new Repository('knowledge_type', {
  id: {
    primary: true,
    type: Number(),
  },
  name: { type: String() },
});

export default KnowledgeTypeRepository;
