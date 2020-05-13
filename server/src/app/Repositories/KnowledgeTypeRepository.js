import Repository from '../Data/Repository';

const KnowledgeTypeRepository = new Repository('knowledge_type', {
  id: {
    primary: true,
  },
  name: {},
});

export default KnowledgeTypeRepository;
