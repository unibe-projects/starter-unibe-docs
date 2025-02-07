interface itemsDocumets {
    createdAt: string;
    name: string;
    path: string;
    tags: string;
    type: string;
    updatedAt: string;
}


export interface DocumentsItems {
   documents: itemsDocumets;
  }
  
  interface Documents {
    items: DocumentsItems[];
  }
  
  export interface ActivityDocuments {
    Documents: Documents;
    Period: {
      semester: string;
      year: string;
    };
    Proyect: {
      name: string;
    };
  }
  