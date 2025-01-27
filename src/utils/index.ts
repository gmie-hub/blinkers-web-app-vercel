// export function sanitizeUrlParam(param:any) {
//     return param
//       .trim() // Remove leading and trailing spaces
//       .replace(/\s+/g, '-') // Replace spaces with hyphens
//       .replace(/%/g, '-') // Replace percent signs with hyphens
//       .replace(/[^a-zA-Z0-9-]/g, ''); // Remove special characters (optional)
//   }
  

export function sanitizeUrlParam(param: any): string {
    // Handle null, undefined, and empty strings
    if (param == null || param === '') {
      return ''; // Return an empty string if input is null, undefined, or empty
    }
  
    if (typeof param !== 'string') {
      console.warn("sanitizeUrlParam: Expected a string but received:", typeof param);
      return '';
    }
  
    return param
      .trim() // Remove leading and trailing spaces
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/%/g, '-') // Replace percent signs with hyphens
      .replace(/[^a-zA-Z0-9-]/g, ''); // Remove special characters (optional)
  }
  