import Report from '@models/Report';

import BaseRepository from '@repositories/BaseRepository';

const ReportRepository = new BaseRepository<Report>('report', {
  id: { primary: true, },
});

export default ReportRepository;
