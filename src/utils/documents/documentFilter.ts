interface Filters {
  periodYear: string;
  periodSemester: string;
  documentType: string;
  searchTerm: string;
  projectName: string;
}

export const filterDocuments = (activities: any[], filters: Filters) => {
  return activities
    .map((activity) => {
      const { Proyect, Period, Documents } = activity;
      const filteredDocs = Documents.items.filter((doc: any) => {
        const docType = doc.documents.type.toLowerCase();
        const docName = doc.documents.name.toLowerCase();
        const docTags = Array.isArray(doc.documents.tags)
          ? doc.documents.tags.join(', ').toLowerCase()
          : doc.documents.tags.toLowerCase();

        return (
          (!filters.documentType || docType.includes(filters.documentType.toLowerCase())) &&
          (!filters.searchTerm ||
            docName.includes(filters.searchTerm.toLowerCase()) ||
            docTags.includes(filters.searchTerm.toLowerCase()))
        );
      });

      const isMatchingProject =
        !filters.projectName ||
        Proyect.name.toLowerCase().includes(filters.projectName.toLowerCase());
      const isMatchingYear = !filters.periodYear || Period.year.toString() === filters.periodYear;
      const isMatchingSemester =
        !filters.periodSemester || Period.semester.toString() === filters.periodSemester;

      return filteredDocs.length > 0 && isMatchingProject && isMatchingYear && isMatchingSemester
        ? { ...activity, Documents: { ...Documents, items: filteredDocs } }
        : null;
    })
    .filter(Boolean);
};
