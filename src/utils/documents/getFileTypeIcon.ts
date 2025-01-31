export const getFileTypeIcon = (tags: string[], resourceUrl: string) => {
    const lowerTags = tags.map(tag => tag.toLowerCase());
  
    const types: Record<string, string> = {
      jpg: resourceUrl,
      png: resourceUrl,
      word: "📄",
      docx: "📄",
      pdf: "📄",
      excel: "📊",
      powerpoint: "📽️",
      texto: "📜",
    };
    const foundType = Object.keys(types).find(type => lowerTags.includes(type));
  
    return foundType ? types[foundType] : "📁";
  };